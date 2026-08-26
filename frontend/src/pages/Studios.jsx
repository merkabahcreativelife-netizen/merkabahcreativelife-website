const SERVICES = ["Audio Production","Radio & Promo Production","Voice Over","Music Production","Podcast Production","Video Production","Creative Content","Brand Campaigns","Music Composition","Music Arrangement","Mixing & Mastering"];

export default function Studios() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1615228426590-fd01651aff47?crop=entropy&cs=srgb&fm=jpg&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/30 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Studios</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-6 max-w-4xl">Where ideas become sound & stories.</h1>
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Studio Services</div>
        <div className="mt-8 grid md:grid-cols-3 gap-3">
          {SERVICES.map(s => <div key={s} className="border border-cream-200 p-6 hover:border-terracotta-500 transition-colors font-display text-xl text-ink">{s}</div>)}
        </div>
      </section>
      <section className="py-24 border-t border-cream-200 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Featured Work</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-12">Selected productions from our studio.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[["Brand Anthem — Cinematic Series","Music composition, arrangement & mixing"],["Podcast Production","Full-cycle audio production for editorial podcasts"],["Radio Promo Package","Voice-over, sound design and mastering"],["Jingle Collection","Short-form musical identities for brands"]].map(([t, d]) => (
            <div key={t} className="border border-cream-200 p-8 hover:border-terracotta-500 transition-colors">
              <div className="overline mb-2">Case Study</div>
              <div className="font-display text-2xl text-ink mb-2">{t}</div>
              <p className="text-ink-mute text-sm">{d}</p>
            </div>
          ))}
        </div>
        <a href="/contact" data-testid="studios-cta" className="mt-16 inline-block bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Have a project in mind? Let's create it.</a>
      </section>
    </>
  );
}
