"use client";

import { useActionState } from "react";

import { submitContact, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="mt-12 max-w-2xl space-y-5">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Webová stránka</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium" htmlFor="name">
          Meno
          <input id="name" name="name" required minLength={2} maxLength={100} className="rounded-md border border-border bg-background px-4 py-3 font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-foreground" />
        </label>
        <label className="grid gap-2 text-sm font-medium" htmlFor="email">
          E-mail
          <input id="email" name="email" type="email" required maxLength={200} className="rounded-md border border-border bg-background px-4 py-3 font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-foreground" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium" htmlFor="message">
        Správa
        <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={7} className="resize-y rounded-md border border-border bg-background px-4 py-3 font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-foreground" />
      </label>
      <button type="submit" disabled={pending} className="rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-50">
        {pending ? "Odosielam…" : "Odoslať správu"}
      </button>
      {state.message && (
        <p role="status" className={state.status === "error" ? "text-sm text-red-700" : "text-sm text-green-700"}>
          {state.message}
        </p>
      )}
    </form>
  );
}
