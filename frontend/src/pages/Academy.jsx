import { Link } from "react-router-dom";
import { INSTRUMENTS } from "@/data/worlds";

const GRADES = ["Debut","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"];
const BOARDS = [
  {
    name: "Rockschool London (RSL)", shortName: "Rockschool", accent: "#7c3aed",
    intro: "The world's leading assessment board for contemporary music, offering graded syllabi across modern instruments and vocals.",
    subjects: ["Acoustic Guitar","Electric Guitar","Western Vocals","Ukulele","Piano","Keyboard","Violin"],
    ladderLabel: "The Rockschool syllabus — 9 levels",
    grades: GRADES,
    ladderNotes: ["Debut Grade — perfect for absolute beginners", "Grade 8 — equivalent to advanced diploma level"],
    why: ["Contemporary repertoire (rock, pop, jazz, metal)","Performance-focused exams (70% performance weight)","UCAS points for UK universities (Grades 6–8)","Globally recognized in 40+ countries"],
    support: ["Free assessment to determine the right starting grade","Complete syllabus coverage (pieces, scales, sight-reading)","Mock exams to build confidence","Exam registration support"],
  },
  {
    name: "Trinity College London", shortName: "Trinity", accent: "#0d9488",
    intro: "One of the oldest and most highly reputed international exam boards — a balanced path across classical and contemporary music.",
    subjects: ["Acoustic Guitar","Electric Guitar","Western Vocals","Ukulele","Piano","Violin","Keyboard","Electronic Keyboard"],
    ladderLabel: "The Trinity syllabus — 9 levels",
    grades: ["Initial","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"],
    ladderNotes: [],
    why: ["One of the oldest & most respected exam boards (est. 1872)","Balanced syllabus — classical & contemporary","Flexible exam options — own-choice pieces allowed","UCAS points for UK universities (Grades 6–8)","Globally recognized in 60+ countries","Performance-focused with technique integration"],
    support: ["Free assessment","Complete syllabus coverage (pieces, scales, sight-reading)","Mock exams to build confidence","Exam registration support","Performance practice & aural training","Trinity exam centre guidance"],
  },
  {
    name: "ABRSM London", shortName: "ABRSM", accent: "#c9a227",
    intro: "The world's most established and widely recognized exam board — the gold standard for classical music certification.",
    subjects: ["Piano","Music Theory"],
    ladderLabel: "The ABRSM syllabus — 8 levels",
    grades: ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"],
    ladderNotes: ["Grades 1–3 — Foundation Level","Grades 4–5 — Intermediate Level","Grades 6–8 — Advanced Level","Important: Grade 5 Music Theory is mandatory for Grade 6, 7 and 8 Practical exams"],
    why: ["The world's most established exam board (founded 1889)","Gold standard for classical music certification","Internationally recognized in 90+ countries","UCAS points for UK universities (Grades 6–8)","Rigorous syllabus builds complete musicianship","Theory exams strengthen overall musical understanding","Highly respected by schools and colleges worldwide"],
    support: ["Free assessment to determine the right starting grade","Complete syllabus coverage (pieces, scales, sight-reading)","Mock exams to build confidence","Exam registration support"],
  },
];
const FAQS = [
  ["Which exam board should my child choose?", "We help you decide between RSL (Rockschool), Trinity, and ABRSM based on your child's musical interest, age, and long-term goals. Contemporary music leans toward RSL; classical leans toward Trinity/ABRSM."],
  ["Are there age restrictions for exams?", "No. There are no age restrictions and no requirement to move sequentially — your child can appear for any grade based on their skillset."],
  ["What is the difference between a Grade Exam and a Performance Certificate?", "A Grade Exam includes 3 performance pieces plus technical exercises. A Performance Certificate involves 5 performance pieces only (with three optional Free Choice Pieces)."],
  ["Do you offer free trial classes?", "Yes — every program offers a free trial class so you can experience our teaching before enrolling."],
  ["Where are you located?", "Our physical academy is based in Electronic City, Bengaluru. We also offer online classes for students across India and abroad."],
];

export default function Academy() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1692592313062-4015cd36c04b?crop=entropy&cs=srgb&fm=jpg&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/30 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Academy of Music</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-6 max-w-4xl">
            Learn music. Play with confidence.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
            Expert-led training in Piano, Guitar, Violin, Drums, and Vocals for all ages and skill levels. Your musical journey starts here in Electronic City.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Find Your Perfect Music Class</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-14 max-w-3xl">Our music programs.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(INSTRUMENTS).map(([slug, ins], idx) => {
            const accents = ["#7c3aed","#0d9488","#c9a227","#ec4899","#64748b"];
            const c = accents[idx % 5];
            return (
              <div key={slug} data-testid={`instrument-${slug}`} className="group border border-silver-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `4px solid ${c}` }}>
                <Link to={`/academy/${slug}`} className="block overflow-hidden aspect-[16/10]">
                  <img src={ins.img} alt={ins.name} loading="lazy" className="card-media w-full h-full object-cover" />
                </Link>
                <div className="p-7">
                  <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: c }}>{ins.tagline}</div>
                  <Link to={`/academy/${slug}`} className="font-display text-3xl text-ink mt-2 block group-hover:text-terracotta-600 transition-colors">{ins.name}</Link>
                  <p className="mt-3 text-sm text-ink-mute line-clamp-2">{ins.intro}</p>
                  <div className="mt-6 flex items-center gap-5">
                    <Link to={`/academy/${slug}`} className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: c }}>Explore Program →</Link>
                    <Link to={`/academy/${slug}#trial`} className="text-xs uppercase tracking-[0.2em] text-ink-mute hover:text-ink transition-colors">Free Trial</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 border-y border-silver-200 bg-cream-100/30" id="certifications">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Certifications</div>
          <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-8 max-w-3xl">A passport journey — each grade is a new stamp.</h2>
          <p className="text-ink-soft max-w-3xl text-lg leading-relaxed mb-4">
            Want your child to earn international certifications and recognition for their musical talent? Merkabah Academy of Music is the right place.
          </p>
          <p className="text-ink-mute max-w-3xl leading-relaxed mb-12">
            Certified by the world's leading exam boards — <span className="text-ink font-semibold">RSL (Rockschool)</span>, <span className="text-ink font-semibold">Trinity College London</span> and <span className="text-ink font-semibold">ABRSM</span>. Not sure which grade or board is right for your child? We guide you every step of the way.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mb-20">
            {[["Your child will love performing", "#7c3aed"],["Your child will learn responsibility", "#0d9488"],["Your child's future starts here", "#c9a227"]].map(([t, c]) => (
              <div key={t} className="border border-silver-200 bg-white p-7 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `3px solid ${c}` }}>
                <div className="font-display text-xl text-ink leading-snug">{t}</div>
              </div>
            ))}
          </div>

          {BOARDS.map((b, bi) => (
            <div key={b.name} data-testid={`board-${b.name.split(" ")[0].toLowerCase()}`} className="border border-silver-200 bg-white mb-10 overflow-hidden" style={{ borderTop: `4px solid ${b.accent}` }}>
              <div className="p-8 lg:p-12 border-b border-silver-200" style={{ background: `${b.accent}0d` }}>
                <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold mb-3" style={{ color: b.accent }}>Exam Board {String(bi + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-3xl lg:text-5xl text-ink font-light tracking-tight">{b.name}</h3>
                <p className="mt-4 text-ink-soft text-lg leading-relaxed max-w-3xl">{b.intro}</p>
              </div>
              <div className="p-8 lg:p-12 grid lg:grid-cols-2 gap-10">
                <div>
                  <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: b.accent }}>Subjects Offered</div>
                  <div className="flex flex-wrap gap-2">
                    {b.subjects.map(s => <span key={s} className="border border-silver-200 px-4 py-2 text-sm text-ink-soft bg-white">{s}</span>)}
                  </div>
                  <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold mt-10 mb-4" style={{ color: b.accent }}>{b.ladderLabel}</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {b.grades.map((g, i) => (
                      <span key={g} className="flex items-center gap-2">
                        <span className="px-3 py-1.5 text-xs font-semibold text-white" style={{ background: b.accent }}>{g}</span>
                        {i < b.grades.length - 1 && <span className="text-ink-mute">→</span>}
                      </span>
                    ))}
                  </div>
                  {b.ladderNotes && (
                    <ul className="mt-6 space-y-2">
                      {b.ladderNotes.map(n => <li key={n} className="text-sm text-ink-soft flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: b.accent }} />{n}</li>)}
                    </ul>
                  )}
                </div>
                <div>
                  <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: b.accent }}>Why Choose {b.shortName}?</div>
                  <ul className="space-y-2.5">
                    {b.why.map(w => <li key={w} className="text-sm text-ink-soft flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 shrink-0" style={{ background: b.accent }} />{w}</li>)}
                  </ul>
                  <div className="mt-10 border border-silver-200 bg-cream-50 p-6">
                    <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold mb-3" style={{ color: b.accent }}>{b.shortName} at Merkabah</div>
                    <p className="text-sm text-ink-soft leading-relaxed">We prepare you and your child for ALL grades, guiding you in choosing the right grade and exam type:</p>
                    <ul className="mt-3 space-y-1.5">
                      {b.support.map(s => <li key={s} className="text-sm text-ink-mute flex items-start gap-2"><span style={{ color: b.accent }}>✓</span>{s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-8 lg:px-12 pb-8 lg:pb-12 grid md:grid-cols-3 gap-5">
                <div className="border border-silver-200 p-6">
                  <div className="font-display text-lg text-ink mb-3">Eligibility</div>
                  <ul className="text-sm text-ink-mute space-y-1.5">
                    <li>No age restrictions</li>
                    <li>No requirement to move grade-by-grade</li>
                    <li>Any grade, based on your child's skillset</li>
                  </ul>
                </div>
                <div className="border border-silver-200 p-6" style={{ borderTop: `3px solid ${b.accent}` }}>
                  <div className="font-display text-lg text-ink mb-3">Grade Exam <span className="text-xs text-ink-mute font-body">(Recorded)</span></div>
                  <ul className="text-sm text-ink-mute space-y-1.5">
                    <li>3 Performance Pieces (two may be Free Choice)</li>
                    <li>Technical Exercises (Sections A–D for Level 3)</li>
                    <li>Syllabus varies by grade</li>
                  </ul>
                </div>
                <div className="border border-silver-200 p-6" style={{ borderTop: `3px solid ${b.accent}` }}>
                  <div className="font-display text-lg text-ink mb-3">Performance Certificate <span className="text-xs text-ink-mute font-body">(Recorded)</span></div>
                  <ul className="text-sm text-ink-mute space-y-1.5">
                    <li>5 Performance Pieces only</li>
                    <li>Three may be Free Choice Pieces</li>
                    <li>Syllabus varies by grade</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Frequently Asked</div>
        <h2 className="font-display text-4xl lg:text-5xl text-ink font-light tracking-tight mb-12">Questions parents ask us.</h2>
        <div className="space-y-4">
          {FAQS.map(([q, a], i) => (
            <details key={i} className="group border border-silver-200 bg-white p-6 hover:shadow-md transition-shadow" data-testid={`academy-faq-${i}`}>
              <summary className="cursor-pointer flex items-center justify-between font-display text-xl text-ink group-open:text-terracotta-400 transition-colors list-none">
                <span>{q}</span>
                <span className="text-terracotta-500 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-ink-mute leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
