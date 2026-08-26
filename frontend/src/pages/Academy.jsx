import { Link } from "react-router-dom";
import { INSTRUMENTS } from "@/data/worlds";

const GRADES = ["Debut","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"];
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

      <section className="py-24 border-y border-cream-200 bg-cream-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Certifications</div>
          <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-8 max-w-3xl">A passport journey — each grade a new stamp.</h2>
          <p className="text-ink-soft max-w-3xl text-lg leading-relaxed mb-12">
            We prepare students for international certifications and recognition through the world's leading exam boards: RSL (Rockschool), Trinity, and ABRSM.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[["Rockschool London","Contemporary repertoire (rock, pop, jazz, metal). Performance-focused exams (70% performance weight). UCAS points for UK universities (Grades 6-8). Globally recognized in 40+ countries."],
              ["Trinity College London","World-renowned examinations with a strong classical and contemporary reputation. Performance and diploma pathways."],
              ["ABRSM","The Associated Board of the Royal Schools of Music — the world's gold standard for classical certification."]].map(([t, d], idx) => { const boardAccents = ["#7c3aed","#0d9488","#c9a227"]; return (
              <div key={t} className="border border-silver-200 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `3px solid ${boardAccents[idx]}` }}>
                <div className="font-display text-2xl text-ink mb-4">{t}</div>
                <p className="text-ink-mute text-sm leading-relaxed">{d}</p>
              </div>
            );})}
          </div>
          <div className="overline mb-4">RSL Grade Ladder</div>
          <div className="flex flex-wrap gap-2 mb-12">
            {GRADES.map((g, i) => {
              const gradeColors = ["#ec4899","#7c3aed","#0d9488","#c9a227","#64748b","#ec4899","#7c3aed","#0d9488","#c9a227"];
              return <span key={g} data-testid={`grade-${i}`} className="px-4 py-2 text-sm font-semibold text-white shadow-sm" style={{ background: gradeColors[i] }}>{g}</span>;
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-silver-200 bg-white p-8" style={{ borderTop: "3px solid #0d9488" }}>
              <div className="font-display text-2xl text-ink mb-3">Grade Exam</div>
              <ul className="text-ink-mute text-sm space-y-2 list-disc pl-5">
                <li>3 Performance Pieces (two may be Free Choice)</li>
                <li>Technical Exercises (Sections A, B, C, D for Level 3)</li>
                <li>Recorded submission</li>
              </ul>
            </div>
            <div className="border border-silver-200 bg-white p-8" style={{ borderTop: "3px solid #0d9488" }}>
              <div className="font-display text-2xl text-ink mb-3">Performance Certificate</div>
              <ul className="text-ink-mute text-sm space-y-2 list-disc pl-5">
                <li>5 Performance Pieces (three may be Free Choice)</li>
                <li>No technical exercises</li>
                <li>Recorded submission</li>
              </ul>
            </div>
          </div>
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
