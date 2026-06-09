const sources = [
  { label: 'Paper census sheets', sub: 'Static. Out of date before the shift ends.' },
  { label: 'Excel files', sub: 'Manual entry. Version conflicts every shift.' },
  { label: 'Whiteboards', sub: 'Invisible to every ward except your own.' },
  { label: 'WhatsApp groups', sub: 'Informal, untracked, no audit trail.' },
];

export default function CaseStudyIntro() {
  return (
    <section id="case-study" className="py-20 bg-gray-50 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">

        <div data-reveal className="mb-4">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1
            rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/15">
            Case Study
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">

          {/* Left: description */}
          <div data-reveal className="max-w-xl">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.6rem)] font-display font-extrabold
              tracking-tight text-brand-navy mb-4">
              FLOW — Hospital Operational Visibility
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-3">
              Hospital teams were reconciling four separate data sources every shift to manage
              patient movement and bed availability. We built FLOW — a live operational
              dashboard that replaces all four with a single real-time view of every ward.
            </p>
            <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
              Currently live in the Acute Medical Unit (AMU). Championed by hospital CEO and Matron.
              Nurse managers preferred FLOW's interface over incoming EHR updates in prototype testing.
            </p>
            <div className="flex gap-3">
              <a
                href="/command-centre"
                className="px-5 py-2.5 text-[13.5px] font-semibold text-brand-navy
                  border border-black/[0.1] rounded-lg hover:bg-black/[0.04] transition-colors"
              >
                Live Demo
              </a>
              <a
                href="#contact"
                className="btn-shimmer px-5 py-2.5 text-[13.5px] font-semibold text-white
                  bg-brand-navy hover:bg-brand-navy-mid rounded-lg transition-colors shadow-sm"
              >
                Apply for Pilot
              </a>
            </div>
          </div>

          {/* Right: problem cards */}
          <div data-reveal className="lg:w-[420px] shrink-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-3">
              The four sources we replaced
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {sources.map(s => (
                <div key={s.label}
                  className="bg-white border border-black/[0.07] rounded-xl p-4
                    hover:border-black/[0.12] transition-all">
                  <div className="text-[13px] font-semibold text-brand-navy mb-1">{s.label}</div>
                  <div className="text-[12px] text-gray-400 leading-snug">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-black/[0.08]" />
              <span className="text-[12px] font-semibold text-brand-green border border-brand-green/25
                bg-brand-green/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                FLOW replaces all four
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-black/[0.08]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
