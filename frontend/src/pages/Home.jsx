import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import WorldCard from "@/components/site/WorldCard";
import { WORLDS, HERO_IMG, FOUNDER_IMG } from "@/data/worlds";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/20 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-20 w-full">
          <div className="overline reveal">Beyond Imagination</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-[9rem] leading-[0.9] tracking-tighter text-cream-50 mt-6 reveal reveal-delay-1">
            Create. Learn.<br/>Experience. Grow.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-stone-300 leading-relaxed reveal reveal-delay-2">
            Merkabah Creative Life is a creative ecosystem where music, media, learning, live experiences, conversations and holistic wellbeing come together.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
            <Link to="#our-worlds" data-testid="hero-cta-explore"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">
              Explore Our Worlds
            </Link>
            <Link to="/creative-agency#enquiry" data-testid="hero-cta-project"
              className="border border-stone-600 hover:border-terracotta-500 hover:text-terracotta-400 text-cream-50 px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">
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
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-cream-50 font-light tracking-tight">
              A journey through art, music and meaningful experience.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-stone-300 leading-relaxed text-lg">
            <p>Merkabah is a gateway to inspiration and transformation through the profound power of art, music, creativity and meaningful experiences.</p>
            <p>We bring together creative services, music education, live events, podcasts, courses, wellness experiences, merchandise and community under one ecosystem.</p>
            <p>Founded by <span className="text-cream-50">Kingsley Victor</span>, Merkabah has grown from a passion for music, media and creative expression into a broader vision for a connected creative life.</p>
            <Link to="/about" data-testid="home-discover-story"
              className="inline-flex items-center gap-2 mt-4 text-terracotta-400 hover:text-terracotta-300 text-sm uppercase tracking-[0.2em]">
              Discover Our Story <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* OUR WORLDS */}
      <section id="our-worlds" className="py-24 lg:py-32 bg-stone-950 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="overline mb-4">One Ecosystem. Many Worlds.</div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1] text-cream-50 font-light tracking-tighter">
                Nine doors.<br/>One journey.
              </h2>
            </div>
            <p className="max-w-md text-stone-400 text-lg">
              Merkabah is a connected ecosystem. Enter through the door that speaks to you — every path connects back to a shared creative vision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {WORLDS.map((w) => <WorldCard key={w.key} world={w} />)}
          </div>
        </div>
      </section>

      {/* CONNECTED ECOSYSTEM DIFFERENTIATOR */}
      <section className="py-24 lg:py-40 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-6">The Merkabah Difference</div>
        <h2 className="font-display text-4xl lg:text-6xl text-cream-50 font-light tracking-tight max-w-4xl leading-[1.05]">
          Most agencies offer services. We offer an entire creative journey.
        </h2>
        <div className="mt-16 flex flex-wrap gap-x-4 gap-y-6 text-cream-50 font-display text-lg lg:text-2xl">
          {["Idea","Strategy","Branding","Content","Website","Advertising","Audio","Video","Event","Growth"].map((s, i) => (
            <span key={s} className="flex items-center gap-4">
              <span className="text-terracotta-400">{s}</span>
              {i < 9 && <span className="text-stone-700">→</span>}
            </span>
          ))}
        </div>
      </section>

      {/* FOUNDER PREVIEW */}
      <section className="bg-stone-900/50 border-y border-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 py-24 lg:py-32">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={FOUNDER_IMG} alt="Kingsley Victor" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="overline mb-4">The Vision Behind Merkabah</div>
            <h2 className="font-display text-4xl lg:text-6xl text-cream-50 font-light tracking-tight leading-[1.05]">
              Founded by <em className="italic font-normal">Kingsley Victor</em>.
            </h2>
            <p className="mt-8 text-stone-300 text-lg leading-relaxed max-w-lg">
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
