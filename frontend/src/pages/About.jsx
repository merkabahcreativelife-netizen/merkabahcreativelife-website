import { Link } from "react-router-dom";

const PILLARS = [
  ["Create", "Express ideas, emotions and imagination."],
  ["Learn", "Develop knowledge, skills and confidence."],
  ["Experience", "Connect with people, culture, music and stories."],
  ["Grow", "Use creativity and continuous learning as tools for growth."],
];

export default function About() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="overline">About Merkabah</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-6">
            A journey of creation, discovery & transformation.
          </h1>
        </div>
      </section>

      <section className="py-24 lg:py-32 max-w-4xl mx-auto px-6 lg:px-8 space-y-8 text-ink-soft text-lg leading-relaxed">
        <p>Merkabah is your gateway to inspiration and transformation through the profound power of art and music.</p>
        <p>We offer online courses, live events, podcasts, unique merchandise and a supportive community designed to guide people on a path of self-discovery.</p>
        <p>Our name, <em className="text-ink">Merkabah</em>, symbolizes spiritual ascent and represents our commitment to growth, creativity and transformation.</p>
        <p>At Merkabah, music and art are more than entertainment. They are forms of expression, learning, connection and meaningful experience.</p>
      </section>

      <section className="py-24 border-y border-cream-200 bg-cream-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Why "Merkabah"?</div>
          <h2 className="font-display text-4xl lg:text-6xl text-ink font-light leading-tight tracking-tight max-w-3xl">
            Ascend. Create. Discover. Transform.
          </h2>
          <p className="mt-8 text-ink-soft max-w-2xl text-lg leading-relaxed">
            Merkabah represents the movement of the creative spirit — a symbol of ascent, exploration and personal transformation, welcoming everyone regardless of background.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-6">Our Philosophy</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight max-w-3xl leading-[1.05]">
          Four pillars, one connected life.
        </h2>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(([t, d]) => (
            <div key={t} className="border border-cream-200 p-8 hover:border-terracotta-500 transition-colors">
              <div className="font-display text-3xl text-ink mb-4">{t}</div>
              <p className="text-ink-mute text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-cream-200 grid md:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 lg:px-8">
        <div>
          <div className="overline mb-4">Vision</div>
          <p className="font-display text-2xl lg:text-3xl text-ink leading-snug">
            To build a creative ecosystem where art, music, education, technology, culture and holistic wellbeing come together to inspire people and create meaningful transformation.
          </p>
        </div>
        <div>
          <div className="overline mb-4">Mission</div>
          <p className="font-display text-2xl lg:text-3xl text-ink leading-snug">
            To make creativity and meaningful learning accessible through experiences that inspire people to discover their potential, express themselves and connect with others.
          </p>
        </div>
      </section>

      <section className="bg-cream-100/50 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 py-24">
          <div className="border border-cream-200 bg-cream-100/50 p-10 lg:p-14 max-w-sm">
            <div className="font-display text-7xl text-terracotta-500 leading-none">&ldquo;</div>
            <p className="font-display text-xl italic font-light text-ink leading-snug mt-2">Creativity is not what we do. It is how we live.</p>
            <div className="overline mt-6">Kingsley Victor</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="overline mb-4">Meet Our Visionary Founder</div>
            <h2 className="font-display text-4xl lg:text-6xl text-ink font-light">Kingsley Victor</h2>
            <p className="mt-6 text-ink-soft text-lg leading-relaxed">Founder & Creative Visionary — a unique fusion of media, music, sound engineering and creative expression.</p>
            <Link to="/founder" data-testid="about-meet-founder" className="mt-8 self-start bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Read His Story</Link>
          </div>
        </div>
      </section>
    </>
  );
}
