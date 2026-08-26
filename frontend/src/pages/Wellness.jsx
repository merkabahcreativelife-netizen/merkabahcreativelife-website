import { Link } from "react-router-dom";

const MODALITIES = [
  ["Reiki Healing", "Gentle, hands-on energy healing that calms the nervous system, releases stored tension and restores your natural sense of balance."],
  ["Angelic Zibu Healing", "A symbolic energy practice working with angelic sigils — a quiet, focused modality for emotional clarity and inner guidance."],
  ["Candle Healing", "An ancient contemplative practice using flame, intention and ritual to mark release, renewal and new beginnings."],
  ["Auto Writing", "A guided intuitive practice that helps you access your own deeper knowing — putting words to what you feel but cannot yet say."],
  ["Channelling", "Focused intuitive sessions for navigating difficult seasons with clarity, perspective and a sense of direction."],
  ["Knot Magic", "A symbolic ritual practice — each knot an intention — used to work through transitions, decisions and letting go."],
];

const EXPERIENCES = [
  ["Private Sessions", "One-on-one healing sessions tailored to where you are and what you are moving through."],
  ["Group Experiences", "Shared circles of sound, stillness and reflection — healing in good company."],
  ["Workshops", "Half-day immersions in mindfulness, creative wellbeing and spiritual practice."],
  ["Community Gatherings", "Regular open evenings of music, meditation and conversation under the Merkabah roof."],
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
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-14 max-w-3xl">Ancient practices, held with a modern heart.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODALITIES.map(([t, d]) => (
            <div key={t} className="border border-cream-200 p-8 hover:border-terracotta-500 transition-colors" data-testid={`wellness-modality-${t.toLowerCase().replace(/ /g, "-")}`}>
              <div className="font-display text-2xl text-ink mb-4">{t}</div>
              <p className="text-ink-mute leading-relaxed text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 border-y border-cream-200 bg-cream-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="border border-cream-200 bg-cream-50 p-10 lg:p-14">
            <div className="font-display text-7xl text-terracotta-500 leading-none">&ldquo;</div>
            <p className="font-display text-2xl italic font-light text-ink leading-snug mt-2">He always nurtured a natural wish to uplift others through his spiritual development.</p>
            <div className="overline mt-6">Merkabah Magic & Miracles</div>
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

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Wellness Experiences</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-14 max-w-3xl">Choose the door that calls you.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {EXPERIENCES.map(([t, d]) => (
            <div key={t} className="border border-cream-200 p-10 hover:border-terracotta-500 transition-colors">
              <div className="font-display text-3xl text-ink mb-3">{t}</div>
              <p className="text-ink-mute leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 border border-terracotta-500/30 p-10 lg:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
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
