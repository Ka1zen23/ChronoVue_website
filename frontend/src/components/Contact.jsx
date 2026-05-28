import { useState } from 'react';
import { SectionHeader } from './Features';

const INTERESTS = [
  { value: 'ward-pilot',   label: 'Apply for a ward pilot deployment' },
  { value: 'ehr-partner',  label: 'EHR integration partnership' },
  { value: 'procurement',  label: 'Healthcare IT procurement mentorship' },
  { value: 'investor',     label: 'Investment or funding conversation' },
  { value: 'other',        label: 'Something else' },
];

const REASONS = [
  {
    title: 'Ward Pilot Applications',
    desc: 'Run FLOW in your ward as a paid pilot. Team Cekap deploys and supports end-to-end.',
  },
  {
    title: 'EHR Integration Partners',
    desc: 'Technical experience with hospital EHR systems in the Brunei and regional context.',
  },
  {
    title: 'Procurement Mentorship',
    desc: 'Help us navigate hospital IT procurement pathways from pilot to institutional contract.',
  },
];

export default function Contact() {
  const [form, setForm]     = useState({ firstName:'', lastName:'', email:'', organisation:'', role:'', interest:'', message:'' });
  const [status, setStatus] = useState('idle');

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const interestLabel = INTERESTS.find(i => i.value === form.interest)?.label ?? form.interest;
    const subject = encodeURIComponent(`FLOW Enquiry — ${form.firstName} ${form.lastName}`);
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
    window.open(`mailto:cekap.bn@gmail.com?subject=${subject}&body=${body}`);
    setStatus('success');
  }

  return (
    <section id="contact" className="py-28 bg-white border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* Left */}
        <div>
          <SectionHeader
            tag="Contact"
            title="Apply for a ward pilot, or start a conversation."
          />
          <p className="text-[15px] text-gray-500 leading-relaxed -mt-8 mb-10">
            Team Cekap is accepting applications for ward pilots and is actively seeking EHR
            integration partners and healthcare IT procurement mentors.
          </p>

          <div className="flex flex-col gap-6 mb-10">
            {REASONS.map(item => (
              <div key={item.title} className="flex gap-4">
                <div>
                  <div className="text-[14px] font-bold text-brand-navy mb-1">{item.title}</div>
                  <div className="text-[13px] text-gray-400 leading-snug">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-black/[0.06]">
            <div className="flex items-center gap-3 text-[14px] text-gray-500">
              <MailIcon />
              cekap.bn@gmail.com
            </div>
            <div className="flex items-center gap-3 text-[14px] text-gray-500">
              <PinIcon />
              Brunei Darussalam
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div data-reveal>
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center gap-5 py-16 px-8
              bg-gray-50 rounded-2xl border border-black/[0.07]">
              <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/20
                flex items-center justify-center">
                <svg className="w-7 h-7 text-brand-green" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-[20px] font-bold text-brand-navy tracking-tight">Email draft opened.</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed max-w-xs">
                Your email client should have opened with everything pre-filled. Just hit send.
                If it didn't open, email us directly at{' '}
                <a href="mailto:cekap.bn@gmail.com" className="text-brand-blue hover:underline">
                  cekap.bn@gmail.com
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" type="text"  placeholder="Ahmad"    value={form.firstName}    onChange={update('firstName')}    required />
                <Field label="Last Name"  type="text"  placeholder="Razali"   value={form.lastName}     onChange={update('lastName')}     required />
              </div>
              <Field label="Work Email"               type="email" placeholder="ahmad@hospital.gov.bn" value={form.email}         onChange={update('email')}        required />
              <Field label="Hospital / Organisation"  type="text"  placeholder="RIPAS Hospital"        value={form.organisation}  onChange={update('organisation')} required />
              <Field label="Your Role"                type="text"  placeholder="Nurse Manager, CSC, IT Manager…" value={form.role} onChange={update('role')} />

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-brand-navy">I am interested in…</label>
                <select
                  value={form.interest} onChange={update('interest')}
                  className="px-3.5 py-2.5 rounded-xl border border-black/[0.1]
                    focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none
                    text-[14px] text-gray-600 bg-white transition-all"
                >
                  <option value="">Select one</option>
                  {INTERESTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-brand-navy">Anything you'd like to tell us upfront?</label>
                <textarea
                  rows={3}
                  placeholder="Ward size, current systems, specific pain points, or just say hello…"
                  value={form.message} onChange={update('message')}
                  className="px-3.5 py-2.5 rounded-xl border border-black/[0.1]
                    focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none
                    text-[14px] text-gray-700 resize-none transition-all"
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

              <p className="text-[12px] text-gray-400 text-center">
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
      <label className="text-[13px] font-semibold text-brand-navy">{label}</label>
      <input
        {...props}
        className="px-3.5 py-2.5 rounded-xl border border-black/[0.1]
          focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none
          text-[14px] text-gray-700 transition-all placeholder:text-gray-300"
      />
    </div>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 text-brand-blue shrink-0" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5"/>
      <path d="M1.5 5.5l6.5 4 6.5-4"/>
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="w-4 h-4 text-brand-blue shrink-0" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5A4.5 4.5 0 008 1.5z"/>
      <circle cx="8" cy="6" r="1.5"/>
    </svg>
  );
}
