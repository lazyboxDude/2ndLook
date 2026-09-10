import type { LegalPage } from "@/lib/legal-content";

export default function LegalPageLayout({ page }: { page: LegalPage }) {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-12 md:px-16 md:py-16">
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">{page.title}</h1>
      <p className="mt-2 font-mono text-xs text-muted">Stand: [TT.MM.JJJJ]</p>
      <div className="mt-8 flex flex-col gap-5">
        {page.sections.map((section) => (
          <section key={section.h2}>
            <h2 className="text-lg font-semibold text-foreground md:text-xl">{section.h2}</h2>
            <div className="mt-2 flex flex-col gap-3">
              {section.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted md:text-[15px]">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
