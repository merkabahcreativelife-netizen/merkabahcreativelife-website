import { useState } from "react";
import { api, formatError } from "@/lib/api";
import { toast } from "sonner";

export default function Community() {
  const [f, setF] = useState({ name: "", email: "", interest: "", city: "" });
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    try { await api.post("/community/join", f); setDone(true); toast.success("Welcome to the Merkabah journey."); }
    catch (err) { toast.error(formatError(err.response?.data?.detail) || err.message); }
  };
  return (
    <section className="pt-24 pb-24 max-w-4xl mx-auto px-6 lg:px-8">
      <div className="overline">The Merkabah Community</div>
      <h1 className="font-display font-light text-5xl sm:text-7xl leading-[0.95] tracking-tighter text-cream-50 mt-4">There's a place for you in the Merkabah journey.</h1>
      <p className="mt-8 text-stone-300 text-lg max-w-2xl">Artists, musicians, students, creators, educators, professionals, entrepreneurs, wellness practitioners and curious minds — join our community.</p>
      {done ? <div data-testid="community-success" className="mt-10 border border-terracotta-500/40 p-8"><p className="text-cream-50 font-display text-2xl">Welcome home.</p></div> :
        <form onSubmit={submit} className="mt-10 grid md:grid-cols-2 gap-4">
          <input required placeholder="Name*" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} data-testid="community-name" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
          <input required type="email" placeholder="Email*" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} data-testid="community-email" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
          <input placeholder="Interest" value={f.interest} onChange={e => setF({ ...f, interest: e.target.value })} data-testid="community-interest" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
          <input placeholder="City" value={f.city} onChange={e => setF({ ...f, city: e.target.value })} data-testid="community-city" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
          <button data-testid="community-submit" className="md:col-span-2 mt-4 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 py-4 text-xs uppercase tracking-[0.25em]">Become Part of Merkabah</button>
        </form>}
    </section>
  );
}
