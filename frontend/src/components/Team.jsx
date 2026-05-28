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

export default function MeetTheTeam() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#f7f8f7] py-28"
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(83,140,151,0.10),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(122,150,128,0.08),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#538c97]/15 bg-[#538c97]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#538c97]">
            Meet The Team
          </span>

          <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] font-black tracking-tight text-[#243046]">
            Built by healthcare and technology specialists
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-[#243046]/60">
            FLOW brings together expertise in software engineering,
            healthcare operations, public health, and clinical workflow
            coordination to modernise hospital command centre visibility.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="
                group overflow-hidden rounded-[30px]
                border border-black/[0.05]
                bg-white
                shadow-[0_12px_40px_rgba(0,0,0,0.05)]
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-[0_20px_60px_rgba(36,48,70,0.12)]
              "
            >
              
              {/* Image */}
              <div className="relative aspect-[4/4.6] overflow-hidden bg-[#e6e5df]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />

                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Floating tag */}
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 backdrop-blur-md">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    FLOW Team
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                
                <h3 className="text-[1.25rem] font-black tracking-tight text-[#243046]">
                  {member.name}
                </h3>

                <div className="mt-2 text-[13px] font-semibold leading-relaxed text-[#538c97]">
                  {member.role}
                </div>

                <div className="mt-5 space-y-2">
                  {member.education.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-[13px] text-[#243046]/65"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7a9680]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}