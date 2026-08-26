import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { api, formatError } from "@/lib/api";
import { toast } from "sonner";

export default function Checkout() {
  const { items, total, setQty, remove, clear } = useCart();
  const nav = useNavigate();
  const [f, setF] = useState({ customer_name: "", email: "", phone: "", address: "", city: "", pincode: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const on = (k) => (e) => setF(x => ({ ...x, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!items.length) { toast.error("Your cart is empty."); return; }
    setLoading(true);
    try {
      const { data } = await api.post("/orders", { ...f, items, total });
      clear();
      nav(`/store/order/${data.id}`);
    } catch (err) {
      toast.error(formatError(err.response?.data?.detail) || err.message);
    } finally { setLoading(false); }
  };

  return (
    <section className="pt-24 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
      <Link to="/store" data-testid="back-store" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-600 hover:text-terracotta-500"><ArrowLeft size={14}/> Store</Link>
      <div className="overline mt-8">Checkout</div>
      <h1 className="font-display font-light text-4xl sm:text-6xl leading-[0.95] tracking-tighter text-ink mt-3">Almost there.</h1>

      {items.length === 0 ? (
        <div className="mt-12 border border-cream-200 p-12 text-center">
          <p className="text-ink-mute">Your cart is empty.</p>
          <Link to="/store" data-testid="checkout-empty-cta" className="mt-6 inline-block bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Browse the Store</Link>
        </div>
      ) : (
        <div className="mt-12 grid lg:grid-cols-5 gap-10">
          <form onSubmit={submit} className="lg:col-span-3 grid md:grid-cols-2 gap-5 h-fit border border-cream-200 bg-cream-100/50 p-8">
            <div className="md:col-span-2 overline">Your Details</div>
            <input required placeholder="Full name*" value={f.customer_name} onChange={on("customer_name")} data-testid="checkout-name" className="bg-white border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input required type="email" placeholder="Email*" value={f.email} onChange={on("email")} data-testid="checkout-email" className="bg-white border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input required placeholder="Phone*" value={f.phone} onChange={on("phone")} data-testid="checkout-phone" className="bg-white border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input required placeholder="City*" value={f.city} onChange={on("city")} data-testid="checkout-city" className="bg-white border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input required placeholder="Delivery address*" value={f.address} onChange={on("address")} data-testid="checkout-address" className="md:col-span-2 bg-white border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input placeholder="Pincode" value={f.pincode} onChange={on("pincode")} data-testid="checkout-pincode" className="bg-white border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input placeholder="Order notes (optional)" value={f.notes} onChange={on("notes")} data-testid="checkout-notes" className="bg-white border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <button disabled={loading} data-testid="checkout-place-order" className="md:col-span-2 mt-2 bg-terracotta-500 hover:bg-terracotta-600 text-white py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-60">
              {loading ? "Placing order…" : "Place Order"}
            </button>
            <p className="md:col-span-2 text-xs text-ink-mute">Online payment integration is being finalized — our team will confirm your order and share payment/delivery details directly.</p>
          </form>

          <div className="lg:col-span-2 border border-cream-200 p-8 h-fit">
            <div className="overline mb-6">Order Summary</div>
            <ul className="divide-y divide-cream-200">
              {items.map(i => (
                <li key={i.id} className="py-4 flex items-center gap-4">
                  {i.image && <img src={i.image} alt="" className="w-14 h-14 object-cover border border-cream-200" />}
                  <div className="flex-1">
                    <div className="text-sm text-ink">{i.name}</div>
                    <div className="text-xs text-ink-mute mt-1">₹{i.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setQty(i.id, i.qty - 1)} data-testid={`qty-minus-${i.id}`} className="p-1 border border-cream-200 hover:border-terracotta-500"><Minus size={12}/></button>
                    <span className="text-sm w-6 text-center">{i.qty}</span>
                    <button type="button" onClick={() => setQty(i.id, i.qty + 1)} data-testid={`qty-plus-${i.id}`} className="p-1 border border-cream-200 hover:border-terracotta-500"><Plus size={12}/></button>
                    <button type="button" onClick={() => remove(i.id)} data-testid={`remove-${i.id}`} className="p-1 text-ink-mute hover:text-terracotta-600"><Trash2 size={14}/></button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-cream-200 flex justify-between font-display text-2xl text-ink"><span>Total</span><span data-testid="checkout-total">₹{total}</span></div>
          </div>
        </div>
      )}
    </section>
  );
}
