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
    <footer data-testid="site-footer" className="bg-neutral-950 text-white pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="overline mb-4" style={{ color: "#a78bfa" }}>Beyond Imagination</div>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-none text-white font-light">
            Create. Learn.<br/>Experience. Grow.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-neutral-800 pt-14">
          <div>
            <div className="font-body text-[10px] tracking-[0.28em] uppercase text-gold-400 font-bold mb-4">Explore</div>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li><Link to="/creative-agency" className="hover:text-violet-300 transition-colors">Creative Agency</Link></li>
              <li><Link to="/studios" className="hover:text-violet-300 transition-colors">Studios</Link></li>
              <li><Link to="/academy" className="hover:text-violet-300 transition-colors">Academy</Link></li>
              <li><Link to="/live" className="hover:text-violet-300 transition-colors">Live</Link></li>
              <li><Link to="/courses" className="hover:text-violet-300 transition-colors">Courses</Link></li>
              <li><Link to="/podcast" className="hover:text-violet-300 transition-colors">Podcast</Link></li>
              <li><Link to="/wellness" className="hover:text-violet-300 transition-colors">Wellness</Link></li>
              <li><Link to="/careers" className="hover:text-violet-300 transition-colors">Careers</Link></li>
              <li><Link to="/store" className="hover:text-violet-300 transition-colors">Store</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-body text-[10px] tracking-[0.28em] uppercase text-teal-400 font-bold mb-4">Company</div>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li><Link to="/about" className="hover:text-violet-300 transition-colors">About</Link></li>
              <li><Link to="/journal" className="hover:text-violet-300 transition-colors">Journal</Link></li>
              <li><Link to="/community" className="hover:text-violet-300 transition-colors">Community</Link></li>
              <li><Link to="/contact" className="hover:text-violet-300 transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-violet-300 transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-body text-[10px] tracking-[0.28em] uppercase text-pink-400 font-bold mb-4">Legal</div>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li><Link to="/privacy" className="hover:text-violet-300 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-violet-300 transition-colors">Terms</Link></li>
              <li><Link to="/refund" className="hover:text-violet-300 transition-colors">Refund Policy</Link></li>
              <li><Link to="/shipping" className="hover:text-violet-300 transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-body text-[10px] tracking-[0.28em] uppercase text-silver-300 font-bold mb-4">Stay in the Merkabah</div>
            <form onSubmit={subscribe} className="flex flex-col gap-3">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" data-testid="footer-newsletter-email"
                className="bg-white/5 border border-neutral-800 focus:border-violet-400 outline-none px-4 py-3 text-sm text-white placeholder-neutral-500" />
              <button disabled={loading} data-testid="footer-newsletter-submit"
                className="bg-violet-600 hover:bg-violet-500 text-white py-3 text-xs uppercase tracking-[0.2em] transition-colors disabled:opacity-60">
                {loading ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-500">
          <div>© 2026 Merkabah Creative Life. All rights reserved.</div>
          <div className="font-body text-[10px] tracking-[0.28em] uppercase" style={{ color: "#a78bfa" }}>Beyond Imagination</div>
        </div>
      </div>
    </footer>
  );
}
