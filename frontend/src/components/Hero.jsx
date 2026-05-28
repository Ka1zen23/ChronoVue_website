import DashboardPreview from './DashboardPreview';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-lt via-white to-white -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,102,204,0.08),transparent)] -z-10" />

      <div className="max-w-6xl mx-auto px-6 text-center pt-14 pb-10">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 shadow-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-badge-pulse" />
          Now trusted by 40+ hospitals across Malaysia
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-brand-navy leading-[1.08] mb-6">
          Every Bed.{' '}
          <span className="hidden sm:inline"><br /></span>
          Every Patient.{' '}
          <br />
          <span className="gradient-text">Real-Time.</span>
        </h1>

        <p className="max-w-xl mx-auto text-lg text-gray-500 leading-relaxed mb-10">
          Cekap is the intelligent bed management system built for modern hospitals.
          Reduce patient wait times, prevent bottlenecks, and empower clinical staff
          with a live dashboard that never sleeps.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <a href="#contact" className="px-7 py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-base hover:bg-brand-blue-dk transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
            Get a Free Demo
          </a>
          <a href="#how-it-works" className="px-7 py-3.5 rounded-xl border-2 border-brand-blue text-brand-blue font-semibold text-base hover:bg-brand-blue-lt transition-all flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 6l5 3-5 3V6z" fill="currentColor"/>
            </svg>
            Watch 2-min Video
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400 mb-16">
          <span>Trusted by</span>
          {['Pantai Hospital', 'KPJ Damansara', 'SJMC', 'Gleneagles KL'].map(name => (
            <span key={name} className="px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-500">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pb-0">
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
        <DashboardPreview />
      </div>
    </section>
  );
}
