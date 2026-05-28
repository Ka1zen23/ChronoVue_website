import { SectionHeader } from './Features';
import useInView from '../hooks/useInView';
import useCountUp from '../hooks/useCountUp';

const stats = [
  { value: 4,  unit: ' sources', label: 'manually reconciled by nurse managers every shift — replaced by FLOW' },
  { value: 1,  unit: ' live view', label: 'of every bed in every ward — visible to the CSC without a single phone call' },
  { value: 0,  unit: ' phone calls', label: 'needed to find a free bed when FLOW is running' },
  { value: 5,  unit: ' phases', label: 'of the patient journey tracked end-to-end from admission to discharge' },
];

const validations = [
  { icon: '🏥', label: 'AMU Pilot Greenlit', sub: 'Formally approved for a paid pilot in the Acute Medical Unit' },
  { icon: '👔', label: 'CEO Champion',        sub: 'Project championed at executive level by the hospital CEO' },
  { icon: '🏥', label: 'Matron Endorsement',  sub: 'Clinical champion on board — critical for nursing staff adoption' },
  { icon: '✅', label: 'Preferred by Nurses', sub: 'Nurse managers chose FLOW\'s interface over incoming EHR updates in prototype testing' },
];

function StatCard({ value, unit, label }) {
  const [ref, inView] = useInView();
  const count = useCountUp(value, inView, 1200);
  return (
    <div ref={ref} className="text-center">
      <div className="flex items-end justify-center gap-1 leading-none mb-3">
        <span className="text-5xl sm:text-6xl font-display font-extrabold text-white">{count}</span>
        <span className="text-xl sm:text-2xl font-display font-bold text-brand-green mb-1 whitespace-nowrap">{unit}</span>
      </div>
      <p className="text-sm text-white/60 leading-snug max-w-[160px] mx-auto">{label}</p>
    </div>
  );
}

export default function Impact() {
  return (
    <section id="pilot" className="py-24 bg-gradient-to-br from-brand-navy to-brand-navy-mid relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-teal/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionHeader
          tag="Pilot Traction"
          title="Validated by the people who actually use it"
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {validations.map(v => (
            <div key={v.label} className="bg-white/8 border border-white/12 rounded-xl p-5">
              <div className="text-2xl mb-3">{v.icon}</div>
              <div className="text-sm font-bold text-white mb-1.5">{v.label}</div>
              <div className="text-xs text-white/55 leading-snug">{v.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
