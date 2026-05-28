import { SectionHeader } from './Features';

const testimonials = [
  {
    quote: '"Before Cekap, our bed manager was using a whiteboard and a spreadsheet. Now the whole hospital sees bed status in real time. We cut our average wait time from 4.5 hours to under 90 minutes. It\'s been transformational."',
    name: 'Dr. Rosmawati Kadir',
    role: 'Medical Director, Pantai Hospital Kuala Lumpur',
    initials: 'DR',
    color: 'bg-brand-blue',
    featured: true,
  },
  {
    quote: '"The discharge planner alone saved us hours every day. Nurses know exactly when to prepare a bed and housekeeping gets notified automatically. Zero phone tag."',
    name: 'Sister Lim Su Ying',
    role: 'Head of Nursing, KPJ Damansara',
    initials: 'SL',
    color: 'bg-brand-green',
  },
  {
    quote: '"The MOH reports that used to take two days to compile now take 10 minutes. Cekap has paid for itself many times over in staff hours alone."',
    name: 'Ahmad Hasyimi bin Nordin',
    role: 'COO, Sunway Medical Centre',
    initials: 'AH',
    color: 'bg-violet-600',
  },
  {
    quote: '"Implementation was smooth and the support team is fantastic. They speak our language — both English and Malay — and understand local hospital workflows."',
    name: 'Fauziah Mohd Razali',
    role: 'IT Manager, SJMC Subang Jaya',
    initials: 'FZ',
    color: 'bg-orange-600',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Testimonials"
          title="Loved by clinical staff and hospital management"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map(t => (
            <div key={t.name}
              className={`rounded-2xl border p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200
                ${t.featured
                  ? 'border-brand-blue/20 bg-gradient-to-br from-brand-blue-lt to-blue-50'
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
      </div>
    </section>
  );
}
