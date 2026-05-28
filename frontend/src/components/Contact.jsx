import { useState } from 'react';
import { SectionHeader } from './Features';

export default function Contact() {
  const [form, setForm]       = useState({ firstName:'', lastName:'', email:'', hospital:'', bedsRange:'', message:'' });
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/demo-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
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
            title="Ready to transform how your hospital manages beds?"
          />
          <p className="text-gray-500 leading-relaxed -mt-8 mb-10">
            Book a personalised 30-minute demo with our team. We'll show you how Cekap works with your exact ward configuration — no generic slides, just your hospital.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { icon: '📞', text: '+60 3-2020 1234' },
              { icon: '✉️', text: 'hello@cekap.io' },
              { icon: '📍', text: 'Menara KEN, Jalan Sultan Ismail, KL' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-gray-500">
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center gap-4 py-16 px-8 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-brand-green/15 border-2 border-brand-green flex items-center justify-center text-2xl">✓</div>
              <h3 className="text-xl font-bold text-brand-navy">You're booked!</h3>
              <p className="text-gray-500 text-sm">Our team will reach out within one business day to confirm your demo slot. Talk soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" type="text" placeholder="Ahmad"   value={form.firstName} onChange={update('firstName')} required />
                <Field label="Last Name"  type="text" placeholder="Razali"  value={form.lastName}  onChange={update('lastName')}  required />
              </div>
              <Field label="Work Email"              type="email"  placeholder="ahmad@hospital.com"  value={form.email}    onChange={update('email')}    required />
              <Field label="Hospital / Organisation" type="text"  placeholder="Pantai Hospital KL"   value={form.hospital} onChange={update('hospital')} required />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-navy">Approximate Number of Beds</label>
                <select value={form.bedsRange} onChange={update('bedsRange')}
                  className="px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/12 outline-none text-sm text-gray-600 bg-white transition-all">
                  <option value="">Select range</option>
                  <option value="<100">Under 100</option>
                  <option value="100-300">100 – 300</option>
                  <option value="300-600">300 – 600</option>
                  <option value="600+">600+</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-navy">Anything specific you'd like to see?</label>
                <textarea rows={3} placeholder="E.g. integration with our current HIS, multi-facility view…"
                  value={form.message} onChange={update('message')}
                  className="px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/12 outline-none text-sm text-gray-700 resize-none transition-all" />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
              <button type="submit" disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-base hover:bg-brand-blue-dk transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'loading' ? 'Sending…' : 'Book My Free Demo'}
              </button>
              <p className="text-xs text-gray-400 text-center">No spam. No pressure. Just a genuine conversation about your hospital's needs.</p>
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
      <input
        {...props}
        className="px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/12 outline-none text-sm text-gray-700 transition-all" />
    </div>
  );
}
