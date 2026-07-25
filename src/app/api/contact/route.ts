import { okResponse, errorResponse } from "@/lib/apiResponse";

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

    // Day 8 wires this to a real email service.
    // For now, we log the submission and return success.
    console.log("Contact form submission:", { name, email, message });

    return okResponse({ message: "Thank you — your message has been received." }, 201);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to process your message");
  }
}