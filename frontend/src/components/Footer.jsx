const cols = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',     href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Ward Pilots',  href: '#pricing' },
      { label: 'Architecture', href: '#how-it-works' },
    ],
  },
  {
    heading: 'Team Cekap',
    links: [
      { label: 'About',            href: '#team' },
      { label: 'Pilot Programme',  href: '#pilot' },
      { label: 'Contact',          href: '#contact' },
    ],
  },
  {
    heading: 'For Hospitals',
    links: [
      { label: 'Apply for Pilot',    href: '#contact' },
      { label: 'EHR Partnership',    href: '#contact' },
      { label: 'Procurement Support', href: '#contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="team" className="bg-brand-navy">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="inline-flex items-center gap-2.5 mb-5">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="7" fill="white" fillOpacity=".1"/>
                <path d="M8 16h4v6H8v-6zM14 10h4v12h-4V10zM20 13h4v9h-4v-9z" fill="white" fillOpacity=".9"/>
                <circle cx="24" cy="9" r="3" fill="#06D6A0"/>
              </svg>
              <div>
                <span className="font-display font-bold text-white text-[17px] tracking-tight">FLOW</span>
                <span className="text-white/30 font-normal text-[13px] ml-1.5">by Cekap</span>
              </div>
            </a>

            <p className="text-[13.5px] text-white/45 leading-relaxed max-w-[220px] mb-6">
              Real-time operational visibility for hospitals. Replacing paper census, Excel,
              whiteboards, and WhatsApp with one live dashboard.
            </p>
            <p className="text-sm leading-relaxed max-w-[240px] mb-6">
              Built in Brunei, for Brunei — and beyond.
            </p>

            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/25 mb-1">
                Team disciplines
              </p>
              {['Computing', 'Data Analytics', 'Nursing', 'Public Health'].map(d => (
                <span key={d} className="text-[12.5px] text-white/40 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-green/60 flex-shrink-0" />
                  {d}
                </span>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-white/30 mb-4">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href}
                      className="text-[13.5px] text-white/45 hover:text-white/80 transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pilot CTA strip */}
        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.04] px-7 py-5
          flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white mb-0.5">AMU Pilot — Now Open</div>
            <div className="text-xs text-white/50">FLOW is accepting applications for paid pilot deployments.</div>
          </div>
          <a
            href="#contact"
            data-magnetic="0.2"
            className="btn-shimmer shrink-0 px-5 py-2.5 rounded-xl bg-white text-brand-navy
              text-[13.5px] font-semibold hover:bg-white/90 transition-colors shadow-sm"
          >
            Apply for Your Ward
          </a>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/35">
          <p>&copy; 2026 Team Cekap. FLOW — Real-Time Operational Visibility Platform.</p>
          <p>Brunei Darussalam</p>
        </div>
      </div>
    </footer>
  );
}
