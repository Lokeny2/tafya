import { Resend } from "resend";
import { okResponse, errorResponse } from "@/lib/apiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return errorResponse("Name, email, and message are all required", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse("Please provide a valid email address", 400);
    }

    const { error } = await resend.emails.send({
      // Sandbox sender — works immediately with no domain setup.
      // Once you verify a domain in Resend, swap this for e.g. "Tafya <contact@yourdomain.com>"
      from: "Tafya Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New Tafya contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return errorResponse("Failed to send your message");
    }

    return okResponse({ message: "Thank you — your message has been received." }, 201);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to process your message");
  }
}