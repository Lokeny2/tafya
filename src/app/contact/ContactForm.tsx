"use client";

import { useState } from "react";
import FormField from "@/components/ui/FormField";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Your name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Your email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "A message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }

  return errors;
}

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-subtle focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as the user starts correcting it
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Client-side validation first — no network request if the form is invalid
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
        Contact
      </h1>
      <p className="mt-2 text-subtle">
        Have a question or feedback about Tafya? Send us a message.
      </p>

      {status === "success" ? (
        <div className="mt-8 rounded-lg border border-success/40 bg-success/5 p-6">
          <p className="font-heading text-lg font-semibold text-success">
            Message received
          </p>
          <p className="mt-2 text-sm text-ink">
            Thank you for getting in touch. This is a demo project, so no one
            will actually read it — but the full-stack flow worked perfectly.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm font-medium text-brand-600 hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          <FormField label="Your name" id="name" error={errors.name}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Moses Lokeny"
              autoComplete="name"
              className={inputClass}
            />
          </FormField>

          <FormField label="Email address" id="email" error={errors.email}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClass}
            />
          </FormField>

          <FormField label="Message" id="message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here…"
              rows={5}
              className={inputClass}
            />
          </FormField>

          {status === "error" && (
            <p className="text-sm text-urgent" role="alert">
              Something went wrong sending your message. Please try again.
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
        </div>
      )}
    </div>
  );
}