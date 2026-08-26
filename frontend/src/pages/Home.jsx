import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Lightbulb, Target, Fingerprint, PenTool, Globe, Megaphone, AudioLines, Clapperboard, Ticket, TrendingUp } from "lucide-react";
import { api } from "@/lib/api";
import { WORLDS, HERO_IMG, FOUNDER_IMG } from "@/data/worlds";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [event, setEvent] = useState(null);
  useEffect(() => {
    api.get("/content/articles").then(r => setArticles((r.data || []).slice(0, 3))).catch(() => {});
    api.get("/content/events").then(r => setEvent((r.data || []).find(e => e.upcoming) || null)).catch(() => {});
  }, []);
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-28 w-full">
          <div className="overline reveal">Beyond Imagination</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-[9rem] leading-[0.9] tracking-tighter text-ink mt-6 reveal reveal-delay-1">
            Create. Learn.<br/>Experience. <span className="italic text-terracotta-600">Grow.</span>
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
              className="border border-silver-300 hover:border-terracotta-500 hover:text-terracotta-400 text-ink px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">
              Start a Project
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 border-t border-silver-200 bg-white/70 backdrop-blur-md" data-testid="hero-worlds-strip">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
              {WORLDS.map(w => (
                <Link key={w.key} to={w.href} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-ink-mute hover:text-ink whitespace-nowrap transition-colors">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: w.accent }} />{w.name}
                </Link>
              ))}
            </div>
            <ChevronDown className="hidden md:block text-ink-mute animate-bounce shrink-0" size={18} />
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <div className="border-y border-silver-200 bg-white py-5 overflow-hidden" data-testid="brand-marquee">
        <div className="marquee-inner flex whitespace-nowrap w-max">
          {[0, 1].map(n => (
            <div key={n} className="flex items-center gap-10 pr-10 font-display text-2xl lg:text-3xl text-ink">
              {["Beyond Imagination","Create","Learn","Experience","Grow"].map(w => (
                <span key={w} className="flex items-center gap-10">{w}<span className="text-terracotta-500 text-base">◆</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WHAT IS MERKABAH */}
      <section className="py-24 lg:py-40 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="overline mb-6">01 — More Than a Creative Brand</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-ink font-light tracking-tight">
              One ecosystem for everything you imagine.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-ink-soft leading-relaxed text-lg">
            <p>Merkabah Creative Life is a creative ecosystem built for people and brands who refuse to think in silos. Strategy, sound, story and stage — every discipline lives under one roof, and every discipline strengthens the others.</p>
            <p>A business finds its brand voice with our agency, records its anthem in our studios, launches it on our stage and teaches its team through our courses. A student walks in for a piano class and walks out onto a stage. That is what connected creativity means.</p>
            <p>Founded by <span className="text-ink font-semibold">Kingsley Victor</span>, Merkabah brings twelve years of radio, music production and media craft into one vision: a creative life that anyone can enter — and nobody outgrows.</p>
            <Link to="/about" data-testid="home-discover-story"
              className="inline-flex items-center gap-2 mt-4 text-terracotta-400 hover:text-terracotta-300 text-sm uppercase tracking-[0.2em]">
              Discover Our Story <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[["09","Connected Divisions","#7c3aed"],["12+","Years of Craft","#0d9488"],["21+","Brands Served","#c9a227"],["07","Music Programs","#ec4899"]].map(([n, l, c]) => (
            <div key={l} className="border border-silver-200 bg-white p-7 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `3px solid ${c}` }}>
              <div className="font-display text-4xl lg:text-5xl text-ink">{n}</div>
              <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold mt-2" style={{ color: c }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR WORLDS */}
      <section id="our-worlds" className="py-24 lg:py-32 bg-cream-50 border-t border-silver-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="overline mb-4">02 — One Ecosystem. Many Worlds.</div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1] text-ink font-light tracking-tighter">
                Nine doors.<br/>One journey.
              </h2>
            </div>
            <p className="max-w-md text-ink-mute text-lg">
              Merkabah is a connected ecosystem. Enter through the door that speaks to you — every path connects back to a shared creative vision.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORLDS.map((w, i) => (
              <Link key={w.key} to={w.href} data-testid={`world-row-${w.key}`}
                className="group border border-silver-200 bg-white p-7 lg:p-8 flex flex-col hover:shadow-[0_24px_48px_-16px_rgba(124,58,237,0.28)] hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `4px solid ${w.accent}` }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: w.accent }}>{String(i + 1).padStart(2, "0")}</span>
                  <ArrowUpRight size={18} className="text-ink-mute group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <div className="font-body text-[10px] tracking-[0.25em] uppercase text-ink-mute mb-2">{w.tagline}</div>
                <h3 className="font-display text-2xl lg:text-3xl text-ink group-hover:text-terracotta-600 transition-colors font-light tracking-tight leading-tight">{w.name}</h3>
                <p className="mt-3 text-sm text-ink-mute leading-relaxed flex-1">{w.desc}</p>
                <div className="mt-6 pt-4 border-t border-silver-200 text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: w.accent }}>{w.cta} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTED ECOSYSTEM DIFFERENTIATOR */}
      <section className="py-24 lg:py-36 border-y border-silver-200 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-6">03 — The Merkabah Difference</div>
          <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight max-w-4xl leading-[1.05]">
            Most agencies offer services. We offer an entire creative journey.
          </h2>
          <div className="relative mt-20 lg:mt-24">
            <div className="absolute top-6 left-8 right-8 h-[2px] hidden lg:block opacity-60" style={{ background: "linear-gradient(to right, #7c3aed, #0d9488, #c9a227, #ec4899, #64748b)" }} />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-12 gap-x-4">
              {["Idea","Strategy","Branding","Content","Website","Advertising","Audio","Video","Event","Growth"].map((s, i) => {
                const accents = ["#7c3aed","#0d9488","#c9a227","#ec4899","#64748b"];
                const icons = [Lightbulb, Target, Fingerprint, PenTool, Globe, Megaphone, AudioLines, Clapperboard, Ticket, TrendingUp];
                const c = accents[i % 5];
                const Icon = icons[i];
                return (
                  <div key={s} data-testid={`journey-step-${i}`} className="group relative text-center">
                    <div className="relative z-10 mx-auto w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" style={{ background: c, boxShadow: `0 0 0 6px #ffffff, 0 14px 32px -8px ${c}90` }}>
                      <Icon size={26} strokeWidth={1.6} />
                    </div>
                    <span className="absolute top-0 left-1/2 translate-x-2 lg:translate-x-4 -translate-y-1 z-20 bg-white border border-silver-200 rounded-full px-2 py-0.5 font-body text-[10px] font-bold tracking-widest shadow-sm" style={{ color: c }}>{String(i + 1).padStart(2, "0")}</span>
                    <div className="mt-4 font-display text-xl lg:text-2xl text-ink group-hover:-translate-y-0.5 transition-transform duration-300">{s}</div>
                    <div className="mt-2 h-[2px] w-8 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: c }} />
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-20 lg:mt-24 text-center font-display text-2xl lg:text-4xl italic font-light text-ink max-w-3xl mx-auto leading-snug">
            One idea in. <span style={{ color: "#7c3aed" }}>A whole brand out.</span>
          </p>
        </div>
      </section>

      {/* FOUNDER PREVIEW */}
      <section className="bg-cream-100/50 border-y border-silver-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 py-24 lg:py-32">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden border border-silver-200 bg-silver-100">
              <img src={FOUNDER_IMG} alt="Kingsley Victor — Founder, Merkabah Creative Life" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-violet-600 text-white px-6 py-4 shadow-xl">
              <div className="font-display text-lg leading-tight">Kingsley Victor</div>
              <div className="font-body text-[10px] tracking-[0.25em] uppercase opacity-80 mt-1">Founder & Creative Visionary</div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="overline mb-4">04 — The Vision Behind Merkabah</div>
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

      {/* JOURNAL & LIVE PREVIEW */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="overline mb-6">05 — From the Journal</div>
            <h2 className="font-display text-4xl lg:text-5xl text-ink font-light tracking-tight mb-10">Stories worth reading.</h2>
            <div className="space-y-4">
              {articles.map(a => (
                <Link key={a.id} to={`/journal/${a.id}`} data-testid={`home-article-${a.slug || a.id}`}
                  className="group flex items-center justify-between gap-6 border border-silver-200 bg-white p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" style={{ borderLeft: "3px solid #7c3aed" }}>
                  <div>
                    <div className="font-body text-[10px] tracking-[0.25em] uppercase text-ink-mute mb-1">{a.category}</div>
                    <div className="font-display text-xl text-ink group-hover:text-terracotta-600 transition-colors">{a.title}</div>
                  </div>
                  <ArrowUpRight size={18} className="text-ink-mute group-hover:text-ink shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
            <Link to="/journal" data-testid="home-journal-all" className="mt-6 inline-flex items-center gap-2 text-terracotta-600 text-xs uppercase tracking-[0.2em] font-semibold">All Stories <ArrowRight size={14} /></Link>
          </div>
          <div className="lg:col-span-2">
            {event && (
              <div className="border border-silver-200 bg-white h-full flex flex-col" style={{ borderTop: "4px solid #ec4899" }} data-testid="home-next-event">
                <div className="p-8 flex-1">
                  <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: "#db2777" }}>Next Live Event</div>
                  <div className="font-display text-3xl text-ink leading-tight">{event.name}</div>
                  <p className="mt-4 text-ink-mute text-sm leading-relaxed">{event.description}</p>
                </div>
                <div className="px-8 py-5 border-t border-silver-200 flex items-center justify-between text-sm gap-4">
                  <span className="text-ink-soft font-semibold">{event.date} · {event.time}</span>
                  <Link to={`/live/${event.id}`} data-testid="home-event-link" className="text-xs uppercase tracking-[0.2em] font-semibold whitespace-nowrap" style={{ color: "#db2777" }}>Details →</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-violet-700 py-20 lg:py-28" data-testid="home-closing-cta">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <div className="font-body text-[10px] tracking-[0.28em] uppercase font-bold mb-4" style={{ color: "#ddd6fe" }}>Begin Anywhere</div>
            <h2 className="font-display text-4xl lg:text-6xl text-white font-light tracking-tight leading-[1.05]">Your journey starts<br/>with one step.</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/creative-agency#enquiry" data-testid="home-cta-project" className="bg-white text-violet-700 hover:bg-cream-100 px-8 py-4 text-xs uppercase tracking-[0.25em] font-bold transition-colors">Start a Project</Link>
            <Link to="/academy" data-testid="home-cta-academy" className="border border-white/60 text-white hover:bg-white/10 px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Explore the Academy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
