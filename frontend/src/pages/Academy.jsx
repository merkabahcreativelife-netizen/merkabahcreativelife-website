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
        <img src={INSTRUMENTS.piano.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Academy of Music</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-6 max-w-4xl">
            Learn music. Play with confidence.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-stone-300 leading-relaxed">
            Expert-led training in Piano, Guitar, Violin, Drums, and Vocals for all ages and skill levels. Your musical journey starts here in Electronic City.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Find Your Perfect Music Class</div>
        <h2 className="font-display text-4xl lg:text-6xl text-cream-50 font-light tracking-tight leading-[1.05] mb-14 max-w-3xl">Our music programs.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(INSTRUMENTS).map(([slug, ins]) => (
            <Link key={slug} to={`/academy/${slug}`} data-testid={`instrument-${slug}`} className="group relative overflow-hidden bg-stone-900 border border-stone-800 aspect-[3/4]">
              <img src={ins.img} alt={ins.name} loading="lazy" className="card-media absolute inset-0 w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="overline mb-1">{ins.tagline}</div>
                <div className="font-display text-3xl text-cream-50 group-hover:text-terracotta-400 transition-colors">{ins.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 border-y border-stone-900 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Certifications</div>
          <h2 className="font-display text-4xl lg:text-6xl text-cream-50 font-light tracking-tight leading-[1.05] mb-8 max-w-3xl">A passport journey — each grade a new stamp.</h2>
          <p className="text-stone-300 max-w-3xl text-lg leading-relaxed mb-12">
            We prepare students for international certifications and recognition through the world's leading exam boards: RSL (Rockschool), Trinity, and ABRSM.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[["Rockschool London","Contemporary repertoire (rock, pop, jazz, metal). Performance-focused exams (70% performance weight). UCAS points for UK universities (Grades 6-8). Globally recognized in 40+ countries."],
              ["Trinity College London","World-renowned examinations with a strong classical and contemporary reputation. Performance and diploma pathways."],
              ["ABRSM","The Associated Board of the Royal Schools of Music — the world's gold standard for classical certification."]].map(([t, d]) => (
              <div key={t} className="border border-stone-800 p-8 hover:border-terracotta-500 transition-colors">
                <div className="font-display text-2xl text-cream-50 mb-4">{t}</div>
                <p className="text-stone-400 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="overline mb-4">RSL Grade Ladder</div>
          <div className="flex flex-wrap gap-2 mb-12">
            {GRADES.map((g, i) => (
              <span key={g} className={`px-4 py-2 text-sm border ${i === 0 || i === GRADES.length - 1 ? "bg-terracotta-500 border-terracotta-500 text-cream-50" : "border-stone-700 text-stone-300"}`}>{g}</span>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-stone-800 p-8">
              <div className="font-display text-2xl text-cream-50 mb-3">Grade Exam</div>
              <ul className="text-stone-400 text-sm space-y-2 list-disc pl-5">
                <li>3 Performance Pieces (two may be Free Choice)</li>
                <li>Technical Exercises (Sections A, B, C, D for Level 3)</li>
                <li>Recorded submission</li>
              </ul>
            </div>
            <div className="border border-stone-800 p-8">
              <div className="font-display text-2xl text-cream-50 mb-3">Performance Certificate</div>
              <ul className="text-stone-400 text-sm space-y-2 list-disc pl-5">
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
        <h2 className="font-display text-4xl lg:text-5xl text-cream-50 font-light tracking-tight mb-12">Questions parents ask us.</h2>
        <div className="divide-y divide-stone-800">
          {FAQS.map(([q, a], i) => (
            <details key={i} className="group py-6" data-testid={`academy-faq-${i}`}>
              <summary className="cursor-pointer flex items-center justify-between font-display text-xl text-cream-50 group-open:text-terracotta-400 transition-colors list-none">
                <span>{q}</span>
                <span className="text-terracotta-500 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-stone-400 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
