export default function PriceAlertWidget() {
  return (
    <div className="rounded-xl bg-surface-hero p-5">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <span aria-hidden="true">🔔</span>
        Preis-Alerts
      </div>
      <p className="mt-2 text-sm text-muted">
        Diese Funktion ist noch in Vorbereitung. Aktuell werden keine Alerts gespeichert und keine
        E-Mails verschickt.
      </p>
    </div>
  );
}
