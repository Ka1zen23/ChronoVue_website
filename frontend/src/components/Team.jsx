import { useState } from 'react';

const TEAM = [
  {
    name: 'Amir',
    role: 'Founder · Lead Data Analyst · Software Development',
    education: [
      'BSc (Hons) in Computing',
      'Major in Data Analytics',
    ],
    image: '/team/amir.jpg',
  },
  {
    name: 'Ezzah',
    role: 'Co-Founder · Clinical Advisor · Researcher · Public Health Specialist · Data Analyst',
    education: [
      'BHSc (Hons) in Nursing and Midwifery',
      'Master of Digital Public Health',
    ],
    image: '/team/ezzah.jpg',
  },
  {
    name: 'Wazien',
    role: 'Co-Founder & CTO · Lead Software Developer',
    education: [
      'BSc (Hons) in Computing',
      'Major in Software Development',
    ],
    image: '/team/wazien.jpg',
  },
  {
    name: 'Syafiqah',
    role: 'Co-Founder · Clinical Advisor · Researcher · Public Health Specialist',
    education: [
      'BHSc (Hons) in Nursing and Midwifery',
      'Master of Public Health',
    ],
    image: '/team/syafiqah.jpg',
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden section-light py-28"
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(83,140,151,0.10),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(122,150,128,0.08),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#538c97]/15 bg-[#538c97]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#538c97]">
            Meet The Team
          </span>

          <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tight text-[#243046]">
            Domain expertise meets technical execution
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-[#243046]/60">
            ChronoVue is built by a multidisciplinary team combining
            operational domain expertise, public health research, data analytics, and software
            engineering — a rare combination in operational intelligence.
          </p>
        </div>

        {/* Hero Team Photo */}
        <div
          className="
            mb-16 overflow-hidden rounded-[36px]
            border border-black/[0.05]
            bg-white
            shadow-[0_20px_70px_rgba(0,0,0,0.07)]
          "
        >
          <div className="relative h-[460px] md:h-[620px] overflow-hidden">
            
            <img
              src="assets/team-photo.jpeg"
              alt="The ChronoVue team"
              className="h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#243046]/75 via-[#243046]/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 backdrop-blur-md">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  ChronoVue
                </span>
              </div>

              <h3 className="mt-5 max-w-3xl text-2xl font-black tracking-tight text-white md:text-5xl">
                Built by people who understand
                the problem
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-[15px]">
                A product studio where developers work alongside domain specialists and researchers,
                so what we build is grounded in how complex operations actually work.
              </p>
            </div>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TEAM.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="
        group overflow-hidden rounded-[30px]
        border border-black/[0.05]
        bg-white
        shadow-[0_10px_35px_rgba(0,0,0,0.05)]
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-[0_20px_50px_rgba(36,48,70,0.10)]
      "
    >
      {/* Profile Image */}
      <div className="relative px-6 pt-6">
        <div className="relative mx-auto aspect-square w-[165px] overflow-hidden rounded-3xl bg-[#e6e5df]">
          {imgError ? (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-5xl font-black text-[#538c97]/40">{member.name[0]}</span>
            </div>
          ) : (
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Floating Tag */}
        <div className="absolute left-1/2 top-4 -translate-x-1/2">
          <div className="rounded-full border border-white/40 bg-white/80 px-3 py-1 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#538c97]">
              ChronoVue Team
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-7 pt-5 text-center">
        <h3 className="text-[1.2rem] font-black tracking-tight text-[#243046]">{member.name}</h3>
        <div className="mt-2 text-[12.5px] font-semibold leading-relaxed text-[#538c97]">{member.role}</div>
        <div className="mx-auto mt-5 h-px w-14 bg-[#538c97]/15" />
        <div className="mt-5 space-y-2.5">
          {member.education.map((item, idx) => (
            <div key={idx} className="flex items-start justify-center gap-2 text-[12.5px] leading-relaxed text-[#243046]/65">
              <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7a9680]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}