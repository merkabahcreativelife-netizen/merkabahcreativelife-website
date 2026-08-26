import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import { JOURNAL_IMG } from "@/data/worlds";

export default function JournalArticle() {
  const { id } = useParams();
  const [a, setA] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/content/articles/${id}`).then(r => setA(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="min-h-[60vh]" />;
  if (!a) return <div className="pt-32 pb-24 text-center text-stone-400">Article not found.</div>;
  return (
    <article className="pb-24">
      <div className="relative h-[50vh] overflow-hidden">
        <img src={a.cover || JOURNAL_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 to-stone-950" />
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-24 relative">
        <Link to="/journal" data-testid="back-journal" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-400 hover:text-terracotta-300"><ArrowLeft size={14}/> Journal</Link>
        <div className="overline mt-6">{a.category}</div>
        <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[1] tracking-tighter text-cream-50 mt-4">{a.title}</h1>
        <div className="mt-6 text-sm text-stone-500">By {a.author || "Merkabah Editorial"} · {a.created_at?.slice(0, 10)}</div>
        <div className="mt-12 space-y-6 text-stone-300 text-lg leading-relaxed">
          {(a.content || "").split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </article>
  );
}
