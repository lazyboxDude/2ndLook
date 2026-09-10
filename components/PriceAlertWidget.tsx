"use client";

import { useState } from "react";
import { formatChf } from "@/lib/products";

type Mode = "idle" | "confirmed" | "editing";

export default function PriceAlertWidget({ currentPrice }: { currentPrice: number }) {
  const [mode, setMode] = useState<Mode>("idle");
  const [target, setTarget] = useState(String(Math.round(currentPrice * 0.9)));

  if (mode === "confirmed") {
    return (
      <div className="rounded-xl bg-green p-5 text-bg">
        <div className="flex items-center gap-2 font-semibold">
          <span className="h-2 w-2 rounded-full bg-bg" />
          Alert aktiv
        </div>
        <p className="mt-2 text-sm">
          Du wirst per E-Mail benachrichtigt, sobald der Preis auf {formatChf(Number(target))}{" "}
          oder darunter fällt.
        </p>
        <button
          onClick={() => setMode("editing")}
          className="mt-2 text-sm font-medium underline underline-offset-2"
        >
          Zielpreis ändern
        </button>
      </div>
    );
  }

  if (mode === "editing") {
    return (
      <div className="rounded-xl bg-surface-hero p-5">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span aria-hidden="true">🔔</span>
          Zielpreis ändern
        </div>
        <div className="mt-3 flex gap-3">
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-32 rounded-lg border border-placeholder bg-white px-3 py-2 font-mono text-sm"
            inputMode="numeric"
          />
          <button
            onClick={() => setMode("confirmed")}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-bg"
          >
            Speichern
          </button>
        </div>
        <div className="mt-3 flex gap-4 text-sm">
          <button onClick={() => setMode("confirmed")} className="text-muted underline">
            Abbrechen
          </button>
          <button onClick={() => setMode("idle")} className="text-accent underline">
            Alert löschen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-surface-hero p-5">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <span aria-hidden="true">🔔</span>
        Preis-Alert einrichten
      </div>
      <div className="mt-3 flex gap-3">
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="CHF ..."
          className="w-32 rounded-lg border border-placeholder bg-white px-3 py-2 font-mono text-sm"
          inputMode="numeric"
        />
        <button
          onClick={() => setMode("confirmed")}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-bg"
        >
          Alert aktivieren
        </button>
      </div>
      <p className="mt-2 text-xs text-muted">
        Wir benachrichtigen dich per E-Mail, sobald der Preis diesen Wert erreicht.
      </p>
    </div>
  );
}
