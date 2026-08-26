import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICE_DETAILS, slugify } from "@/data/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = SERVICE_DETAILS[slug] || Object.values(SERVICE_DETAILS).find(s => slugify(s.name) === slug);
  if (!svc) return <Navigate to="/creative-agency" replace />;
  return (
    <>
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <img src={svc.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/40 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <Link to="/creative-agency" data-testid="back-agency" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-400 hover:text-terracotta-300"><ArrowLeft size={14}/> Creative Agency</Link>
          <div className="overline mt-8">Service</div>
          <h1 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-ink mt-4 max-w-4xl">{svc.name}</h1>
        </div>
      </section>
      <section className="py-20 max-w-4xl mx-auto px-6 lg:px-8">
        <p className="font-display text-2xl lg:text-3xl text-ink italic font-light leading-snug">{svc.intro}</p>
      </section>
      <section className="py-16 border-y border-cream-200 bg-cream-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-6">What We Deliver</div>
          <div className="flex flex-wrap gap-3">
            {svc.offerings.map(o => <span key={o} className="border border-cream-200 px-5 py-3 text-sm text-ink-soft hover:border-terracotta-500 hover:text-terracotta-400 transition-colors">{o}</span>)}
          </div>
        </div>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10">
        <div className="border border-cream-200 p-10">
          <div className="overline mb-4">Our Approach</div>
          <p className="text-ink-soft text-lg leading-relaxed">{svc.approach}</p>
        </div>
        <div className="border border-cream-200 p-10">
          <div className="overline mb-4">Who It's For</div>
          <p className="text-ink-soft text-lg leading-relaxed">{svc.who}</p>
        </div>
      </section>
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border border-terracotta-500/30 p-10 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="font-display text-3xl lg:text-4xl text-ink font-light">Ready to begin?</div>
            <p className="text-ink-mute mt-3 max-w-lg">Tell us about your project and we'll respond with a considered plan — not a template.</p>
          </div>
          <Link to="/creative-agency#enquiry" data-testid="service-cta" className="shrink-0 inline-flex items-center gap-3 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Start a Project <ArrowRight size={16}/></Link>
        </div>
      </section>
    </>
  );
}
