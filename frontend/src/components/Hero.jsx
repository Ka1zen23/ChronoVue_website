import DashboardPreview from './DashboardPreview';

const sources = [
  { icon: '📄', label: 'Paper census sheets', sub: 'Static. Outdated by the time you read them.' },
  { icon: '📊', label: 'Excel files',         sub: 'Manual entry. Version conflicts every shift.' },
  { icon: '🗒️', label: 'Whiteboards',         sub: 'Invisible to every ward except your own.' },
  { icon: '💬', label: 'WhatsApp',            sub: 'Informal. Untracked. No audit trail.' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-lt via-white to-white -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,102,204,0.07),transparent)] -z-10" />

      <div className="max-w-6xl mx-auto px-6 text-center pt-14 pb-10">

        <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 shadow-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-badge-pulse" />
          AMU pilot greenlit — championed by hospital CEO and Matron
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-display font-extrabold text-brand-navy leading-[1.08] mb-6">
          One live view of{' '}
          <br className="hidden sm:block" />
          your whole hospital.
          <br />
          <span className="gradient-text">No phone calls. No guesswork.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed mb-10">
          Nurse managers and CSCs currently piece together critical data from four separate sources every single shift.
          <strong className="text-brand-navy"> FLOW replaces all four</strong> with a single real-time dashboard — so you can act, not assemble.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <a href="#contact" className="px-7 py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-base hover:bg-brand-blue-dk transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
            Apply for the Pilot
          </a>
          <a href="#features" className="px-7 py-3.5 rounded-xl border-2 border-brand-blue text-brand-blue font-semibold text-base hover:bg-brand-blue-lt transition-all">
            See How It Works
          </a>
        </div>

        {/* The 4 sources → FLOW */}
        <div id="problem" className="max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">The four sources your team reconciles every shift</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {sources.map(s => (
              <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-left shadow-sm">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-xs font-semibold text-brand-navy mb-1">{s.label}</div>
                <div className="text-xs text-gray-400 leading-snug">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 justify-center text-sm text-gray-400">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <span className="font-semibold text-brand-navy bg-brand-blue-lt border border-brand-blue/20 px-4 py-1.5 rounded-full text-xs">
              FLOW replaces all four
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </div>
      </div>

      {/* Dashboard preview */}
      <div className="relative max-w-5xl mx-auto px-6 pb-0">
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
        <DashboardPreview />
      </div>
    </section>
  );
}
