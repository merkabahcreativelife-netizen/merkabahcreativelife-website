import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, formatError } from "@/lib/api";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("merkabah_token", data.token);
      localStorage.setItem("merkabah_admin", JSON.stringify(data.user));
      nav("/admin/dashboard");
    } catch (err) { toast.error(formatError(err.response?.data?.detail) || err.message); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-md border border-stone-800 p-10">
        <div className="overline mb-2">Merkabah</div>
        <h1 className="font-display text-4xl text-cream-50 mb-8 font-light">Admin Login</h1>
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} data-testid="admin-email" className="w-full mb-4 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm text-cream-50" />
        <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} data-testid="admin-password" className="w-full mb-6 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm text-cream-50" />
        <button disabled={loading} data-testid="admin-submit" className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-60">{loading ? "Signing in…" : "Sign In"}</button>
      </form>
    </div>
  );
}
