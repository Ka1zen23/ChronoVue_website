import { SectionHeader } from './Features';

const testimonials = [
  {
    quote: '"During testing, nurse managers told us they preferred FLOW\'s visual approach over the interface of the incoming EHR updates. That\'s a strong signal. The value isn\'t just the data — it\'s how it\'s presented for fast operational decisions."',
    name: 'Team Cekap',
    role: 'Prototype testing debrief — AMU, Brunei',
    initials: 'TC',
    color: 'bg-brand-blue',
    featured: true,
  },
  {
    quote: '"The synthesis cost is real. Every shift, I\'m calling wards, checking Excel, looking at the whiteboard. Anything that puts that in one place — I\'m in."',
    name: 'Nurse Manager',
    role: 'Acute Medical Unit — empathy mapping session',
    initials: 'NM',
    color: 'bg-brand-green',
  },
  {
    quote: '"As a CSC, I need to see everything without making a single call. Right now I can\'t. FLOW changes that — I can act the moment a bed is ready, not after three phone calls."',
    name: 'Clinical Site Coordinator',
    role: 'CSC — direct observation session',
    initials: 'CSC',
    color: 'bg-violet-600',
  },
  {
    quote: '"What I want is the car park display — green, amber, red. Don\'t make me think. Show me where the capacity is and let me move patients."',
    name: 'Nurse Manager',
    role: 'Prototype testing — visual heatmap feedback',
    initials: 'NM',
    color: 'bg-orange-600',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="From the Wards"
          title="Built around what nurses and CSCs actually said"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div key={i}
              className={`rounded-2xl border p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200
                ${t.featured
                  ? 'border-brand-blue/20 bg-gradient-to-br from-brand-blue-lt to-blue-50 md:col-span-2'
                  : 'border-gray-200 bg-gray-50'}`}>
              <div className="text-amber-400 text-base tracking-widest mb-4">★★★★★</div>
              <blockquote className="text-gray-700 text-sm leading-relaxed italic mb-5">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-navy">{t.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Quotes reflect insights from empathy mapping, direct observation, and prototype testing sessions conducted during FLOW's validation phase.
        </p>
      </div>
    </section>
  );
}
