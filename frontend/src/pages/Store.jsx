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
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-4">Curated for the creative life.</h1>
        </div>
        <button onClick={() => setOpen(true)} data-testid="store-cart-open" className="flex items-center gap-2 border border-stone-800 hover:border-terracotta-500 px-4 py-3 text-sm text-cream-50 transition-colors">
          <ShoppingBag size={16}/> Cart ({cart.length})
        </button>
      </section>
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="border border-stone-800 p-12 text-center">
            <p className="text-stone-400">Our store is being curated. Merchandise, learning materials and creative products are on their way.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="border border-stone-800 hover:border-terracotta-500 transition-colors">
                <Link to={`/store/${p.id}`} data-testid={`product-${p.id}`}>
                  {p.image && <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />}
                </Link>
                <div className="p-6">
                  <Link to={`/store/${p.id}`} className="font-display text-xl text-cream-50 mb-1 block hover:text-terracotta-400 transition-colors">{p.name}</Link>
                  <p className="text-stone-400 text-sm mb-4">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-terracotta-400">₹{p.price}</span>
                    <button onClick={() => add(p)} data-testid={`store-add-${p.id}`} className="text-xs uppercase tracking-[0.2em] text-cream-50 hover:text-terracotta-400">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {open && (
        <div className="fixed inset-0 z-[70] bg-stone-950/80 backdrop-blur-sm flex justify-end" onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-stone-950 border-l border-stone-800 h-full p-8 overflow-y-auto" data-testid="store-cart-panel">
            <div className="flex justify-between items-center mb-8"><div className="font-display text-2xl text-cream-50">Your Cart</div><button onClick={() => setOpen(false)} className="text-stone-400 hover:text-cream-50">Close</button></div>
            {cart.length === 0 ? <p className="text-stone-500">Cart is empty.</p> : (
              <>
                <ul className="space-y-4">{cart.map((c, i) => <li key={i} className="flex justify-between text-stone-300 text-sm"><span>{c.name}</span><span>₹{c.price}</span></li>)}</ul>
                <div className="mt-8 pt-4 border-t border-stone-800 flex justify-between text-cream-50 font-display text-xl"><span>Total</span><span>₹{total}</span></div>
                <button data-testid="store-checkout" className="mt-6 w-full bg-terracotta-500 hover:bg-terracotta-600 py-4 text-xs uppercase tracking-[0.25em] text-cream-50">Proceed to Checkout</button>
                <p className="mt-3 text-xs text-stone-500 text-center">Payment integration coming soon.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
