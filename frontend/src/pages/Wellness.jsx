export default function Wellness() {
  const EXPS = [["Mindfulness Sessions","Guided practices to slow down and reconnect."],["Creative Wellbeing","Art and music as tools for reflection and healing."],["Community Experiences","Shared moments of pause and presence."],["Workshops","Practical experiences to nurture your creative wellbeing."]];
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Holistic Wellness</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-6">A space to pause, reset, reconnect.</h1>
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {EXPS.map(([t, d]) => (
            <div key={t} className="border border-stone-800 p-10 hover:border-terracotta-500 transition-colors">
              <div className="font-display text-3xl text-cream-50 mb-3">{t}</div>
              <p className="text-stone-400 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <a href="/contact" data-testid="wellness-cta" className="mt-16 inline-block bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-8 py-4 text-xs uppercase tracking-[0.25em]">Enquire</a>
      </section>
    </>
  );
}
