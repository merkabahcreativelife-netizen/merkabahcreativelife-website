import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function EpisodeDetail() {
  const { id } = useParams();
  const [ep, setEp] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/content/podcast_episodes/${id}`).then(r => setEp(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="min-h-[60vh]" />;
  if (!ep) return <div className="pt-32 pb-24 text-center text-ink-mute">Episode not found.</div>;
  return (
    <section className="pt-24 pb-24 max-w-4xl mx-auto px-6 lg:px-8">
      <Link to="/podcast" data-testid="back-podcast" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-400 hover:text-terracotta-300"><ArrowLeft size={14}/> Podcast</Link>
      <div className="mt-10 flex items-start gap-8">
        <div className="font-display text-7xl lg:text-8xl text-terracotta-500 leading-none">#{ep.episode_number}</div>
        <div>
          <div className="overline">With {ep.guest}</div>
          <h1 className="font-display font-light text-4xl lg:text-6xl text-ink tracking-tighter leading-[1] mt-3">{ep.title}</h1>
          <div className="mt-4 text-sm text-ink-mute">{ep.publish_date}</div>
        </div>
      </div>
      <p className="mt-12 font-display text-xl lg:text-2xl text-ink italic font-light leading-snug">{ep.description}</p>
      {ep.notes && (
        <div className="mt-12 border border-silver-200 p-8">
          <div className="overline mb-4">Episode Notes</div>
          <p className="text-ink-soft leading-relaxed">{ep.notes}</p>
        </div>
      )}
      <div className="mt-12 text-ink-mute text-sm">Audio & video players coming soon — subscribe to the newsletter to be notified when episodes go live.</div>
    </section>
  );
}
