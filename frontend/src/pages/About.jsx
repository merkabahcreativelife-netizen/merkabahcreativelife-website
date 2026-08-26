import { Link } from "react-router-dom";
import { FOUNDER_IMG } from "@/data/worlds";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  ["Create", "Express ideas, emotions and imagination.", "#7c3aed"],
  ["Learn", "Develop knowledge, skills and confidence.", "#0d9488"],
  ["Experience", "Connect with people, culture, music and stories.", "#c9a227"],
  ["Grow", "Use creativity and continuous learning as tools for growth.", "#ec4899"],
];

const NAME_JOURNEY = ["Ascend", "Create", "Discover", "Transform"];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden border-b border-silver-200">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100 to-white" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="overline">About Merkabah</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-6 max-w-5xl">
            A journey of creation, discovery &amp; transformation.
          </h1>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6 text-ink-soft text-lg leading-relaxed">
          <p className="font-display text-2xl lg:text-3xl text-ink font-light leading-snug">
            Merkabah is your gateway to inspiration and transformation through the profound power of art and music.
          </p>
          <p>We offer online courses, live events, podcasts, unique merchandise and a supportive community — each designed to guide people on a genuine path of self-discovery.</p>
          <p>Our name, <em className="text-ink">Merkabah</em>, symbolizes spiritual ascent and represents our commitment to growth, creativity and transformation.</p>
          <p>At Merkabah, music and art are more than entertainment. They are forms of expression, learning, connection and meaningful experience.</p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="border border-silver-200 bg-white p-8" style={{ borderTop: "4px solid #7c3aed" }}>
            <div className="overline mb-6">At a Glance</div>
            <ul className="space-y-4 text-sm text-ink-soft">
              <li className="flex justify-between border-b border-silver-200 pb-3"><span className="text-ink-mute">Divisions</span><span className="font-semibold text-ink">9 connected worlds</span></li>
              <li className="flex justify-between border-b border-silver-200 pb-3"><span className="text-ink-mute">Based in</span><span className="font-semibold text-ink">Bengaluru, India</span></li>
              <li className="flex justify-between border-b border-silver-200 pb-3"><span className="text-ink-mute">Founded by</span><span className="font-semibold text-ink">Kingsley Victor</span></li>
              <li className="flex justify-between"><span className="text-ink-mute">Philosophy</span><span className="font-semibold text-ink">Create. Learn. Experience. Grow.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY MERKABAH */}
      <section className="py-24 border-y border-silver-200 bg-cream-100/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Why "Merkabah"?</div>
          <h2 className="font-display text-4xl lg:text-6xl text-ink font-light leading-tight tracking-tight max-w-3xl">
            The name is the journey.
          </h2>
          <p className="mt-6 text-ink-soft max-w-2xl text-lg leading-relaxed">
            Merkabah represents the movement of the creative spirit — a symbol of ascent, exploration and personal transformation, welcoming everyone regardless of background.
          </p>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {NAME_JOURNEY.map((s, i) => {
              const c = ["#7c3aed", "#0d9488", "#c9a227", "#ec4899"][i];
              return (
                <div key={s} className="relative border border-silver-200 bg-white p-7 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `3px solid ${c}` }}>
                  <div className="font-display text-4xl mb-2" style={{ color: c }}>{String(i + 1).padStart(2, "0")}</div>
                  <div className="font-display text-2xl text-ink">{s}</div>
                  {i < 3 && <span className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-ink-mute z-10">→</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Our Philosophy</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight max-w-3xl leading-[1.05]">
          Four pillars, one connected life.
        </h2>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map(([t, d, c]) => (
            <div key={t} className="border border-silver-200 bg-white p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `4px solid ${c}` }}>
              <div className="font-display text-3xl text-ink mb-4">{t}</div>
              <p className="text-ink-mute text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="pb-24 lg:pb-32 max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6">
        <div className="border border-silver-200 bg-white p-10 lg:p-12" style={{ borderLeft: "4px solid #7c3aed" }}>
          <div className="overline mb-4">Vision</div>
          <p className="font-display text-2xl lg:text-3xl text-ink font-light leading-snug">
            To build a creative ecosystem where art, music, education, technology, culture and holistic wellbeing come together to inspire people and create meaningful transformation.
          </p>
        </div>
        <div className="border border-silver-200 bg-white p-10 lg:p-12" style={{ borderLeft: "4px solid #0d9488" }}>
          <div className="overline mb-4" style={{ color: "#0f766e" }}>Mission</div>
          <p className="font-display text-2xl lg:text-3xl text-ink font-light leading-snug">
            To make creativity and meaningful learning accessible through experiences that inspire people to discover their potential, express themselves and connect with others.
          </p>
        </div>
      </section>

      {/* FOUNDER PREVIEW */}
      <section className="bg-cream-100/40 border-t border-silver-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 py-24 items-center">
          <div className="relative max-w-sm">
            <div className="aspect-[4/5] overflow-hidden border border-silver-200 bg-silver-100">
              <img src={FOUNDER_IMG} alt="Kingsley Victor" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 font-body text-[10px] tracking-[0.25em] uppercase text-ink-mute">Kingsley Victor · Founder</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="overline mb-4">Meet Our Visionary Founder</div>
            <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight">Kingsley Victor</h2>
            <p className="mt-3 text-violet-700 uppercase tracking-[0.2em] text-xs font-bold">Founder &amp; Creative Visionary</p>
            <p className="mt-6 text-ink-soft text-lg leading-relaxed max-w-lg">
              A unique fusion of media, music, sound engineering and creative expression — 12+ years across India's radio landscape and recording studios, now building a connected creative life for everyone.
            </p>
            <Link to="/founder" data-testid="about-meet-founder" className="mt-8 self-start inline-flex items-center gap-3 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">
              Read His Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
