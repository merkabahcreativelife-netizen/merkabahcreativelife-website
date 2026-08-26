import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { WORLDS, HERO_IMG } from "@/data/worlds";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/40 via-cream-50/20 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-20 w-full">
          <div className="overline reveal">Beyond Imagination</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-[9rem] leading-[0.9] tracking-tighter text-ink mt-6 reveal reveal-delay-1">
            Create. Learn.<br/>Experience. Grow.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed reveal reveal-delay-2">
            Merkabah Creative Life unites music, media, education and wellbeing within one connected ecosystem — nine disciplines, one parent brand, one standard of craft.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
            <Link to="#our-worlds" data-testid="hero-cta-explore"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">
              Explore Our Worlds
            </Link>
            <Link to="/creative-agency#enquiry" data-testid="hero-cta-project"
              className="border border-cream-300 hover:border-terracotta-500 hover:text-terracotta-400 text-ink px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS MERKABAH */}
      <section className="py-24 lg:py-40 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="overline mb-6">More Than a Creative Brand</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-ink font-light tracking-tight">
              A journey through art, music and meaningful experience.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-ink-soft leading-relaxed text-lg">
            <p>Merkabah is a gateway to inspiration and transformation through the profound power of art, music, creativity and meaningful experiences.</p>
            <p>We bring together creative services, music education, live events, podcasts, courses, wellness experiences, merchandise and community under one ecosystem.</p>
            <p>Founded by <span className="text-ink">Kingsley Victor</span>, Merkabah has grown from a passion for music, media and creative expression into a broader vision for a connected creative life.</p>
            <Link to="/about" data-testid="home-discover-story"
              className="inline-flex items-center gap-2 mt-4 text-terracotta-400 hover:text-terracotta-300 text-sm uppercase tracking-[0.2em]">
              Discover Our Story <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* OUR WORLDS */}
      <section id="our-worlds" className="py-24 lg:py-32 bg-cream-50 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="overline mb-4">One Ecosystem. Many Worlds.</div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1] text-ink font-light tracking-tighter">
                Nine doors.<br/>One journey.
              </h2>
            </div>
            <p className="max-w-md text-ink-mute text-lg">
              Merkabah is a connected ecosystem. Enter through the door that speaks to you — every path connects back to a shared creative vision.
            </p>
          </div>
          <div className="border-t border-cream-200">
            {WORLDS.map((w, i) => (
              <Link key={w.key} to={w.href} data-testid={`world-row-${w.key}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-12 py-8 lg:py-10 px-2 lg:px-6 border-b border-cream-200 hover:bg-cream-100/60 transition-colors duration-300">
                <span className="font-body text-xs lg:text-sm text-ink-mute tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="overline mb-1">{w.tagline}</div>
                  <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl text-ink group-hover:text-terracotta-600 transition-colors font-light tracking-tight">{w.name}</h3>
                  <p className="mt-2 text-sm lg:text-base text-ink-mute max-w-2xl">{w.desc}</p>
                </div>
                <ArrowUpRight className="text-ink-mute group-hover:text-terracotta-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={28} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTED ECOSYSTEM DIFFERENTIATOR */}
      <section className="py-24 lg:py-40 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-6">The Merkabah Difference</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight max-w-4xl leading-[1.05]">
          Most agencies offer services. We offer an entire creative journey.
        </h2>
        <div className="mt-16 flex flex-wrap gap-x-4 gap-y-6 text-ink font-display text-lg lg:text-2xl">
          {["Idea","Strategy","Branding","Content","Website","Advertising","Audio","Video","Event","Growth"].map((s, i) => (
            <span key={s} className="flex items-center gap-4">
              <span className="text-terracotta-400">{s}</span>
              {i < 9 && <span className="text-ink-mute">→</span>}
            </span>
          ))}
        </div>
      </section>

      {/* FOUNDER PREVIEW */}
      <section className="bg-cream-100/50 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 py-24 lg:py-32">
          <div className="border border-cream-200 bg-cream-100/50 p-10 lg:p-14 flex flex-col justify-center">
            <div className="font-display text-7xl text-terracotta-500 leading-none">&ldquo;</div>
            <p className="font-display text-2xl italic font-light text-ink leading-snug mt-2">Beyond imagination is not a slogan. It is an invitation to create, learn, experience and grow.</p>
            <div className="overline mt-6">Kingsley Victor · Founder</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="overline mb-4">The Vision Behind Merkabah</div>
            <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05]">
              Founded by <em className="italic font-normal">Kingsley Victor</em>.
            </h2>
            <p className="mt-8 text-ink-soft text-lg leading-relaxed max-w-lg">
              A journey spanning radio, music production, sound engineering and creative media — Merkabah brings together music, creativity, learning and meaningful experiences under one vision.
            </p>
            <Link to="/founder" data-testid="home-meet-founder"
              className="mt-8 inline-flex items-center gap-2 text-terracotta-400 hover:text-terracotta-300 text-sm uppercase tracking-[0.2em]">
              Meet Kingsley <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
