import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const mainLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Our Work', href: '#case-study' },
  { label: 'Team',     href: '#team' },
  { label: 'Contact',  href: '#contact' },
];

const flowLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Approach', href: '#how-it-works' },
  { label: 'Traction', href: '#pilot' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar({ flow = false }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const links = flow ? flowLinks : mainLinks;

  return (
    <>
      <nav
        id="main-nav"
        className="fixed top-0 inset-x-0 z-50
          bg-white/80 dark:bg-brand-navy/90 backdrop-blur-xl
          border-b border-transparent
          data-[scrolled]:border-black/[0.06] dark:data-[scrolled]:border-white/[0.08]
          data-[scrolled]:shadow-[0_1px_16px_rgba(0,0,0,0.06)]"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center h-[62px] gap-8">
          <Logo />

          <ul className="hidden md:flex items-center gap-0.5 flex-1">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3.5 py-1.5 rounded-lg text-[13.5px] font-medium
                    text-gray-500 dark:text-white/60
                    hover:text-brand-navy dark:hover:text-white
                    hover:bg-black/[0.04] dark:hover:bg-white/[0.06]
                    transition-all duration-150"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {flow ? (
              <a
                href="/"
                className="px-5 py-2 text-[13.5px] font-semibold text-brand-navy dark:text-white
                  border border-black/[0.1] dark:border-white/[0.15] rounded-lg
                  hover:bg-black/[0.04] dark:hover:bg-white/[0.07] transition-colors"
              >
                ← ChronoVue
              </a>
            ) : (
              <a
                href="/flow"
                className="px-5 py-2 text-[13.5px] font-semibold text-brand-navy dark:text-white
                  border border-black/[0.1] dark:border-white/[0.15] rounded-lg
                  hover:bg-black/[0.04] dark:hover:bg-white/[0.07] transition-colors"
              >
                FLOW Case Study
              </a>
            )}
            <a
              href="#contact"
              data-magnetic="0.25"
              className="btn-shimmer px-5 py-2 text-[13.5px] font-semibold text-white
                bg-brand-navy hover:bg-brand-navy-mid
                dark:bg-brand-blue dark:hover:bg-brand-blue-dk
                rounded-lg transition-colors shadow-sm"
            >
              Get in Touch
            </a>
          </div>

          <div className="md:hidden ml-auto flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setOpen(o => !o)}
              className="w-9 h-9 flex flex-col justify-center items-center gap-1.5
                rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-[1.5px] bg-brand-navy dark:bg-white transition-all duration-200
                ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-brand-navy dark:bg-white transition-all duration-200
                ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-brand-navy dark:bg-white transition-all duration-200
                ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-[62px] z-40
          bg-white dark:bg-brand-navy
          border-b border-black/[0.06] dark:border-white/[0.08]
          shadow-lg md:hidden px-6 py-5 flex flex-col gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={close}
              className="px-3 py-2.5 rounded-lg text-sm font-medium
                text-gray-600 dark:text-white/70
                hover:bg-black/[0.04] dark:hover:bg-white/[0.07]">
              {l.label}
            </a>
          ))}
          {flow && (
            <a href="/" onClick={close}
              className="px-3 py-2.5 rounded-lg text-sm font-medium
                text-gray-600 dark:text-white/70
                hover:bg-black/[0.04] dark:hover:bg-white/[0.07]">
              ← ChronoVue
            </a>
          )}
          <a href="#contact" onClick={close}
            className="mt-3 text-center py-2.5 rounded-lg
              bg-brand-navy dark:bg-brand-blue
              text-white font-semibold text-sm">
            Get in Touch
          </a>
        </div>
      )}
    </>
  );
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 shrink-0 group">
      <img
        src="/assets/logo.svg"
        alt="ChronoVue Logo"
        className="w-[30px] h-[30px] shrink-0"
      />
      <div className="leading-none">
        <span className="font-display font-bold text-[17px] text-brand-navy dark:text-white tracking-tight">
          ChronoVue
        </span>
      </div>
    </a>
  );
}
