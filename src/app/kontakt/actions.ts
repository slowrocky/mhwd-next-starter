"use server";

import { getSiteSettings } from "@/sanity/lib/site-settings";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

function textValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (textValue(formData.get("website"))) return { status: "success", message: "Ďakujeme za správu." };

  const name = textValue(formData.get("name"));
  const email = textValue(formData.get("email"));
  const message = textValue(formData.get("message"));

  if (name.length < 2 || name.length > 100) {
    return { status: "error", message: "Zadajte prosím meno v dĺžke 2 až 100 znakov." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) {
    return { status: "error", message: "Zadajte prosím platnú e-mailovú adresu." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { status: "error", message: "Správa musí mať 10 až 5000 znakov." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return {
      status: "error",
      message: "Kontaktný formulár ešte nie je nakonfigurovaný. Použite prosím e-mail alebo telefón vyššie.",
    };
  }

  const site = await getSiteSettings();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [site.contact.email],
      reply_to: email,
      subject: `Nová správa z webu od ${name}`,
      text: `Meno: ${name}\nE-mail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return { status: "error", message: "Správu sa nepodarilo odoslať. Skúste to prosím neskôr." };
  }

  return { status: "success", message: "Ďakujeme, správa bola odoslaná." };
}
