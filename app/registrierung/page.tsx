"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type SignupState } from "./actions";

const initialState: SignupState = null;

export default function RegistrierungPage() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  if (state && "success" in state) {
    return (
      <div className="mx-auto flex max-w-[420px] flex-col gap-4 px-6 py-16 text-center md:py-24">
        <h1 className="text-3xl font-bold text-foreground">Fast geschafft</h1>
        <p className="text-sm text-muted">
          Wir haben dir eine Bestätigungs-E-Mail geschickt. Klick auf den Link darin, um dein
          Konto zu aktivieren.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[420px] flex-col gap-6 px-6 py-16 md:py-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Konto erstellen</h1>
        <p className="text-sm text-muted">
          Erstelle ein Konto, um deinen Feed zu personalisieren und Marken zu folgen.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-foreground">Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Vor- und Nachname"
            className="rounded-lg border border-placeholder bg-white px-3 py-2.5 text-foreground"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-foreground">E-Mail</span>
          <input
            type="email"
            name="email"
            required
            placeholder="name@beispiel.ch"
            className="rounded-lg border border-placeholder bg-white px-3 py-2.5 text-foreground"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-foreground">Passwort</span>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            placeholder="Mind. 8 Zeichen"
            className="rounded-lg border border-placeholder bg-white px-3 py-2.5 text-foreground"
          />
        </label>

        <label className="flex items-start gap-2 text-sm text-muted">
          <input type="checkbox" name="terms" className="mt-0.5" />
          <span>
            Ich akzeptiere die <Link href="/agb" className="font-semibold text-primary">AGB</Link>{" "}
            und die{" "}
            <Link href="/datenschutz" className="font-semibold text-primary">
              Datenschutzerklärung
            </Link>
          </span>
        </label>

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-bg disabled:opacity-60"
        >
          {pending ? "Konto wird erstellt …" : "Konto erstellen"}
        </button>
      </form>

      <div className="flex flex-col items-center gap-4 border-t border-placeholder pt-4 text-sm">
        <p className="text-muted">
          Schon ein Konto?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Jetzt einloggen
          </Link>
        </p>
      </div>
    </div>
  );
}
