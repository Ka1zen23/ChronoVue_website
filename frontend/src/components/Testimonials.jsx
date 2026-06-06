import { SectionHeader } from './Features';

const testimonials = [
  {
    quote: 'As a Central Shift Coordinator, being alert to all bed availability is critical. When one ward is full, we have to quickly allocate patients to other available beds across different wards. Previously, keeping track of this meant manually clerking data into separate tabs in Microsoft Excel, making it incredibly difficult to get a clear picture of our census data. This solution has completely transformed how we manage our capacity.',
    attribution: 'Sister & Central Shift Coordinator (Nurse Manager)',
    role: 'Capacity management & operational workflow feedback',
  },
  {
    quote: 'Don\'t make me think. I just want to understand the capacity at a single glance so I can see exactly where the open beds are and move patients immediately without wasting time.',
    attribution: 'Nurse Manager',
    role: 'Prototype testing — visual design and glanceability feedback',
  },
  {
    quote: 'I prefer ChronoVue because of how user-friendly it is. The visuals take away all the guesswork—we can see the status of the entire facility at a single glance instead of digging through dense data.',
    attribution: 'Nurse Manager',
    role: 'ChronoVue implementation — UI/UX and visual clarity feedback',
  },
  {
    quote: 'In the AMU, our nurses are always overworked, and a massive part of that is the constant, manual pen-and-paper logging. Moving away from paper registries lifts a huge administrative burden off the frontline.',
    attribution: 'Nurse Manager, Acute Medical Unit (AMU)',
    role: 'Workflow optimization — frontline burnout feedback',
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-white border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="From the Wards"
          title="Built around what nurses and CSCs actually said"
          sub="Every design decision in ChronoVue traces back to direct observation, empathy mapping, and prototype testing sessions with the people who will use it."
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
          sessions conducted during ChronoVue's validation phase in the AMU.
        </p>
      </div>
    </section>
  );
}
