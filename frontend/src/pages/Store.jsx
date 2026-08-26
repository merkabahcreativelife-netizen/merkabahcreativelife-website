import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";

const CATS = ["All", "Merchandise", "Music Products", "Learning Materials", "Digital Products", "Creative Products", "Books", "Workshops / Tickets", "Special Collections"];

export default function Store() {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(false);
  const { items, add, setQty, remove, total, count } = useCart();
  const nav = useNavigate();
  useEffect(() => { api.get("/content/products").then(r => setProducts(r.data)).catch(() => {}); }, []);
  const filtered = cat === "All" ? products : products.filter(p => p.category === cat);
  return (
    <>
      <section className="pt-24 pb-12 max-w-7xl mx-auto px-6 lg:px-8 flex items-start justify-between gap-6">
        <div>
          <div className="overline">Merkabah Store</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-4">Objects of the creative life.</h1>
          <p className="mt-6 max-w-xl text-ink-mute text-lg">Merchandise, learning materials, digital products and tickets — every piece made or chosen by the Merkabah team.</p>
        </div>
        <button onClick={() => setOpen(true)} data-testid="store-cart-open" className="shrink-0 flex items-center gap-2 border border-cream-200 hover:border-terracotta-500 px-4 py-3 text-sm text-ink transition-colors">
          <ShoppingBag size={16}/> Cart ({count})
        </button>
      </section>

      <section className="pb-8 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} data-testid={`store-cat-${c}`}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${cat === c ? "bg-terracotta-500 border-terracotta-500 text-white" : "border-cream-200 text-ink-mute hover:border-terracotta-500"}`}>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="border border-cream-200 p-12 text-center"><p className="text-ink-mute">New pieces are being curated for this collection.</p></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="border border-cream-200 hover:border-terracotta-500 transition-colors bg-white">
                <Link to={`/store/${p.id}`} data-testid={`product-${p.id}`}>
                  {p.image && <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />}
                </Link>
                <div className="p-6">
                  <div className="overline mb-1">{p.category}</div>
                  <Link to={`/store/${p.id}`} className="font-display text-xl text-ink mb-1 block hover:text-terracotta-600 transition-colors">{p.name}</Link>
                  <p className="text-ink-mute text-sm mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-terracotta-600 font-semibold">₹{p.discount_price || p.price}{p.discount_price && <span className="ml-2 text-ink-mute line-through font-normal text-sm">₹{p.price}</span>}</span>
                    <button onClick={() => { add(p); toast.success(`${p.name} added to cart`); }} data-testid={`store-add-${p.id}`} className="text-xs uppercase tracking-[0.2em] text-ink hover:text-terracotta-600">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {open && (
        <div className="fixed inset-0 z-[70] bg-cream-50/80 backdrop-blur-sm flex justify-end" onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-cream-50 border-l border-cream-200 h-full p-8 overflow-y-auto" data-testid="store-cart-panel">
            <div className="flex justify-between items-center mb-8"><div className="font-display text-2xl text-ink">Your Cart</div><button onClick={() => setOpen(false)} className="text-ink-mute hover:text-ink">Close</button></div>
            {items.length === 0 ? <p className="text-ink-mute">Cart is empty.</p> : (
              <>
                <ul className="space-y-5">
                  {items.map(i => (
                    <li key={i.id} className="flex items-center gap-4">
                      {i.image && <img src={i.image} alt="" className="w-12 h-12 object-cover border border-cream-200" />}
                      <div className="flex-1"><div className="text-sm text-ink">{i.name}</div><div className="text-xs text-ink-mute">₹{i.price}</div></div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="p-1 border border-cream-200 hover:border-terracotta-500"><Minus size={12}/></button>
                        <span className="text-sm w-6 text-center">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="p-1 border border-cream-200 hover:border-terracotta-500"><Plus size={12}/></button>
                        <button onClick={() => remove(i.id)} className="p-1 text-ink-mute hover:text-terracotta-600"><Trash2 size={14}/></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-4 border-t border-cream-200 flex justify-between text-ink font-display text-xl"><span>Total</span><span>₹{total}</span></div>
                <button onClick={() => { setOpen(false); nav("/store/checkout"); }} data-testid="store-checkout" className="mt-6 w-full bg-terracotta-500 hover:bg-terracotta-600 py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors">Proceed to Checkout</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
