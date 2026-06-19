import { SectionHeader } from './Features';
import useInView from '../hooks/useInView';
import useCountUp from '../hooks/useCountUp';

const stats = [
  { value: 4,   suffix: '',     label: 'Manual sources replaced',       sub: 'paper census, Excel, whiteboards, WhatsApp' },
  { value: 1,   suffix: '',     label: 'Live view for every CSC',        sub: 'hospital-wide, updated in real time' },
  { value: 0,   suffix: '',     label: 'Phone calls to check bed status', sub: 'when FLOW is running on your ward' },
  { value: 5,   suffix: '',     label: 'Patient flow phases tracked',    sub: 'admission to discharge, end-to-end' },
];

const validations = [
  {
    icon: <PilotIcon />,
    label: 'AMU Pilot Active',
    sub: 'Currently live in the Acute Medical Unit, our first ward deployment.',
  },
  {
    icon: <CeoIcon />,
    label: 'CEO Champion',
    sub: 'Championed at executive level. Matron endorsement secured for clinical adoption.',
  },
  {
    icon: <NurseIcon />,
    label: 'Nurse Preference',
    sub: 'Nurse managers chose FLOW\'s interface over incoming EHR updates in prototype testing.',
  },
  {
    icon: <WardIcon />,
    label: 'Ward-by-Ward Rollout',
    sub: 'Every ward gets its own dedicated pilot. We deploy only when the team is ready.',
  },
];

function StatCard({ value, suffix, label, sub }) {
  const [ref, inView] = useInView();
  const count = useCountUp(value, inView, 1100);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-end justify-center gap-0.5 leading-none mb-3">
        <span className="text-[clamp(3rem,6vw,4.5rem)] font-display font-extrabold text-white">
          {count}
        </span>
        {suffix && (
          <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold text-brand-sage mb-1">
            {suffix}
          </span>
        )}
      </div>
      <p className="text-[13px] font-semibold text-white/70 mb-1">{label}</p>
      <p className="text-[12px] text-white/35 leading-snug max-w-[140px] mx-auto">{sub}</p>
    </div>
  );
}

export default function Impact() {
  return (
    <section id="pilot" className="py-28 bg-brand-navy relative overflow-hidden">
      {/* Decorative blobs — slow parallax via GSAP ScrollTrigger */}
      <div data-parallax-blob className="absolute -top-32 -right-32 w-96 h-96 rounded-full
        bg-brand-teal/[0.12] blur-3xl pointer-events-none" />
      <div data-parallax-blob="reverse" className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full
        bg-brand-teal/[0.08] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Traction"
          title="Validated by the people in the wards"
          light
        />

        <div data-stagger className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {validations.map(v => (
            <div
              key={v.label}
              data-reveal
              className="bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6
                hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
            >
              <div className="text-white/40 mb-4 w-8 h-8 flex items-center">{v.icon}</div>
              <div className="text-[14px] font-bold text-white mb-2">{v.label}</div>
              <div className="text-[13px] text-white/45 leading-snug">{v.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PilotIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  );
}
function CeoIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}
function NurseIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="7" r="4"/>
      <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7"/>
      <path d="M12 12v4M10 14h4" strokeLinejoin="round"/>
    </svg>
  );
}
function WardIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-4 0v2"/>
      <path d="M12 12v4M10 14h4"/>
    </svg>
  );
}
