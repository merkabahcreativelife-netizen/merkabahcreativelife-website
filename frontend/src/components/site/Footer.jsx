import { Link } from "react-router-dom";
import { useState } from "react";
import { api, formatError } from "@/lib/api";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/newsletter", { email });
      toast.success("Welcome to the Merkabah journey.");
      setEmail("");
    } catch (err) {
      toast.error(formatError(err.response?.data?.detail) || err.message);
    } finally { setLoading(false); }
  };

  return (
    <footer data-testid="site-footer" className="bg-cream-50 border-t border-cream-200 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="overline mb-4">Beyond Imagination</div>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-none text-ink font-light">
            Create. Learn.<br/>Experience. Grow.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-cream-200 pt-14">
          <div>
            <div className="overline mb-4">Explore</div>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li><Link to="/creative-agency" className="hover:text-terracotta-400">Creative Agency</Link></li>
              <li><Link to="/studios" className="hover:text-terracotta-400">Studios</Link></li>
              <li><Link to="/academy" className="hover:text-terracotta-400">Academy</Link></li>
              <li><Link to="/live" className="hover:text-terracotta-400">Live</Link></li>
              <li><Link to="/courses" className="hover:text-terracotta-400">Courses</Link></li>
              <li><Link to="/podcast" className="hover:text-terracotta-400">Podcast</Link></li>
              <li><Link to="/wellness" className="hover:text-terracotta-400">Wellness</Link></li>
              <li><Link to="/careers" className="hover:text-terracotta-400">Careers</Link></li>
              <li><Link to="/store" className="hover:text-terracotta-400">Store</Link></li>
            </ul>
          </div>
          <div>
            <div className="overline mb-4">Company</div>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li><Link to="/about" className="hover:text-terracotta-400">About</Link></li>
              <li><Link to="/journal" className="hover:text-terracotta-400">Journal</Link></li>
              <li><Link to="/community" className="hover:text-terracotta-400">Community</Link></li>
              <li><Link to="/contact" className="hover:text-terracotta-400">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-terracotta-400">Admin</Link></li>
            </ul>
          </div>
          <div>
            <div className="overline mb-4">Legal</div>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li><Link to="/privacy" className="hover:text-terracotta-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-terracotta-400">Terms</Link></li>
              <li><Link to="/refund" className="hover:text-terracotta-400">Refund Policy</Link></li>
              <li><Link to="/shipping" className="hover:text-terracotta-400">Shipping Policy</Link></li>
            </ul>
          </div>
          <div>
            <div className="overline mb-4">Stay in the Merkabah</div>
            <form onSubmit={subscribe} className="flex flex-col gap-3">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" data-testid="footer-newsletter-email"
                className="bg-transparent border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3 text-sm text-ink" />
              <button disabled={loading} data-testid="footer-newsletter-submit"
                className="bg-terracotta-500 hover:bg-terracotta-600 text-white py-3 text-xs uppercase tracking-[0.2em] transition-colors disabled:opacity-60">
                {loading ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-ink-mute">
          <div>© 2026 Merkabah Creative Life. All rights reserved.</div>
          <div className="overline">Beyond Imagination</div>
        </div>
      </div>
    </footer>
  );
}
