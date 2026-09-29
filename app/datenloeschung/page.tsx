import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = { title: "Datenlöschung – 2ndLook" };

const subject = encodeURIComponent("Löschantrag 2ndLook");
const body = encodeURIComponent(
  "Bitte löscht mein 2ndLook-Konto und alle zu mir gespeicherten Daten.\n\nE-Mail-Adresse des Kontos: \n",
);

export default function DatenloeschungPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-12 md:px-16 md:py-16">
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">Datenlöschung beantragen</h1>
      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-muted md:text-[15px]">
        <p>
          Du kannst jederzeit verlangen, dass wir dein Konto und alle zu dir gespeicherten
          Personendaten löschen (Konto-E-Mail, Name, gefolgte Marken, Watchlist).
        </p>
        <h2 className="text-lg font-semibold text-foreground md:text-xl">So geht’s</h2>
        <ol className="list-decimal pl-5">
          <li>Sende deinen Löschantrag von der E-Mail-Adresse, mit der du registriert bist.</li>
          <li>
            Wir bestätigen den Eingang und löschen die Daten innerhalb von 30 Tagen, soweit keine
            gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </li>
          <li>Du erhältst eine Bestätigung nach der Löschung.</li>
        </ol>
        <p>
          <a
            href={`mailto:${BUSINESS.email}?subject=${subject}&body=${body}`}
            className="inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-bg"
          >
            Löschantrag per E-Mail senden
          </a>
        </p>
        <p>
          Oder schreibe direkt an <span className="font-mono">{BUSINESS.email}</span>. Ohne Konto
          gespeicherte Daten (Watchlist, Cookie-Auswahl) liegen nur in deinem Browser und lassen sich
          dort über die Browser-Einstellungen löschen.
        </p>
        <p>
          Weitere Rechte (Auskunft, Berichtigung, Widerruf) findest du in der Datenschutzerklärung.
        </p>
      </div>
    </div>
  );
}
