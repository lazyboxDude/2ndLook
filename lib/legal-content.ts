import { BUSINESS, MIN_AGE } from "@/lib/business";

export type LegalSection = { h2: string; body: string[] };
export type LegalPage = { title: string; sections: LegalSection[] };

export const impressum: LegalPage = {
  title: "Impressum",
  sections: [
    {
      h2: "Anbieter:in",
      body: [
        `${BUSINESS.name} (${BUSINESS.legalForm})`,
        BUSINESS.address,
        `UID: ${BUSINESS.uid}`,
        `MWST-Nr.: ${BUSINESS.vat}`,
      ],
    },
    { h2: "Kontakt", body: [`E-Mail: ${BUSINESS.email}`, `Telefon: ${BUSINESS.phone}`] },
    {
      h2: "Inhaltlich verantwortlich",
      body: [BUSINESS.name],
    },
    {
      h2: "Streitbeilegung",
      body: [
        "Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
    },
    {
      h2: "Haftung für Inhalte und Links",
      body: [
        "Wir bemühen uns um richtige und aktuelle Inhalte, übernehmen dafür aber keine Gewähr.",
        "Für die Inhalte externer Händlerseiten, auf die über Affiliate-Links verwiesen wird, übernehmen wir keine Gewähr — massgeblich ist ausschliesslich die Angebotsseite des jeweiligen Händlers.",
      ],
    },
  ],
};

export const datenschutz: LegalPage = {
  title: "Datenschutzerklärung",
  sections: [
    {
      h2: "1. Verantwortliche Stelle",
      body: [
        `Verantwortlich für die Datenbearbeitung auf dieser Website ist ${BUSINESS.name}, ${BUSINESS.address}, ${BUSINESS.email}.`,
        "Wir bearbeiten Personendaten nach dem schweizerischen Datenschutzgesetz (DSG). Soweit sich unser Angebot auch an Personen in der EU/im EWR richtet, beachten wir zusätzlich die DSGVO.",
      ],
    },
    {
      h2: "2. Hosting und Server-Logfiles",
      body: [
        "Die Website wird über Cloudflare, Inc. (USA) ausgeliefert. Beim Aufruf werden automatisch technische Daten erfasst (u. a. IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Browsertyp), die für Betrieb, Sicherheit und Stabilität erforderlich sind.",
        "Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO, soweit anwendbar). Die Aufbewahrungsdauer der Logdaten richtet sich nach den Einstellungen des Hosting-Anbieters [Frist prüfen und eintragen].",
      ],
    },
    {
      h2: "2a. Schriftarten",
      body: [
        "Wir verwenden die Schriftarten Fira Sans, Fira Code und Playfair Display (SIL Open Font License 1.1). Sie werden beim Build lokal ausgeliefert; beim Seitenaufruf wird keine Verbindung zu Google-Servern aufgebaut.",
      ],
    },
    {
      h2: "3. Cookies und lokaler Speicher",
      body: [
        "Wir verwenden technisch notwendige Cookies und Einträge im lokalen Speicher deines Browsers (u. a. für Login-Sitzung, Watchlist und deine Cookie-Auswahl). Cookies für Affiliate-Tracking setzen wir nur, wenn du im Cookie-Banner einwilligst.",
        "Details zu Namen, Zweck und Dauer findest du in unserer Cookie-Richtlinie (/cookies). Deine Auswahl kannst du jederzeit über „Cookie-Einstellungen“ im Footer ändern oder widerrufen.",
      ],
    },
    {
      h2: "4. Nutzerkonto",
      body: [
        "Für ein Nutzerkonto speichern wir deine E-Mail-Adresse und ein Passwort (verschlüsselt) sowie, falls du ihn angibst, deinen Namen. Die Daten werden bei Supabase (Supabase Inc.) gespeichert und dort bearbeitet.",
        "Zweck ist die Bereitstellung des von dir gewünschten Dienstes. Du kannst dein Konto jederzeit über /datenloeschung löschen lassen; die Daten werden dann gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
      ],
    },
    {
      h2: "5. Watchlist und Preis-Alerts",
      body: [
        "Ohne Konto wird deine Watchlist nur lokal in deinem Browser gespeichert (Eintrag „2ndlook.watchlist“); es findet keine Übermittlung an uns statt.",
        "Mit Konto speichern wir die beobachteten Artikel in Supabase. Preis-Alerts per E-Mail gibt es derzeit nicht. Sollten wir sie einführen, versenden wir sie nur nach bestätigter Anmeldung (Double-Opt-in) und mit Abmelde-Link in jeder E-Mail.",
      ],
    },
    {
      h2: "6. Affiliate-Links und Partnerprogramme (Awin)",
      body: [
        "Diese Website enthält Affiliate-Links zu Partnerhändlern, u. a. über das Netzwerk Awin (AWIN AG, Berlin). Beim Klick auf einen solchen Link kann ein Tracking-Cookie gesetzt werden, das dem Partnernetzwerk mitteilt, dass die Weiterleitung von 2ndLook stammt und ob ein Kauf zustande kam.",
        "Dieses Tracking erfolgt ausschliesslich nach deiner Einwilligung im Cookie-Banner. Ohne Einwilligung werden Links ohne Tracking-Cookie geöffnet, die Provision kann dann ggf. nicht zugeordnet werden.",
      ],
    },
    {
      h2: "7. Kinder und Jugendliche",
      body: [
        `2ndLook richtet sich nicht an Kinder. Ein Konto kann erst ab ${MIN_AGE} Jahren erstellt werden; dies bestätigst du bei der Registrierung. Wir erheben wissentlich keine Personendaten von Personen unter ${MIN_AGE} Jahren. Wenn du glaubst, dass ein Kind ein Konto erstellt hat, schreib uns – wir löschen die Daten.`,
      ],
    },
    {
      h2: "8. Bekanntgabe ins Ausland",
      body: [
        "Wir nutzen Dienstleister (Supabase, Cloudflare, Awin), die Daten auch ausserhalb der Schweiz bearbeiten können, u. a. in der EU und in den USA. Wo kein angemessener Datenschutz besteht, stellen wir ihn durch geeignete Garantien sicher (z. B. Standardvertragsklauseln oder Zertifizierung unter dem Swiss-US Data Privacy Framework).",
      ],
    },
    {
      h2: "9. Aufbewahrung",
      body: [
        "Wir speichern Personendaten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzlich verlangt wird. Kontodaten löschen wir nach Kontolöschung.",
      ],
    },
    {
      h2: "10. Deine Rechte",
      body: [
        `Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Bearbeitung, Datenherausgabe bzw. -übertragung sowie Widerspruch. Erteilte Einwilligungen kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Einen Löschantrag kannst du unter /datenloeschung stellen; sonst wende dich an ${BUSINESS.email}.`,
        "Du kannst dich ausserdem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) beschweren; bei Bezug zur EU auch bei deiner lokalen Datenschutzbehörde.",
      ],
    },
    { h2: "11. Kontakt für Datenschutzanfragen", body: [BUSINESS.email] },
  ],
};

export const cookies: LegalPage = {
  title: "Cookie-Richtlinie",
  sections: [
    {
      h2: "Was sind Cookies?",
      body: [
        "Cookies sind kleine Textdateien, die dein Browser speichert. Ähnlich funktioniert der lokale Speicher (localStorage) deines Browsers. Wir bezeichnen beides zusammen als „Cookies“.",
      ],
    },
    {
      h2: "Technisch notwendige Cookies (ohne Einwilligung)",
      body: [
        "sb-…-auth-token — Login-Sitzung (Supabase). Dauer: Sitzung bzw. bis zum Logout, max. [Dauer].",
        "2ndlook.watchlist (lokaler Speicher) — merkt sich deine Watchlist ohne Konto. Dauer: bis du ihn löschst.",
        "2ndlook.consent (lokaler Speicher) — speichert deine Cookie-Auswahl. Dauer: [12 Monate].",
      ],
    },
    {
      h2: "Affiliate-Tracking (nur mit Einwilligung)",
      body: [
        "Awin-Tracking-Cookie — ordnet einen Kauf bei einem Partnerhändler 2ndLook zu. Anbieter: AWIN AG. Dauer: [gemäss Awin, z. B. 30 Tage]. Wird erst gesetzt, wenn du „Alle akzeptieren“ wählst.",
      ],
    },
    {
      h2: "Einwilligung ändern oder widerrufen",
      body: [
        "Über „Cookie-Einstellungen“ im Footer kannst du deine Auswahl jederzeit ändern. Bereits gesetzte Cookies kannst du zusätzlich in den Einstellungen deines Browsers löschen.",
        "Weitere Informationen zur Bearbeitung von Personendaten findest du in der Datenschutzerklärung.",
      ],
    },
  ],
};

export const agb: LegalPage = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  sections: [
    {
      h2: "1. Geltungsbereich",
      body: [
        `Diese AGB gelten für die Nutzung der Plattform 2ndLook durch registrierte und nicht registrierte Nutzerinnen und Nutzer. Anbieter:in ist ${BUSINESS.name}, ${BUSINESS.address}.`,
      ],
    },
    {
      h2: "2. Leistungsbeschreibung",
      body: [
        "2ndLook betreibt eine kostenlose Preisübersicht für Streetwear und Düfte.",
        "Wir verkaufen keine eigenen Produkte, sondern verweisen über Affiliate-Links auf Angebote Dritter. Der Kaufvertrag kommt ausschliesslich zwischen dir und dem jeweiligen Händler zustande.",
      ],
    },
    {
      h2: "3. Nutzerkonto",
      body: [
        "Die Watchlist kann ohne Konto lokal im Browser genutzt werden. Für Konto-Funktionen ist die Angabe einer gültigen E-Mail-Adresse erforderlich. Du bist für die Richtigkeit deiner Angaben und die Geheimhaltung deiner Zugangsdaten verantwortlich.",
      ],
    },
    {
      h2: "4. Preisangaben und Benachrichtigungen",
      body: [
        "Alle Preise werden in CHF angezeigt und beinhalten laut Angabe des Händlers Zoll und Mehrwertsteuer (DDP), soweit gekennzeichnet. Eine EUR-Angabe dient nur der Orientierung.",
        "Angezeigte Preise können veraltet oder fehlerhaft sein; massgeblich ist stets der Preis auf der Händlerseite zum Zeitpunkt des Kaufs. Wir übernehmen keine Gewähr für Richtigkeit, Vollständigkeit, Verfügbarkeit oder Aktualität.",
      ],
    },
    {
      h2: "5. Haftung",
      body: [
        "Wir haften unbeschränkt bei Absicht und grober Fahrlässigkeit sowie bei Personenschäden, soweit gesetzlich zwingend.",
        "Bei leichter Fahrlässigkeit haften wir, soweit gesetzlich zulässig, nur für direkte Schäden und nicht für indirekte Schäden, Folgeschäden oder entgangenen Gewinn.",
        "Für Inhalte, Preisangaben und Verfügbarkeiten auf verlinkten Händlerseiten sind ausschliesslich die jeweiligen Händler verantwortlich.",
      ],
    },
    {
      h2: "6. Affiliate-Links",
      body: [
        "2ndLook erhält bei Käufen über bestimmte Links eine Provision vom jeweiligen Händler; für dich entstehen keine Mehrkosten. Details siehe „Widerruf & Affiliate-Hinweis“.",
      ],
    },
    {
      h2: "7. Pflichten der Nutzerinnen und Nutzer",
      body: [
        "Der Dienst darf nicht missbräuchlich genutzt werden, etwa durch automatisiertes Auslesen (Scraping) oder Manipulation der Preisbenachrichtigungen.",
      ],
    },
    {
      h2: "8. Kündigung",
      body: ["Du kannst dein Nutzerkonto und alle gespeicherten Daten jederzeit ohne Angabe von Gründen löschen. Wir können den Dienst oder einzelne Funktionen jederzeit ändern oder einstellen."],
    },
    {
      h2: "9. Änderungen der AGB",
      body: [
        "Wir können diese AGB mit Wirkung für die Zukunft anpassen. Über wesentliche Änderungen informieren wir dich rechtzeitig; die weitere Nutzung gilt als Zustimmung.",
      ],
    },
    {
      h2: "10. Anwendbares Recht und Gerichtsstand",
      body: [
        "Es gilt schweizerisches Recht unter Ausschluss des Kollisionsrechts. Gerichtsstand ist, soweit zulässig, [Ort], Schweiz. Zwingende Konsumentengerichtsstände bleiben vorbehalten.",
        "Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
      ],
    },
  ],
};

export const widerruf: LegalPage = {
  title: "Widerruf & Affiliate-Hinweis",
  sections: [
    {
      h2: "Affiliate-Hinweis (Werbung)",
      body: [
        "2ndLook finanziert sich über Affiliate-Partnerschaften. Wenn du über einen mit „Anzeige“ oder „Affiliate-Link“ gekennzeichneten Link einkaufst, erhalten wir ggf. eine Provision vom Händler – für dich entstehen dadurch keine Mehrkosten.",
      ],
    },
    {
      h2: "Widerruf und Rückgabe",
      body: [
        "2ndLook verkauft selbst keine Waren. Der Kaufvertrag kommt beim Klick auf einen Affiliate-Link direkt zwischen dir und dem jeweiligen Händler zustande — gegenüber 2ndLook besteht daher kein Widerrufs- oder Rückgaberecht.",
        "Ob ein Widerrufs- oder Rückgaberecht besteht (für Online-Käufe kennt das schweizerische Recht kein allgemeines gesetzliches Widerrufsrecht), richtet sich nach den Bedingungen des jeweiligen Händlers. Informationen dazu erhältst du direkt bei diesem.",
      ],
    },
    {
      h2: "Löschung des 2ndLook-Kontos",
      body: [
        "Die Nutzung von 2ndLook ist kostenlos. Du kannst dein Konto jederzeit löschen; stelle dazu einen Löschantrag unter /datenloeschung.",
      ],
    },
  ],
};
