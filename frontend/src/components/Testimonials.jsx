import { SectionHeader } from './Features';

const testimonials = [
  {
    quote: 'During testing, nurse managers told us they preferred FLOW\'s visual approach over the interface of the incoming EHR updates. The value isn\'t just the data — it\'s how it\'s presented for fast operational decisions.',
    attribution: 'Team Cekap',
    role: 'Prototype testing debrief — AMU ward',
    large: true,
  },
  {
    quote: 'The synthesis cost is real. Every shift, I\'m calling wards, checking Excel, looking at the whiteboard. Anything that puts that in one place — I\'m in.',
    attribution: 'Nurse Manager',
    role: 'Acute Medical Unit — empathy mapping session',
  },
  {
    quote: 'As a CSC, I need to see everything without making a single call. Right now I can\'t. FLOW changes that — I can act the moment a bed is ready, not after three phone calls.',
    attribution: 'Clinical Site Coordinator',
    role: 'Direct observation session',
  },
  {
    quote: 'What I want is the car park display — green, amber, red. Don\'t make me think. Show me where the capacity is and let me move patients.',
    attribution: 'Nurse Manager',
    role: 'Prototype testing — visual heatmap feedback',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-white border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="From the Wards"
          title="Built around what nurses and CSCs actually said"
          sub="Every design decision in FLOW traces back to direct observation, empathy mapping, and prototype testing sessions with the people who will use it."
        />
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-reveal
              className={`rounded-2xl border border-black/[0.07] p-8 bg-white
                hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
                ${t.large ? 'md:col-span-2 bg-gradient-to-br from-white to-brand-blue-lt/40' : ''}`}
            >
              {/* Quote mark */}
              <div className="text-brand-blue/20 font-display font-bold text-6xl leading-none mb-4 -mt-2">
                &ldquo;
              </div>
              <blockquote className="text-brand-navy/80 text-[15px] leading-relaxed mb-6 -mt-6 pl-2">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-3 pl-2">
                <div className="w-[3px] h-8 rounded-full bg-brand-blue/30 shrink-0" />
                <div>
                  <div className="text-[13px] font-bold text-brand-navy">{t.attribution}</div>
                  <div className="text-[12px] text-gray-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p data-reveal className="text-center text-[12px] text-gray-400 mt-8 max-w-lg mx-auto leading-relaxed">
          Quotes reflect insights from empathy mapping, direct observation, and prototype testing
          sessions conducted during FLOW's validation phase in the AMU.
        </p>
      </div>
    </section>
  );
}
