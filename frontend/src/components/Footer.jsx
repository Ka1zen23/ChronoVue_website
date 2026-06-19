export default function Footer() {
  return (
    <footer id="footer" className="bg-[#243046] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        
        <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-5">

          {/* Brand */}
          <div className="col-span-2">
            
            <a href="#" className="mb-5 inline-flex items-center gap-3">
              
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <img 
                  src="/assets/logo.svg"
                  alt="Flow Logo" 
                  className="w-[30px] h-[30px] shrink-0" 
                />
              </div>

              <div>
                <div className="font-display text-[18px] font-black tracking-tight text-white">
                  ChronoVue
                </div>
              </div>
            </a>

            <p className="mb-6 max-w-[260px] text-[13.5px] leading-relaxed text-white/50">
              ChronoVue is a product studio that builds operational SaaS for sectors
              where teams are still relying on manual, fragmented processes to do critical work.
            </p>

            <p className="mb-6 text-sm text-white/65">
              Built in Brunei Darussalam.
            </p>

            <div className="flex flex-col gap-2">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/25">
                Team disciplines
              </p>

              {[
                'Software Development',
                'Data Analytics',
                'Nursing & Midwifery',
                'Public Health',
              ].map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-2 text-[12.5px] text-white/45"
                >
                  <span className="h-1 w-1 rounded-full bg-[#7a9680]" />
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              
              <h4 className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/30">
                {col.heading}
              </h4>

              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="
                        text-[13.5px] text-white/45
                        transition-colors duration-200
                        hover:text-white
                      "
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div
          className="
            flex flex-col justify-between gap-4 rounded-3xl
            border border-white/10
            bg-white/[0.04]
            px-7 py-5
            sm:flex-row sm:items-center
          "
        >
          <div>
            <div className="mb-0.5 text-sm font-semibold text-white">
              Open to collaboration
            </div>

            <div className="text-xs text-white/50">
              Healthcare organisations, EHR integration partners, and procurement advisors:
              we want to hear from you.
            </div>
          </div>

          <a
            href="#contact"
            className="
              shrink-0 rounded-xl
              bg-white px-5 py-2.5
              text-[13.5px] font-semibold text-[#243046]
              shadow-sm transition-colors
              hover:bg-white/90
            "
          >
            Contact Team
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/8">
        <div
          className="
            mx-auto flex max-w-6xl flex-col
            justify-between gap-2 px-6 py-5
            text-xs text-white/35
            sm:flex-row
          "
        >
          <p>
            © 2026 ChronoVue. All rights reserved.
          </p>

          <p>Brunei Darussalam</p>
        </div>
      </div>
    </footer>
  );
}

/* Footer Columns */

const cols = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',     href: '/#about' },
      { label: 'Our Work',     href: '/#case-study' },
      { label: 'Team',         href: '/#team' },
      { label: 'Contact',      href: '/#contact' },
    ],
  },
  {
    heading: 'FLOW',
    links: [
      { label: 'Case Study',       href: '/flow' },
      { label: 'Feature Set',      href: '/flow#features' },
      { label: 'Traction',         href: '/flow#pilot' },
      { label: 'Deployment Model', href: '/flow#pricing' },
    ],
  },
  {
    heading: 'Get Started',
    links: [
      { label: 'Apply for Pilot',       href: '/#contact' },
      { label: 'EHR Integration',       href: '/#contact' },
      { label: 'Procurement Mentorship', href: '/#contact' },
    ],
  },
];