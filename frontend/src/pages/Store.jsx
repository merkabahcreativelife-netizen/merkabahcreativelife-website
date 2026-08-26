import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

export default function Store() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => { api.get("/content/products").then(r => setProducts(r.data)).catch(() => {}); }, []);
  const add = (p) => { setCart(c => [...c, p]); toast.success(`${p.name} added to cart`); };
  const total = cart.reduce((s, p) => s + (p.price || 0), 0);
  return (
    <>
      <section className="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8 flex items-start justify-between gap-6">
        <div>
          <div className="overline">Merkabah Store</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-4">Curated for the creative life.</h1>
        </div>
        <button onClick={() => setOpen(true)} data-testid="store-cart-open" className="flex items-center gap-2 border border-cream-200 hover:border-terracotta-500 px-4 py-3 text-sm text-ink transition-colors">
          <ShoppingBag size={16}/> Cart ({cart.length})
        </button>
      </section>
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="border border-cream-200 p-12 text-center">
            <p className="text-ink-mute">Our store is being curated. Merchandise, learning materials and creative products are on their way.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="border border-cream-200 hover:border-terracotta-500 transition-colors">
                <Link to={`/store/${p.id}`} data-testid={`product-${p.id}`}>
                  {p.image && <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />}
                </Link>
                <div className="p-6">
                  <Link to={`/store/${p.id}`} className="font-display text-xl text-ink mb-1 block hover:text-terracotta-400 transition-colors">{p.name}</Link>
                  <p className="text-ink-mute text-sm mb-4">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-terracotta-400">₹{p.price}</span>
                    <button onClick={() => add(p)} data-testid={`store-add-${p.id}`} className="text-xs uppercase tracking-[0.2em] text-ink hover:text-terracotta-400">Add</button>
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
            {cart.length === 0 ? <p className="text-ink-mute">Cart is empty.</p> : (
              <>
                <ul className="space-y-4">{cart.map((c, i) => <li key={i} className="flex justify-between text-ink-soft text-sm"><span>{c.name}</span><span>₹{c.price}</span></li>)}</ul>
                <div className="mt-8 pt-4 border-t border-cream-200 flex justify-between text-ink font-display text-xl"><span>Total</span><span>₹{total}</span></div>
                <button data-testid="store-checkout" className="mt-6 w-full bg-terracotta-500 hover:bg-terracotta-600 py-4 text-xs uppercase tracking-[0.25em] text-white">Proceed to Checkout</button>
                <p className="mt-3 text-xs text-ink-mute text-center">Payment integration coming soon.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
