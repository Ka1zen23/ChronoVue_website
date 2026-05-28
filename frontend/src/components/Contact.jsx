import { useState } from 'react';
import { SectionHeader } from './Features';

const interests = [
  { value: 'pilot',         label: 'Apply for a pilot deployment' },
  { value: 'ehr-partner',   label: 'EHR integration partnership' },
  { value: 'procurement',   label: 'Healthcare IT procurement advice' },
  { value: 'investor',      label: 'Investment / funding conversation' },
  { value: 'other',         label: 'Something else' },
];

export default function Contact() {
  const [form, setForm]   = useState({ firstName:'', lastName:'', email:'', organisation:'', role:'', interest:'', message:'' });
  const [status, setStatus] = useState('idle');

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/demo-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:  form.firstName,
          lastName:   form.lastName,
          email:      form.email,
          hospital:   form.organisation,
          bedsRange:  form.role,
          message:    `Interest: ${form.interest}\n\n${form.message}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div>
          <SectionHeader
            tag="Get In Touch"
            title="Apply for the pilot, or just start a conversation."
          />
          <p className="text-gray-500 leading-relaxed -mt-8 mb-10">
            Team Cekap is actively seeking pilot hospital sites, EHR integration partners, and healthcare IT procurement mentors. If any of those resonate, we want to talk.
          </p>

          <div className="flex flex-col gap-5 mb-10">
            {[
              { label: 'AMU Pilot Applications', desc: 'Run FLOW in your ward as a paid pilot. Team Cekap deploys and supports the whole way.' },
              { label: 'EHR Integration Partners', desc: 'Technical experience with hospital EHR systems in the regional healthcare context.' },
              { label: 'Procurement Mentorship',  desc: 'Help us navigate hospital IT procurement pathways from pilot to recurring contract.' },
            ].map(item => (
              <div key={item.label} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-green/15 border border-brand-green/30 flex items-center justify-center text-brand-green text-xs font-bold mt-0.5 shrink-0">✓</div>
                <div>
                  <div className="text-sm font-semibold text-brand-navy">{item.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5 leading-snug">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {[
              { icon: '✉️', text: 'hello@cekap.io' },
              { icon: '📍', text: 'Brunei Darussalam' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-gray-500">
                <span>{item.icon}</span>{item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div>
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center gap-4 py-16 px-8 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-brand-green/15 border-2 border-brand-green flex items-center justify-center text-2xl">✓</div>
              <h3 className="text-xl font-bold text-brand-navy">Message received.</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Team Cekap will get back to you within one business day. We appreciate every conversation — especially from people in the wards.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" type="text" placeholder="Ahmad"   value={form.firstName}    onChange={update('firstName')}    required />
                <Field label="Last Name"  type="text" placeholder="Razali"  value={form.lastName}     onChange={update('lastName')}     required />
              </div>
              <Field label="Email"                    type="email" placeholder="ahmad@hospital.gov.bn" value={form.email}        onChange={update('email')}        required />
              <Field label="Hospital / Organisation"  type="text"  placeholder="RIPAS Hospital"        value={form.organisation} onChange={update('organisation')} required />
              <Field label="Your Role"                type="text"  placeholder="e.g. Nurse Manager, IT Manager, CSC" value={form.role} onChange={update('role')} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-navy">I'm interested in…</label>
                <select value={form.interest} onChange={update('interest')}
                  className="px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/12 outline-none text-sm text-gray-600 bg-white transition-all">
                  <option value="">Select one</option>
                  {interests.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-navy">Anything you'd like to tell us upfront?</label>
                <textarea rows={3}
                  placeholder="Ward size, current systems, specific pain points, or just say hello…"
                  value={form.message} onChange={update('message')}
                  className="px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/12 outline-none text-sm text-gray-700 resize-none transition-all" />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                  Something went wrong. Please try again or email us directly at hello@cekap.io
                </p>
              )}
              <button type="submit" disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-base hover:bg-brand-blue-dk transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
              <p className="text-xs text-gray-400 text-center">No sales scripts. Just a real conversation with the team that built FLOW.</p>
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
      <label className="text-sm font-semibold text-brand-navy">{label}</label>
      <input {...props}
        className="px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/12 outline-none text-sm text-gray-700 transition-all" />
    </div>
  );
}
