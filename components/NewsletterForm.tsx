"use client";

import { useActionState } from "react";
import Link from "next/link";
import { subscribe, type NewsletterState } from "@/app/newsletter/actions";

const initialState: NewsletterState = null;

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState);

  if (state && "success" in state) {
    return (
      <p role="status" className="text-sm text-bg">
        Fast geschafft: Wir haben dir eine Mail geschickt. Klick auf den Link darin, um die
        Anmeldung abzuschliessen.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex w-full max-w-[460px] flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          E-Mail
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="name@beispiel.ch"
          className="min-w-0 flex-1 rounded-full border border-placeholder bg-white px-4 py-3 text-sm text-foreground"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-bg disabled:opacity-60"
        >
          {pending ? "Wird gesendet …" : "Anmelden"}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-muted-light">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>
          Ich stimme der{" "}
          <Link href="/datenschutz" className="underline">
            Datenschutzerklärung
          </Link>{" "}
          zu. Abmeldung jederzeit möglich.
        </span>
      </label>
      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
    </form>
  );
}
