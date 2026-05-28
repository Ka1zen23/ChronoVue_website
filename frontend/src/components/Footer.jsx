const cols = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',     href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing',      href: '#pricing' },
      { label: 'Integrations', href: '#' },
      { label: 'Changelog',    href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',  href: '#' },
      { label: 'Careers',   href: '#' },
      { label: 'Blog',      href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Contact',   href: '#contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference',  href: '#' },
      { label: 'Case Studies',   href: '#' },
      { label: 'Status Page',    href: '#' },
      { label: 'Support Centre', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',  href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'PDPA Notice',     href: '#' },
      { label: 'Security',        href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/60">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 font-display font-bold text-lg text-white mb-4">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#0066CC"/>
                <path d="M8 16h4v6H8v-6zM14 10h4v12h-4V10zM20 13h4v9h-4v-9z" fill="white"/>
                <circle cx="24" cy="9" r="3" fill="#06D6A0"/>
              </svg>
              Cekap
            </a>
            <p className="text-sm leading-relaxed max-w-[220px] mb-6">
              Intelligent bed management for modern hospitals. Built in Malaysia, for Malaysia and beyond.
            </p>
            <div className="flex gap-2">
              {['in', 'x'].map(icon => (
                <a key={icon} href="#"
                  className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white transition-colors">
                  {icon}
                </a>
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
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
          <p>&copy; 2026 Cekap Technologies Sdn. Bhd. (1234567-K). All rights reserved.</p>
          <p>Registered in Malaysia · SSM No. 1234567-K · MDEC MyDIGITAL Corp</p>
        </div>
      </div>
    </footer>
  );
}
