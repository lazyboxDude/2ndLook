export type LegalSection = { h2: string; body: string[] };
export type LegalPage = { title: string; sections: LegalSection[] };

export const impressum: LegalPage = {
  title: "Impressum",
  sections: [
    {
      h2: "Angaben gemäß § 5 TMG",
      body: ["[Firmenname]", "[Straße und Hausnummer]", "[PLZ und Ort]"],
    },
    { h2: "Vertreten durch", body: ["[Name der vertretungsberechtigten Person]"] },
    { h2: "Kontakt", body: ["Telefon: [Telefonnummer]", "E-Mail: [E-Mail-Adresse]"] },
    {
      h2: "Registereintrag",
      body: ["Eintragung im Handelsregister: [Registergericht], Registernummer: [HRB-Nummer]"],
    },
    {
      h2: "Umsatzsteuer-ID",
      body: ["Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]"],
    },
    {
      h2: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      body: ["[Name], [Anschrift wie oben]"],
    },
    {
      h2: "EU-Streitschlichtung",
      body: [
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: [Link zur OS-Plattform]. Unsere E-Mail-Adresse findest du oben.",
        "Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
    },
    {
      h2: "Haftung für Inhalte und Links",
      body: [
        "Als Diensteanbieter sind wir für eigene Inhalte auf dieser Seite nach den allgemeinen Gesetzen verantwortlich.",
        "Für die Inhalte externer Händlerseiten, auf die über Affiliate-Links verwiesen wird, übernehmen wir keine Gewähr — maßgeblich ist ausschließlich die Angebotsseite des jeweiligen Händlers.",
      ],
    },
  ],
};

export const datenschutz: LegalPage = {
  title: "Datenschutzerklärung",
  sections: [
    {
      h2: "1. Verantwortlicher",
      body: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist [Firmenname], [Anschrift], [E-Mail-Adresse].",
      ],
    },
    {
      h2: "2. Server-Logfiles",
      body: [
        "Beim Aufruf der Website erhebt unser Hosting-Provider automatisch Informationen (u. a. IP-Adresse, Datum/Uhrzeit, aufgerufene Seite), die zur Sicherstellung eines störungsfreien Betriebs erforderlich sind.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem stabilen Betrieb).",
      ],
    },
    {
      h2: "3. Cookies",
      body: [
        "Wir verwenden technisch notwendige Cookies sowie – nach deiner Einwilligung – Cookies zur Reichweitenmessung und für Affiliate-Tracking.",
        "Details und Widerspruchsmöglichkeiten findest du in unseren Cookie-Einstellungen: [Link zum Cookie-Consent-Tool].",
      ],
    },
    {
      h2: "4. Watchlist und Preis-Alerts",
      body: [
        "Wenn du eine Watchlist anlegst oder einen Preis-Alert einrichtest, speichern wir die von dir angegebene E-Mail-Adresse sowie die beobachteten Artikel und Zielpreise, um dich benachrichtigen zu können.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des von dir angefragten Dienstes). Du kannst Alerts jederzeit selbst löschen.",
      ],
    },
    {
      h2: "5. Affiliate-Links und Partnerprogramme",
      body: [
        "Diese Website enthält Affiliate-Links zu Partnerhändlern, u. a. über das Netzwerk Awin. Beim Klick auf einen solchen Link kann ein Tracking-Cookie gesetzt werden, das dem Partnernetzwerk mitteilt, dass die Weiterleitung von 2ndLook stammt.",
        "Über den Klick hinaus werden dabei keine personenbezogenen Daten an uns übermittelt.",
      ],
    },
    {
      h2: "6. Deine Rechte",
      body: [
        "Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner Daten sowie ein Widerspruchsrecht gegen die Verarbeitung. Wende dich hierzu an [E-Mail-Adresse].",
      ],
    },
    { h2: "7. Kontakt für Datenschutzanfragen", body: ["[Name/Abteilung], [E-Mail-Adresse]"] },
  ],
};

export const agb: LegalPage = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  sections: [
    {
      h2: "§ 1 Geltungsbereich",
      body: [
        "Diese AGB gelten für die Nutzung der Plattform 2ndLook durch registrierte und nicht registrierte Nutzer:innen.",
      ],
    },
    {
      h2: "§ 2 Leistungsbeschreibung",
      body: [
        "2ndLook betreibt einen kostenlosen Preis-Tracking-Dienst für Streetwear, Sneaker und Düfte.",
        "Wir verkaufen keine eigenen Produkte, sondern verweisen über Affiliate-Links auf Angebote Dritter. Der Kaufvertrag kommt ausschließlich zwischen dir und dem jeweiligen Händler zustande.",
      ],
    },
    {
      h2: "§ 3 Registrierung und Nutzerkonto",
      body: [
        "Für Watchlist und Preis-Alerts ist die Angabe einer gültigen E-Mail-Adresse erforderlich. Du bist für die Richtigkeit deiner Angaben verantwortlich.",
      ],
    },
    {
      h2: "§ 4 Preisalarme und Benachrichtigungen",
      body: [
        "Preisangaben werden regelmäßig, aber nicht in Echtzeit aktualisiert. Wir übernehmen keine Gewähr für die Richtigkeit, Verfügbarkeit oder Aktualität von Preisen Dritter.",
      ],
    },
    {
      h2: "§ 5 Haftungsausschluss",
      body: [
        "Für Inhalte, Preisangaben und Verfügbarkeiten auf verlinkten Händlerseiten sind ausschließlich die jeweiligen Händler verantwortlich. 2ndLook haftet nicht für Schäden, die aus der Nutzung von Angeboten Dritter entstehen.",
      ],
    },
    {
      h2: "§ 6 Affiliate-Links",
      body: [
        '2ndLook erhält bei Käufen über bestimmte Links eine Provision vom jeweiligen Händler. Details siehe „Widerruf & Affiliate-Hinweis".',
      ],
    },
    {
      h2: "§ 7 Pflichten der Nutzer:innen",
      body: [
        "Der Dienst darf nicht missbräuchlich genutzt werden, etwa durch automatisiertes Auslesen (Scraping) oder Manipulation der Preisbenachrichtigungen.",
      ],
    },
    {
      h2: "§ 8 Kündigung",
      body: ["Du kannst dein Nutzerkonto und alle gespeicherten Alerts jederzeit ohne Angabe von Gründen löschen."],
    },
    {
      h2: "§ 9 Änderungen der AGB",
      body: [
        "Wir behalten uns vor, diese AGB mit Wirkung für die Zukunft anzupassen. Über wesentliche Änderungen informieren wir dich rechtzeitig.",
      ],
    },
    {
      h2: "§ 10 Schlussbestimmungen",
      body: [
        "Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
      ],
    },
  ],
};

export const widerruf: LegalPage = {
  title: "Widerrufsrecht & Affiliate-Hinweis",
  sections: [
    {
      h2: "Affiliate-Hinweis (Werbung)",
      body: [
        '2ndLook finanziert sich über Affiliate-Partnerschaften. Wenn du über einen mit „Anzeige" oder „Affiliate-Link" gekennzeichneten Link einkaufst, erhalten wir ggf. eine Provision vom Händler – für dich entstehen dadurch keine Mehrkosten.',
        "Die Auswahl der angezeigten Preise und Produkte erfolgt unabhängig von der Höhe einer möglichen Provision.",
      ],
    },
    {
      h2: "Widerrufsrecht",
      body: [
        "2ndLook verkauft selbst keine Waren. Der Kaufvertrag kommt beim Klick auf einen Affiliate-Link direkt zwischen dir und dem jeweiligen Händler zustande — ein gesetzliches Widerrufsrecht gegenüber 2ndLook besteht daher nicht.",
        "Informationen zum Widerruf eines Kaufs erhältst du direkt beim jeweiligen Händler, über den der Kauf abgeschlossen wurde.",
      ],
    },
    {
      h2: "Kündigung des 2ndLook-Kontos",
      body: [
        "Die Nutzung von 2ndLook ist kostenlos. Du kannst dein Konto und alle eingerichteten Preis-Alerts jederzeit und ohne Frist über [Einstellungen/Kontakt] löschen.",
      ],
    },
  ],
};
