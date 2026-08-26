import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PortfolioDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/content/portfolio_projects/${id}`).then(r => setP(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="min-h-[60vh]" />;
  if (!p) return <div className="pt-32 pb-24 text-center text-ink-mute">Project not found.</div>;
  return (
    <>
      <section className="pt-24 pb-12 max-w-7xl mx-auto px-6 lg:px-8">
        <Link to="/creative-agency#portfolio" data-testid="back-portfolio" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-600 hover:text-terracotta-500"><ArrowLeft size={14}/> Portfolio</Link>
        <div className="overline mt-8">{p.industry}</div>
        <h1 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-ink mt-4 max-w-4xl">{p.name}</h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {(p.services || []).map(s => <span key={s} className="border border-silver-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.15em] text-ink-soft">{s}</span>)}
        </div>
      </section>
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border border-silver-200 bg-white p-8 lg:p-12 mb-8" style={{ borderTop: "3px solid #7c3aed" }}>
          <div className="overline mb-4">The Brief</div>
          <p className="text-ink-soft text-lg leading-relaxed">{p.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[["Challenge", p.challenge, "#ec4899"], ["Strategy", p.strategy, "#0d9488"], ["Execution", p.execution, "#c9a227"], ["Outcome", p.results, "#7c3aed"]].filter(([, v]) => v).map(([t, v, c]) => (
            <div key={t} className="border border-silver-200 bg-white p-8" style={{ borderTop: `3px solid ${c}` }}>
              <div className="font-display text-2xl text-ink mb-3">{t}</div>
              <p className="text-ink-mute leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 border border-terracotta-500/30 p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="font-display text-2xl text-ink">Have a similar project in mind?</div>
          <Link to="/creative-agency#enquiry" data-testid="portfolio-cta" className="shrink-0 inline-flex items-center gap-3 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Start a Project <ArrowRight size={16}/></Link>
        </div>
      </section>
    </>
  );
}
