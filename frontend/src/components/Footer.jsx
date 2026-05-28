const cols = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',     href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Architecture', href: '#how-it-works' },
      { label: 'Roadmap',      href: '#pricing' },
    ],
  },
  {
    heading: 'Team Cekap',
    links: [
      { label: 'About the Team', href: '#team' },
      { label: 'Pilot Programme', href: '#pilot' },
      { label: 'Contact Us',      href: '#contact' },
    ],
  },
  {
    heading: 'For Hospitals',
    links: [
      { label: 'Apply for Pilot',     href: '#contact' },
      { label: 'EHR Partnership',     href: '#contact' },
      { label: 'Procurement Support', href: '#contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="team" className="bg-brand-navy text-white/60">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 font-display font-bold text-lg text-white mb-4">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#0066CC"/>
                <path d="M8 16h4v6H8v-6zM14 10h4v12h-4V10zM20 13h4v9h-4v-9z" fill="white"/>
                <circle cx="24" cy="9" r="3" fill="#06D6A0"/>
              </svg>
              FLOW <span className="text-white/40 font-normal text-base ml-1">by Cekap</span>
            </a>
            <p className="text-sm leading-relaxed max-w-[240px] mb-4">
              Real-time operational visibility for hospitals. Replacing paper census, Excel, whiteboards, and WhatsApp with one live dashboard.
            </p>
            <p className="text-sm leading-relaxed max-w-[240px] mb-6">
              Built in Brunei, for Brunei and beyond.
            </p>

            {/* Team disciplines */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Team Cekap</p>
              {['Computing', 'Data Analytics', 'Nursing', 'Public Health'].map(d => (
                <span key={d} className="text-xs text-white/55 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-green flex-shrink-0" />
                  {d}
                </span>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">{col.heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pilot status banner */}
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="text-sm font-semibold text-white mb-0.5">Currently piloting in RIPAS</div>
            <div className="text-xs text-white/50">FLOW is accepting applications for paid pilot deployments.</div>
          </div>
          <a href="#contact"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dk transition-colors">
            Apply for the Pilot →
          </a>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/35">
          <p>&copy; 2026 Team Cekap. FLOW - Flow and Logistics Operation Watch.</p>
          <p>Brunei Darussalam</p>
        </div>
      </div>
    </footer>
  );
}
