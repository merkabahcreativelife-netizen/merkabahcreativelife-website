import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function JobDetail() {
  const { id } = useParams();
  const [j, setJ] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/content/jobs/${id}`).then(r => setJ(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="min-h-[60vh]" />;
  if (!j) return <div className="pt-32 pb-24 text-center text-ink-mute">Position not found.</div>;
  return (
    <>
      <section className="pt-24 pb-12 max-w-7xl mx-auto px-6 lg:px-8">
        <Link to="/careers" data-testid="back-careers" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-400 hover:text-terracotta-300"><ArrowLeft size={14}/> Careers</Link>
        <div className="overline mt-8">{j.department} · {j.employment_type}</div>
        <h1 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-ink mt-4 max-w-4xl">{j.title}</h1>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink-mute">
          <span className="border border-silver-200 px-4 py-2">{j.location}</span>
          <span className="border border-silver-200 px-4 py-2">{j.work_mode}</span>
          <span className="border border-silver-200 px-4 py-2">{j.experience_level}</span>
        </div>
      </section>
      <section className="pb-24 max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
        {[["About the Role", j.description],["What You'll Do", j.responsibilities],["What You Bring", j.requirements],["What We Offer", j.offer]].filter(([, v]) => v).map(([t, v]) => (
          <div key={t}>
            <div className="overline mb-4">{t}</div>
            <p className="text-ink-soft text-lg leading-relaxed">{v}</p>
          </div>
        ))}
        <div className="border border-terracotta-500/30 p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="font-display text-2xl text-ink">Sound like you?</div>
          <Link to={`/careers/internships?role=${encodeURIComponent(j.title)}`} data-testid="job-apply" className="shrink-0 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] text-center transition-colors">Apply Now</Link>
        </div>
      </section>
    </>
  );
}
