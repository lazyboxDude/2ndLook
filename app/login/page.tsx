"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type LoginState } from "./actions";

const initialState: LoginState = null;

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="mx-auto flex max-w-[420px] flex-col gap-6 px-6 py-16 md:py-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Willkommen zurück</h1>
        <p className="text-sm text-muted">Melde dich an, um deinen Feed und deine Marken zu sehen.</p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
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
            className="rounded-lg border border-placeholder bg-white px-3 py-2.5 text-foreground"
          />
        </label>

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <div className="flex justify-end">
          <span className="text-sm font-semibold text-muted">Passwort vergessen?</span>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-bg disabled:opacity-60"
        >
          {pending ? "Einloggen …" : "Einloggen"}
        </button>
      </form>

      <div className="flex flex-col items-center gap-4 border-t border-placeholder pt-4 text-sm">
        <p className="text-muted">
          Neu bei 2ndLook?{" "}
          <Link href="/registrierung" className="font-semibold text-primary">
            Konto erstellen
          </Link>
        </p>
      </div>
    </div>
  );
}
