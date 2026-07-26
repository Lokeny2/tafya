import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Tafya",
  description: "Get in touch with questions or feedback about Tafya.",
};

export default function ContactPage() {
  return <ContactForm />;
}