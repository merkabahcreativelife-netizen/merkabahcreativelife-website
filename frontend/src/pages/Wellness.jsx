import { Link } from "react-router-dom";
import { FOUNDER_IMG } from "@/data/worlds";

const MODALITIES = [
  ["Reiki Healing", "Gentle, hands-on energy healing that calms the nervous system, releases stored tension and restores your natural sense of balance.", "#7c3aed"],
  ["Yoga", "Guided asana and breathwork that builds strength and flexibility while bringing you back into a calmer relationship with your body.", "#0d9488"],
  ["Meditation", "Simple, guided practices to quiet the mind, sharpen focus and return to stillness — wherever your day has taken you.", "#c9a227"],
];

export default function Wellness() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/40 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Holistic Wellness · Merkabah Magic & Miracles</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-6 max-w-4xl">A space to pause. Reset. Reconnect.</h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
            Wellness at Merkabah is not an escape from life — it is a way back into it. Through energy healing, mindfulness and creative wellbeing, we help you find clarity, calm and direction.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Healing Modalities</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-14 max-w-3xl">Three practices. One still centre.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODALITIES.map(([t, d, c]) => (
            <div key={t} className="border border-silver-200 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `3px solid ${c}` }} data-testid={`wellness-modality-${t.toLowerCase().replace(/ /g, "-")}`}>
              <div className="font-display text-2xl text-ink mb-4">{t}</div>
              <p className="text-ink-mute leading-relaxed text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 border-y border-silver-200 bg-cream-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative max-w-md mx-auto lg:mx-0 w-full">
            <div className="aspect-[4/5] overflow-hidden border border-silver-200 bg-silver-100">
              <img src={FOUNDER_IMG} alt="Kingsley Victor — Certified Reiki, Angelic Zibu & Candle Healer" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 font-body text-[10px] tracking-[0.25em] uppercase text-ink-mute">Kingsley Victor · Merkabah Magic & Miracles</div>
          </div>
          <div>
            <div className="overline mb-4">Your Guide</div>
            <h2 className="font-display text-4xl lg:text-5xl text-ink font-light tracking-tight leading-tight">Kingsley Victor</h2>
            <p className="mt-3 text-terracotta-400 uppercase tracking-[0.2em] text-xs">Certified Reiki Healer · Angelic Zibu Healer · Candle Healer</p>
            <div className="mt-8 space-y-5 text-ink-soft leading-relaxed">
              <p>Kingsley has been engaged in spiritual arts practice for more than three and a half years, providing clients with clarity and divine direction through life's more difficult passages.</p>
              <p>A media professional with over five years of corporate experience, he carries an unusual combination: the grounded professionalism of the creative industry and the quiet depth of a lifelong spiritual calling.</p>
              <p>Since his undergraduate years he has pursued reiki and angelology, and his intuitive abilities in auto writing, channelling and knot magic have helped many navigate uncertain times with a renewed sense of self.</p>
              <p className="font-display text-xl italic text-ink">"He always nurtured a natural wish to uplift others through his spiritual development."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-silver-200 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Before You Book</div>
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[["Private Sessions","60-minute one-on-one healing sessions, tailored entirely to where you are.","#7c3aed"],
            ["In-Person or Online","Sessions at our Electronic City space, or from wherever you are.","#0d9488"],
            ["Free Consultation","Begin with a short conversation to find the modality that fits.","#c9a227"]].map(([t, d, c]) => (
            <div key={t} className="border border-silver-200 bg-white p-8" style={{ borderTop: `3px solid ${c}` }}>
              <div className="font-display text-2xl text-ink mb-2">{t}</div>
              <p className="text-ink-mute text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <div className="border border-terracotta-500/30 p-10 lg:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="font-display text-3xl text-ink font-light">Begin with a conversation.</div>
            <p className="text-ink-mute mt-3 max-w-lg">Tell us what you are carrying, and we will suggest the experience that fits.</p>
          </div>
          <Link to="/contact" data-testid="wellness-cta" className="shrink-0 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] text-center transition-colors">Enquire / Book a Session</Link>
        </div>
      </section>
    </>
  );
}
