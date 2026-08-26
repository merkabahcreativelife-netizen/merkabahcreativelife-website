import { FOUNDER_IMG } from "@/data/worlds";

const EXPERTISE = ["Audio Production","Sound Engineering","Music Programming","Music Composition","Music Arrangement","Jingle Production","Voice-over Production","Radio Production","Mixing & Mastering","Creative Content","Brand Storytelling","Creative Direction"];
const APPROACH = ["Adaptability","Creativity","Interdisciplinary Expertise","Innovation","Professionalism"];

export default function Founder() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-silver-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden border border-silver-200 bg-silver-100">
                <img src={FOUNDER_IMG} alt="Kingsley Victor — Founder & Creative Visionary" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-neutral-950 text-white px-7 py-5 shadow-xl">
                <div className="font-display text-xl leading-tight">Kingsley Victor</div>
                <div className="font-body text-[10px] tracking-[0.25em] uppercase text-violet-300 mt-1">Founder & Creative Visionary</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="overline mb-4">Meet Our Visionary Founder</div>
            <h1 className="font-display text-5xl lg:text-7xl text-ink font-light tracking-tighter leading-[0.95]">Kingsley Victor</h1>
            <p className="mt-4 text-violet-700 uppercase tracking-[0.2em] text-xs font-bold">Founder & Creative Visionary</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["BBA in Digital Marketing", "Diploma in Audio Engineering & Recording Arts"].map(q => (
                <span key={q} className="border border-silver-200 bg-white px-4 py-2 text-xs font-semibold text-ink-soft" style={{ borderLeft: "3px solid #7c3aed" }}>{q}</span>
              ))}
            </div>
            <p className="mt-8 font-display text-2xl lg:text-3xl text-ink italic font-light leading-snug">
              Where media craft, music production and brand strategy meet — one person, one standard.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-24 space-y-6 text-ink-soft text-lg leading-relaxed">
        <p>Kingsley Victor is the driving force behind Merkabah — a rare combination of on-air instinct, studio discipline and business acumen, shaped across more than a decade in India's radio and music industries.</p>
        <p>With over 12 years in radio, he has written, produced and directed audio content that reached millions — promos, shows, jingles and brand stories built to be remembered long after they air.</p>
        <p>His passion for music carried him from the presenter&rsquo;s desk into the control room: beginning as a keyboard programmer in recording studios, he grew through music programming, production, composition, orchestration and sound engineering — the full arc of a record, from first idea to final master.</p>
        <p>Along the way, his work has included collaborations with renowned musicians, including acclaimed percussionist <span className="text-ink font-semibold">Drums Sivamani</span>.</p>
        <p>Formally trained with a <span className="text-ink font-semibold">BBA in Digital Marketing</span> and a <span className="text-ink font-semibold">Diploma in Audio Engineering &amp; Recording Arts</span>, Kingsley founded Merkabah to unite these worlds — so that strategy, sound and story never have to be outsourced to strangers again.</p>
        <blockquote className="border-l-4 pl-6 my-12 font-display text-2xl italic text-ink" style={{ borderColor: "#7c3aed" }}>
          "Music is more than sound. It can become an expression that inspires, connects and leaves a lasting impact."
        </blockquote>
      </section>

      {/* EXPERTISE & APPROACH */}
      <section className="border-y border-silver-200 py-24 bg-cream-100/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Areas of Creative Expertise</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {EXPERTISE.map(e => <span key={e} className="border border-silver-200 bg-white px-4 py-2 text-sm text-ink-soft hover:border-terracotta-500 hover:text-terracotta-600 transition-colors">{e}</span>)}
          </div>
          <div className="overline mt-16 mb-4">His Approach</div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-display text-2xl text-ink">
            {APPROACH.map((a, i) => <span key={a}>{a}{i < APPROACH.length - 1 && <span className="text-terracotta-500 ml-8">·</span>}</span>)}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">The Journey</div>
        <h2 className="font-display text-4xl lg:text-5xl text-ink font-light tracking-tight mb-12">Three paths. One destination.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Music", ["Keyboard Programmer", "Recording Studios", "Sound Engineering", "Music Production"], "#7c3aed"],
            ["Media", ["Radio Production", "Promo & Content Production", "Creative Direction", "Brand Storytelling"], "#0d9488"],
            ["Merkabah", ["Music + Media + Creativity", "Learning + Experiences", "Merkabah Creative Life"], "#c9a227"],
          ].map(([title, steps, c]) => (
            <div key={title} className="border border-silver-200 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `4px solid ${c}` }}>
              <div className="font-display text-3xl text-ink mb-6">{title}</div>
              <ul className="space-y-3">
                {steps.map(s => <li key={s} className="text-ink-mute text-sm flex items-start gap-3"><span style={{ color: c }}>→</span>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
