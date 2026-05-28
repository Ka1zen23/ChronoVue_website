import { useState } from 'react';

const links = [
  { label: 'Problem',      href: '#problem' },
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pilot',        href: '#pilot' },
  { label: 'Team',         href: '#team' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav
        id="main-nav"
        className="fixed top-0 inset-x-0 z-50
          bg-white/80 backdrop-blur-xl border-b border-transparent
          data-[scrolled]:border-black/[0.06] data-[scrolled]:shadow-[0_1px_16px_rgba(0,0,0,0.06)]"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center h-[62px] gap-8">
          <Logo />

          <ul className="hidden md:flex items-center gap-0.5 flex-1">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3.5 py-1.5 rounded-lg text-[13.5px] font-medium text-gray-500
                    hover:text-brand-navy hover:bg-black/[0.04] transition-all duration-150"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="/command-centre"
              className="px-5 py-2 text-[13.5px] font-semibold text-brand-navy
                border border-black/[0.1] rounded-lg hover:bg-black/[0.04] transition-colors"
            >
              Live Demo
            </a>
            <a
              href="#contact"
              data-magnetic="0.25"
              className="btn-shimmer px-5 py-2 text-[13.5px] font-semibold text-white
                bg-brand-navy hover:bg-brand-navy-mid rounded-lg transition-colors
                shadow-sm"
            >
              Apply for Ward Pilot
            </a>
          </div>

          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden ml-auto w-9 h-9 flex flex-col justify-center items-center gap-1.5
              rounded-lg hover:bg-black/[0.05] transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-brand-navy transition-all duration-200
              ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-brand-navy transition-all duration-200
              ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-brand-navy transition-all duration-200
              ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-[62px] z-40 bg-white border-b border-black/[0.06]
          shadow-lg md:hidden px-6 py-5 flex flex-col gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={close}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-black/[0.04]">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={close}
            className="mt-3 text-center py-2.5 rounded-lg bg-brand-navy text-white font-semibold text-sm">
            Apply for Ward Pilot
          </a>
        </div>
      )}
    </>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 shrink-0 group">
      <img 
        src="assets/logo.svg" 
        alt="Flow Logo" 
        className="w-[30px] h-[30px] shrink-0" 
      />
      <div className="leading-none">
        <span className="font-display font-bold text-[17px] text-brand-navy tracking-tight">FLOW</span>
        <span className="text-gray-400 font-normal text-[13px] ml-1.5">by Cekap</span>
      </div>
    </a>
  );
}
