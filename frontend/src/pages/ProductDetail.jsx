import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/content/products/${id}`).then(r => setP(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="min-h-[60vh]" />;
  if (!p) return <div className="pt-32 pb-24 text-center text-ink-mute">Product not found.</div>;
  const price = p.discount_price || p.price;
  return (
    <section className="pt-24 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
      <Link to="/store" data-testid="back-store" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-400 hover:text-terracotta-300"><ArrowLeft size={14}/> Store</Link>
      <div className="mt-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="border border-cream-200 overflow-hidden">
          {p.image ? <img src={p.image} alt={p.name} className="w-full aspect-square object-cover" /> : <div className="w-full aspect-square bg-cream-100" />}
        </div>
        <div className="flex flex-col justify-center">
          <div className="overline">{p.category}</div>
          <h1 className="font-display font-light text-4xl lg:text-6xl text-ink tracking-tighter leading-[1] mt-4">{p.name}</h1>
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-3xl text-terracotta-400">₹{price}</span>
            {p.discount_price && <span className="text-ink-mute line-through">₹{p.price}</span>}
          </div>
          <p className="mt-8 text-ink-soft text-lg leading-relaxed">{p.description}</p>
          <div className="mt-6 text-sm text-ink-mute">{p.in_stock ? "In stock" : "Currently unavailable"}</div>
          <button onClick={() => toast.success("Added to cart")} data-testid="product-add-cart" disabled={!p.in_stock}
            className="mt-10 bg-terracotta-500 hover:bg-terracotta-600 text-white py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-50">
            Add to Cart
          </button>
          <p className="mt-4 text-xs text-ink-mute">Secure checkout & payment integration coming soon.</p>
        </div>
      </div>
    </section>
  );
}
