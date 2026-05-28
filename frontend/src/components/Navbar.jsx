import { useState, useEffect } from 'react';

const links = [
  { label: 'Problem',     href: '#problem' },
  { label: 'Features',    href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pilot',       href: '#pilot' },
  { label: 'Team',        href: '#team' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-200
        bg-white/88 backdrop-blur-md
        ${scrolled ? 'border-b border-gray-200 shadow-sm' : 'border-b border-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center h-16 gap-8">
          <Logo />
          <ul className="hidden md:flex items-center gap-1 flex-1">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-brand-navy hover:bg-gray-50 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-2">
            <a href="#contact"
              className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-dk rounded-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-px">
              Apply for Pilot
            </a>
          </div>
          <button onClick={() => setOpen(o => !o)}
            className="md:hidden ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu">
            <span className="block w-5 h-px bg-brand-navy mb-1.5" />
            <span className="block w-5 h-px bg-brand-navy mb-1.5" />
            <span className="block w-5 h-px bg-brand-navy" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-200 shadow-lg md:hidden px-6 py-4 flex flex-col gap-2">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={close}
              className="px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={close}
            className="mt-3 text-center py-2.5 rounded-lg bg-brand-blue text-white font-semibold text-sm">
            Apply for Pilot
          </a>
        </div>
      )}
    </>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 font-display font-bold text-lg text-brand-navy shrink-0">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#0066CC"/>
        <path d="M8 16h4v6H8v-6zM14 10h4v12h-4V10zM20 13h4v9h-4v-9z" fill="white"/>
        <circle cx="24" cy="9" r="3" fill="#06D6A0"/>
      </svg>
      <span>FLOW <span className="text-gray-400 font-medium text-sm">by Cekap</span></span>
    </a>
  );
}
