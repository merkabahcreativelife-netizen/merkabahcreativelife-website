import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/content/courses/${id}`).then(r => setC(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="min-h-[60vh]" />;
  if (!c) return <div className="pt-32 pb-24 text-center text-ink-mute">Course not found.</div>;
  return (
    <>
      <section className="pt-24 pb-12 max-w-7xl mx-auto px-6 lg:px-8">
        <Link to="/courses" data-testid="back-courses" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-600 hover:text-terracotta-500"><ArrowLeft size={14}/> Courses & Workshops</Link>
        <div className="overline mt-8">{c.level || "All Levels"} · {c.mode || "Flexible"}</div>
        <h1 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-ink mt-4 max-w-4xl">{c.title}</h1>
      </section>
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border border-silver-200 bg-white p-8 lg:p-12" style={{ borderTop: "3px solid #7c3aed" }}>
          <div className="overline mb-4">About This Course</div>
          <p className="text-ink-soft text-lg leading-relaxed">{c.description}</p>
          {c.curriculum && (
            <>
              <div className="overline mt-10 mb-4">What You'll Learn</div>
              <p className="text-ink-soft leading-relaxed">{c.curriculum}</p>
            </>
          )}
        </div>
        <div className="border border-silver-200 bg-white p-8 h-fit space-y-4">
          {[["Instructor", c.instructor], ["Duration", c.duration], ["Mode", c.mode], ["Level", c.level], ["Price", c.price]].filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm border-b border-silver-200 pb-3"><span className="text-ink-mute">{k}</span><span className="text-ink font-semibold text-right">{v}</span></div>
          ))}
          <Link to="/contact" data-testid="course-register" className="block text-center bg-terracotta-500 hover:bg-terracotta-600 text-white py-4 text-xs uppercase tracking-[0.25em] transition-colors mt-4">Register Interest</Link>
        </div>
      </section>
    </>
  );
}
