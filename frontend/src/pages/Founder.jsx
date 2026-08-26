const EXPERTISE = ["Audio Production","Sound Engineering","Music Programming","Music Composition","Music Arrangement","Jingle Production","Voice-over Production","Radio Production","Mixing & Mastering","Creative Content","Brand Storytelling","Creative Direction"];
const APPROACH = ["Adaptability","Creativity","Interdisciplinary Expertise","Innovation","Professionalism"];

export default function Founder() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="relative border border-cream-200 bg-cream-100/50 p-12 lg:p-16">
              <div className="font-display text-8xl text-terracotta-500 leading-none">&ldquo;</div>
              <p className="font-display text-2xl lg:text-3xl italic font-light text-ink leading-snug mt-2">Every brand has a sound. Every story has a stage. Merkabah is where they meet.</p>
              <div className="overline mt-8">Kingsley Victor · Founder & Creative Visionary</div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="overline mb-4">Meet Our Visionary Founder</div>
            <h1 className="font-display text-5xl lg:text-7xl text-ink font-light tracking-tighter leading-[0.95]">Kingsley Victor</h1>
            <p className="mt-4 text-terracotta-400 uppercase tracking-[0.2em] text-xs">Founder & Creative Visionary</p>
            <p className="mt-8 font-display text-2xl lg:text-3xl text-ink italic font-light leading-snug">
              A unique fusion of media, music, sound engineering and creative expression.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-24 space-y-6 text-ink-soft text-lg leading-relaxed">
        <p>Kingsley Victor, the driving force behind Merkabah, embodies a unique fusion of talents that harmoniously blend media, music and creative technology.</p>
        <p>With more than 12 years of experience in the radio industry, Kingsley has developed extensive experience creating captivating and inspiring audio content across India's radio landscape.</p>
        <p>His passion for music led him into sound engineering and music production. Starting as a keyboard programmer in recording studios, his journey developed through music programming, production, composition, orchestration and sound engineering.</p>
        <p>His creative journey has included collaborations with renowned musicians, including acclaimed percussionist <span className="text-ink">Drums Sivamani</span>.</p>
        <blockquote className="border-l-2 border-terracotta-500 pl-6 my-12 font-display text-2xl italic text-ink">
          "Music is more than sound. It can become an expression that inspires, connects and leaves a lasting impact."
        </blockquote>
      </section>

      <section className="border-y border-cream-200 py-24 bg-cream-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Areas of Creative Expertise</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {EXPERTISE.map(e => <span key={e} className="border border-cream-200 px-4 py-2 text-sm text-ink-soft hover:border-terracotta-500 hover:text-terracotta-400 transition-colors">{e}</span>)}
          </div>
          <div className="overline mt-16 mb-4">His Approach</div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-display text-2xl text-ink">
            {APPROACH.map((a, i) => <span key={a}>{a}{i < APPROACH.length - 1 && <span className="text-terracotta-500 ml-8">·</span>}</span>)}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-8">The Journey</div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Music", ["Keyboard Programmer", "Recording Studios", "Sound Engineering", "Music Production"]],
            ["Media", ["Radio Production", "Promo & Content Production", "Creative Direction", "Brand Storytelling"]],
            ["Merkabah", ["Music + Media + Creativity", "Learning + Experiences", "Merkabah Creative Life"]],
          ].map(([title, steps]) => (
            <div key={title} className="border border-cream-200 p-8">
              <div className="font-display text-3xl text-ink mb-6">{title}</div>
              <ul className="space-y-3">
                {steps.map(s => <li key={s} className="text-ink-mute text-sm before:content-['→'] before:text-terracotta-500 before:mr-3">{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
