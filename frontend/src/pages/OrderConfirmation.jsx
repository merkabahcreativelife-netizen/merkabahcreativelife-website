import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/orders/${id}`).then(r => setOrder(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="min-h-[60vh]" />;
  if (!order) return <div className="pt-32 pb-24 text-center text-ink-mute">Order not found.</div>;
  return (
    <section className="pt-24 pb-24 max-w-3xl mx-auto px-6 lg:px-8 text-center">
      <CheckCircle2 size={56} className="mx-auto text-terracotta-500" />
      <div className="overline mt-6">Order Received</div>
      <h1 className="font-display font-light text-4xl sm:text-6xl leading-[0.95] tracking-tighter text-ink mt-3">Thank you, {order.customer_name?.split(" ")[0]}.</h1>
      <p className="mt-6 text-ink-mute text-lg">Your order <span className="text-ink font-semibold" data-testid="order-number">{order.order_no}</span> has been received. Our team will reach out shortly to confirm payment and delivery.</p>
      <div className="mt-12 border border-cream-200 p-8 text-left">
        <div className="overline mb-4">Order Summary</div>
        <ul className="divide-y divide-cream-200">
          {order.items?.map(i => (
            <li key={i.id} className="py-3 flex justify-between text-sm"><span className="text-ink">{i.name} × {i.qty}</span><span className="text-ink-mute">₹{i.price * i.qty}</span></li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-cream-200 flex justify-between font-display text-2xl text-ink"><span>Total</span><span>₹{order.total}</span></div>
        <div className="mt-4 text-xs text-ink-mute">Status: {order.status} · Confirmation sent to {order.email}</div>
      </div>
      <Link to="/store" data-testid="order-continue" className="mt-10 inline-block bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Continue Shopping</Link>
    </section>
  );
}
