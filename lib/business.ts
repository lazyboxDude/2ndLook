// Anbieterangaben – zentrale Quelle für Impressum, Datenschutz, AGB und Datenlöschung.
// ALLE Werte sind Platzhalter und müssen vor Launch ersetzt werden (Plane: 2NDLOOK-34).
export const BUSINESS = {
  name: "[Vorname Nachname / Firma]",
  legalForm: "[Rechtsform, z. B. Einzelunternehmen]",
  address: "[Strasse Nr., PLZ Ort], Schweiz",
  email: "[E-Mail-Adresse]",
  phone: "[Telefonnummer, optional]",
  uid: "[UID-Nr. CHE-xxx.xxx.xxx, falls vorhanden]",
  vat: "[MWST-Nr., falls mehrwertsteuerpflichtig]",
} as const;

/** Mindestalter für ein Konto. */
export const MIN_AGE = 16;
