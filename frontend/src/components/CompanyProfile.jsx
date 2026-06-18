// Company Profile section — visual language taken from the 2026 ChronoVue Company Profile covers:
// cream background, teal diamond outlines, solid navy/teal accent diamonds, topographic contour lines.

export default function CompanyProfile() {
  return (
    <section className="relative overflow-hidden bg-[#EAE7DF]">

      {/* === Topographic contour lines — left side, matching cover === */}
      <TopoLines className="absolute left-0 top-0 w-[500px] h-full pointer-events-none" />

      {/* === Large diamond outline — top-left, matches cover's big hollow diamond === */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '-120px', left: '-120px', width: '380px', height: '380px',
          border: '1.5px solid rgba(0,180,216,0.28)', transform: 'rotate(45deg)' }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ top: '-60px', left: '-60px', width: '260px', height: '260px',
          border: '1px solid rgba(0,180,216,0.14)', transform: 'rotate(45deg)' }}
      />

      {/* === Small solid diamonds — bottom-right, matches cover accent === */}
      <div
        className="absolute pointer-events-none bg-[#0A1628]/80"
        style={{ bottom: '-30px', right: '-30px', width: '96px', height: '96px', transform: 'rotate(45deg)' }}
      />
      <div
        className="absolute pointer-events-none bg-brand-teal/25"
        style={{ bottom: '40px', right: '80px', width: '36px', height: '36px', transform: 'rotate(45deg)' }}
      />

      {/* === Content === */}
      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Left: editorial text block */}
          <div data-reveal className="max-w-lg">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-navy/40 mb-5">
              2026 · Brunei Darussalam
            </p>
            <h2
              className="font-display font-black uppercase text-brand-navy leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(3rem,6.5vw,5.2rem)', letterSpacing: '-0.03em' }}
            >
              Company<br />Profile
            </h2>
            <p className="text-[15px] text-brand-navy/55 leading-relaxed mb-8 max-w-sm">
              Our studio, our team, our first product FLOW, and our roadmap
              for digital transformation in Brunei&rsquo;s healthcare sector.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:support@chronovue.co?subject=Company Profile Request"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl
                  bg-brand-navy text-white font-semibold text-[14px]
                  hover:bg-brand-navy-mid transition-colors shadow-md shadow-brand-navy/20"
              >
                <EnvelopeIcon />
                Request a Copy
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  border border-brand-navy/20 text-brand-navy font-semibold text-[14px]
                  hover:bg-brand-navy/[0.06] transition-colors"
              >
                Talk to Us
              </a>
            </div>
          </div>

          {/* Right: stacked cover preview cards */}
          <div data-reveal className="relative shrink-0 self-center" style={{ width: '260px', height: '340px' }}>

            {/* Dark cover — behind, offset bottom-right */}
            <div
              className="absolute overflow-hidden rounded-2xl bg-brand-navy shadow-2xl"
              style={{ bottom: 0, right: 0, width: '220px', height: '285px' }}
            >
              <MiniTopoLines dark />
              <div
                className="absolute pointer-events-none border border-brand-teal/25"
                style={{ top: '-24px', right: '-24px', width: '80px', height: '80px', transform: 'rotate(45deg)' }}
              />
              <div
                className="absolute pointer-events-none bg-brand-green/30"
                style={{ bottom: '18px', left: '18px', width: '22px', height: '22px', transform: 'rotate(45deg)' }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[6.5px] font-bold uppercase tracking-[0.18em] text-white/35 mb-0.5">
                  ChronoVue
                </div>
                <div className="text-[11px] font-black uppercase tracking-tight text-white leading-[1.1]">
                  Company<br />Profile
                </div>
                <div className="text-[5.5px] font-medium uppercase tracking-widest text-white/25 mt-1.5">
                  2026 · Brunei Darussalam
                </div>
              </div>
            </div>

            {/* Light cover — front, offset top-left */}
            <div
              className="absolute overflow-hidden rounded-2xl border border-brand-navy/10 shadow-xl"
              style={{ top: 0, left: 0, width: '220px', height: '285px', background: '#EAE7DF' }}
            >
              <MiniTopoLines />
              <div
                className="absolute pointer-events-none border border-brand-teal/35"
                style={{ top: '-28px', left: '-28px', width: '90px', height: '90px', transform: 'rotate(45deg)' }}
              />
              <div
                className="absolute pointer-events-none bg-brand-navy/75"
                style={{ bottom: '16px', right: '16px', width: '20px', height: '20px', transform: 'rotate(45deg)' }}
              />
              {/* Mini logo mark */}
              <div className="absolute top-5 right-5">
                <div className="w-6 h-6 rounded bg-brand-navy/10 flex items-center justify-center">
                  <div
                    className="w-3 h-3 border border-brand-navy/40"
                    style={{ transform: 'rotate(45deg)' }}
                  />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[6.5px] font-bold uppercase tracking-[0.18em] text-brand-navy/40 mb-0.5">
                  ChronoVue
                </div>
                <div className="text-[11px] font-black uppercase tracking-tight text-brand-navy leading-[1.1]">
                  Company<br />Profile
                </div>
                <div className="text-[5.5px] font-medium uppercase tracking-widest text-brand-navy/35 mt-1.5">
                  2026 · Brunei Darussalam
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label strip */}
      <div className="relative border-t border-brand-navy/[0.08]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy/35">
            2026 ChronoVue Company Profile
          </p>
          <p className="text-[10px] font-medium text-brand-navy/30 tracking-wide">
            Brunei Darussalam
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Topographic contour lines (full section, left side) ────────────────────

function TopoLines({ className }) {
  // 14 organic wavy lines spaced across the height, heavier toward bottom
  const lines = [
    'M 0 55   C 70 35  140 75  210 52  S 340 30  440 58  S 520 72  580 50',
    'M 0 88   C 65 68  135 108 205 82  S 330 62  435 90  S 515 105 575 82',
    'M 0 122  C 75 98  145 140 215 116 S 340 94  440 124 S 520 138 578 116',
    'M 0 158  C 68 138 138 178 208 152 S 334 130 436 160 S 516 174 574 150',
    'M 0 196  C 72 174 142 214 212 190 S 337 168 438 198 S 518 212 576 188',
    'M 0 234  C 66 214 136 252 206 228 S 332 206 434 234 S 514 248 572 226',
    'M 0 272  C 73 250 143 290 213 266 S 338 244 440 272 S 520 288 578 264',
    'M 0 310  C 69 290 139 328 209 304 S 333 282 435 310 S 515 326 573 302',
    'M 0 350  C 74 328 144 368 214 344 S 340 322 441 350 S 521 366 579 342',
    'M 0 390  C 67 370 137 408 207 384 S 331 362 433 390 S 513 406 571 382',
    'M 0 432  C 76 410 146 450 216 426 S 342 404 442 432 S 522 448 580 424',
    'M 0 474  C 70 454 140 492 210 468 S 334 446 436 474 S 516 490 574 466',
    'M 0 518  C 74 496 144 536 214 512 S 339 490 440 518 S 520 534 578 510',
    'M 0 562  C 68 542 138 580 208 556 S 332 534 434 562 S 514 578 572 554',
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 580 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
    >
      {lines.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#0A1628"
          strokeWidth="0.85"
          opacity={0.045 + i * 0.003}
        />
      ))}
    </svg>
  );
}

// ─── Mini topographic lines (inside cover cards) ────────────────────────────

function MiniTopoLines({ dark }) {
  const stroke = dark ? 'rgba(255,255,255,0.12)' : 'rgba(10,22,40,0.08)';
  const lines = [
    'M 0 18  C 28 10 55 26  82 16  S 140 8  180 20',
    'M 0 32  C 26 24 54 40  80 30  S 138 22 178 34',
    'M 0 47  C 30 38 57 54  84 44  S 142 36 182 48',
    'M 0 62  C 27 54 54 68  82 58  S 138 50 178 62',
    'M 0 78  C 29 70 56 84  84 74  S 141 66 180 78',
    'M 0 94  C 28 86 55 100 82 90  S 139 82 178 94',
  ];
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin slice"
    >
      {lines.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth="0.8" />
      ))}
    </svg>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function EnvelopeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 4l7 5 7-5" />
    </svg>
  );
}
