import { useState } from 'react';

const INTERESTS = [
  { value: 'pilot',        label: 'Apply for an operational pilot' },
  { value: 'partner',      label: 'System integration or data partnership' },
  { value: 'procurement',  label: 'Enterprise procurement or implementation' },
  { value: 'investor',     label: 'Investment or funding conversation' },
  { value: 'other',        label: 'Something else' },
];

const REASONS = [
  {
    title: 'Pilot Deployments',
    desc: 'Run ChronoVue in your operation as a paid pilot. We deploy and support end-to-end.',
  },
  {
    title: 'Integration Partners',
    desc: 'Technical experience connecting ChronoVue to existing operational systems — EHR, ERP, or custom data sources.',
  },
  {
    title: 'Procurement & Implementation',
    desc: 'Help us navigate enterprise procurement pathways from pilot to institutional contract.',
  },
];

export default function Contact() {
  const [form, setForm]     = useState({ firstName:'', lastName:'', email:'', organisation:'', role:'', interest:'', message:'' });
  const [status, setStatus] = useState('idle');

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const interestLabel = INTERESTS.find(i => i.value === form.interest)?.label ?? form.interest;
    const subject = encodeURIComponent(`ChronoVue Enquiry: ${form.firstName} ${form.lastName}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.firstName} ${form.lastName}`,
        `Work email: ${form.email}`,
        `Organisation: ${form.organisation}`,
        form.role        ? `Role: ${form.role}` : null,
        form.interest    ? `Interest: ${interestLabel}` : null,
        form.message     ? `\nMessage:\n${form.message}` : null,
      ]
        .filter(Boolean)
        .join('\n')
    );
    window.location.href = `mailto:support@chronovue.co?subject=${subject}&body=${body}`;
    setStatus('success');
  }

  return (
    <section id="contact" className="py-28 bg-white dark:bg-brand-navy border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* Left */}
        <div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1
            rounded-full mb-5 bg-brand-teal/10 text-brand-teal border border-brand-teal/15">
            Contact
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.6rem)] font-display font-extrabold
            tracking-tight mb-4 leading-tight text-brand-navy dark:text-white">
            Apply for a pilot, or start a conversation.
          </h2>
          <p className="text-[15px] text-gray-500 dark:text-white/55 leading-relaxed mb-10">
            ChronoVue is accepting applications for operational pilots and is actively seeking
            integration partners and procurement advisors.
          </p>

          <div className="flex flex-col gap-6 mb-10">
            {REASONS.map(item => (
              <div key={item.title} className="flex gap-4">
                <div>
                  <div className="text-[14px] font-bold text-brand-navy dark:text-white mb-1">{item.title}</div>
                  <div className="text-[13px] text-gray-400 dark:text-white/45 leading-snug">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3 text-[14px] text-gray-500 dark:text-white/55">
              <MailIcon />
              support@chronovue.co
            </div>
            <div className="flex items-center gap-3 text-[14px] text-gray-500 dark:text-white/55">
              <PinIcon />
              Brunei Darussalam
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div data-reveal>
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center gap-5 py-16 px-8
              bg-gray-50 dark:bg-brand-navy-mid rounded-2xl border border-black/[0.07] dark:border-white/[0.09]">
              <div className="w-14 h-14 rounded-2xl bg-brand-sage/10 border border-brand-sage/20
                flex items-center justify-center">
                <svg className="w-7 h-7 text-brand-sage" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-[20px] font-bold text-brand-navy dark:text-white tracking-tight">Email draft opened.</h3>
              <p className="text-gray-500 dark:text-white/55 text-[14px] leading-relaxed max-w-xs">
                Your email client should have opened with everything pre-filled. Just hit send.
                If it didn't open, email us directly at{' '}
                <a href="mailto:support@chronovue.co" className="text-brand-teal hover:underline">
                  support@chronovue.co
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" type="text"  placeholder="Ahmad"    value={form.firstName}    onChange={update('firstName')}    required />
                <Field label="Last Name"  type="text"  placeholder="Razali"   value={form.lastName}     onChange={update('lastName')}     required />
              </div>
              <Field label="Work Email"      type="email" placeholder="ahmad@organisation.com"              value={form.email}         onChange={update('email')}        required />
              <Field label="Organisation"    type="text"  placeholder="Your organisation"                  value={form.organisation}  onChange={update('organisation')} required />
              <Field label="Your Role"       type="text"  placeholder="Operations Director, IT Manager…"   value={form.role}          onChange={update('role')} />

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-brand-navy dark:text-white/80">I am interested in…</label>
                <select
                  value={form.interest} onChange={update('interest')}
                  className="px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.12]
                    focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none
                    text-[14px] text-gray-600 dark:text-white/70
                    bg-white dark:bg-brand-navy-mid transition-all"
                >
                  <option value="">Select one</option>
                  {INTERESTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-brand-navy dark:text-white/80">Anything you'd like to tell us upfront?</label>
                <textarea
                  rows={3}
                  placeholder="Operation size, current systems, specific challenges, or just say hello…"
                  value={form.message} onChange={update('message')}
                  className="px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.12]
                    focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none
                    text-[14px] text-gray-700 dark:text-white/70
                    bg-white dark:bg-brand-navy-mid resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                data-magnetic="0.15"
                className="btn-shimmer w-full py-3.5 rounded-xl bg-brand-navy text-white
                  font-semibold text-[15px] hover:bg-brand-navy-mid transition-colors shadow-sm"
              >
                Send Message
              </button>

              <p className="text-[12px] text-gray-400 dark:text-white/35 text-center">
                No sales scripts. A real conversation with the team that built FLOW.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

function Field({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-brand-navy dark:text-white/80">{label}</label>
      <input
        {...props}
        className="px-3.5 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/[0.12]
          focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none
          text-[14px] text-gray-700 dark:text-white/80
          bg-white dark:bg-brand-navy-mid
          transition-all placeholder:text-gray-300 dark:placeholder:text-white/25"
      />
    </div>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 text-brand-teal shrink-0" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5"/>
      <path d="M1.5 5.5l6.5 4 6.5-4"/>
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="w-4 h-4 text-brand-teal shrink-0" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5A4.5 4.5 0 008 1.5z"/>
      <circle cx="8" cy="6" r="1.5"/>
    </svg>
  );
}
