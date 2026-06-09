const stats = [
  { value: '4',    label: 'Manual sources replaced' },
  { value: '1',    label: 'Live view for every CSC' },
  { value: '0',    label: 'Phone calls to check beds' },
  { value: 'AMU',  label: 'Pilot live now' },
];

const highlights = [
  'CEO and Matron champion at pilot site',
  'Nurse managers preferred FLOW over incoming EHR updates',
  'Real-time bed capacity heatmap across all wards',
  'Automated census: no manual Excel compilation',
];

export default function FlowTeaser() {
  return (
    <section id="case-study" className="py-24 bg-gray-50 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">

        <div data-reveal className="mb-5 flex items-center gap-3">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1
            rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/15">
            Flagship Product
          </span>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-700">AMU pilot active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div data-reveal>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.6rem)] font-display font-extrabold
              tracking-tight text-brand-navy mb-4 leading-tight">
              FLOW · Hospital Operational Visibility
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
              Our first product. Hospital teams were stitching together paper census sheets,
              Excel files, whiteboards, and WhatsApp messages to manage bed availability
              every shift. FLOW replaced all four with a single live dashboard.
            </p>

            <ul className="flex flex-col gap-2.5 mb-8">
              {highlights.map(h => (
                <li key={h} className="flex items-start gap-2.5 text-[14px] text-gray-600">
                  <svg className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" opacity=".4"/>
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {h}
                </li>
              ))}
            </ul>

            <a
              href="/flow"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white
                font-semibold text-[14px] hover:bg-brand-navy-mid transition-colors shadow-sm"
            >
              See Full Case Study
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
          </div>

          {/* Right — stats grid */}
          <div data-reveal className="grid grid-cols-2 gap-4">
            {stats.map(s => (
              <div
                key={s.label}
                className="rounded-2xl border border-black/[0.07] bg-white p-7
                  hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <div className="text-[3rem] font-display font-extrabold text-brand-navy leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-[13px] text-gray-400 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
