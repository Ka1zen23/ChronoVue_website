import useInView from '../hooks/useInView';
import useCountUp from '../hooks/useCountUp';
import { SectionHeader } from './Features';

const stats = [
  { value: 38,  unit: '%',  label: 'Reduction in average patient wait time' },
  { value: 94,  unit: '%',  label: 'Bed occupancy accuracy vs manual tracking' },
  { value: 40,  unit: '+',  label: 'Hospitals live on Cekap today' },
  { value: 2,   unit: 'M+', label: 'Patient admissions managed annually' },
];

const badges = ['MOH-Compliant', 'PDPA Certified', 'ISO 27001', 'HL7 FHIR R4'];

function StatCard({ value, unit, label }) {
  const [ref, inView] = useInView();
  const count = useCountUp(value, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="flex items-end justify-center gap-1 leading-none mb-3">
        <span className="text-5xl sm:text-6xl font-display font-extrabold text-white">{count}</span>
        <span className="text-2xl sm:text-3xl font-display font-bold text-brand-green mb-1">{unit}</span>
      </div>
      <p className="text-sm text-white/60 leading-snug max-w-[140px] mx-auto">{label}</p>
    </div>
  );
}

export default function Impact() {
  return (
    <section id="impact" className="py-24 bg-gradient-to-br from-brand-navy to-brand-navy-mid relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-teal/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionHeader
          tag="Real-World Impact"
          title="Numbers that matter to patients and CFOs"
          light
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map(b => (
            <span key={b} className="px-4 py-2 rounded-lg border border-white/15 bg-white/8 text-white/80 text-sm font-semibold">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
