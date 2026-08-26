import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

const TABS = [
  { key: "contact_enquiries", label: "Contact" },
  { key: "project_enquiries", label: "Project Enquiries" },
  { key: "trial_classes", label: "Trial Classes" },
  { key: "applications", label: "Applications" },
  { key: "newsletter", label: "Newsletter" },
  { key: "community", label: "Community" },
  { key: "courses", label: "Courses" },
  { key: "events", label: "Events" },
  { key: "podcast_episodes", label: "Podcast" },
  { key: "jobs", label: "Jobs" },
  { key: "products", label: "Products" },
  { key: "articles", label: "Journal" },
];

export default function AdminDashboard() {
  const nav = useNavigate();
  const [tab, setTab] = useState("contact_enquiries");
  const [items, setItems] = useState([]);
  const [me, setMe] = useState(null);
  useEffect(() => {
    api.get("/auth/me").then(r => setMe(r.data)).catch(() => nav("/admin"));
  }, [nav]);
  useEffect(() => {
    if (!me) return;
    api.get(`/admin/${tab}`).then(r => setItems(r.data)).catch(() => setItems([]));
  }, [tab, me]);
  const logout = async () => { await api.post("/auth/logout").catch(() => {}); localStorage.removeItem("merkabah_token"); nav("/admin"); };
  if (!me) return <div className="min-h-screen bg-cream-50" />;
  return (
    <div className="min-h-screen bg-cream-50 text-ink">
      <header className="border-b border-cream-200 px-6 lg:px-10 py-6 flex justify-between items-center">
        <div><div className="overline">Merkabah Admin</div><div className="font-display text-2xl">Welcome, {me.name}</div></div>
        <button onClick={logout} data-testid="admin-logout" className="text-xs uppercase tracking-[0.2em] border border-cream-200 hover:border-terracotta-500 px-4 py-2">Sign Out</button>
      </header>
      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-cream-200 p-6 lg:min-h-[calc(100vh-88px)]">
          <div className="overline mb-4">Collections</div>
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} data-testid={`admin-tab-${t.key}`}
                className={`text-left px-3 py-2 text-sm whitespace-nowrap transition-colors ${tab === t.key ? "bg-terracotta-500/20 text-terracotta-400 border-l-2 border-terracotta-500" : "text-ink-mute hover:text-white"}`}>
                {t.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="p-6 lg:p-10">
          <div className="flex justify-between items-center mb-8"><h2 className="font-display text-3xl">{TABS.find(t => t.key === tab)?.label} ({items.length})</h2></div>
          <div className="border border-cream-200 divide-y divide-cream-200">
            {items.length === 0 ? <div className="p-6 text-ink-mute text-sm">No records yet.</div> :
              items.map(i => (
                <div key={i.id} className="p-5 grid md:grid-cols-4 gap-3 text-sm hover:bg-cream-100/40 transition-colors">
                  <div className="text-ink font-display text-lg">{i.name || i.title || i.full_name || i.email || i.id?.slice(0, 8)}</div>
                  <div className="text-ink-mute">{i.email || i.venue || i.category || i.department || ""}</div>
                  <div className="text-ink-mute truncate">{i.message || i.description || i.excerpt || i.enquiry_type || i.area || ""}</div>
                  <div className="text-ink-mute text-xs">{i.created_at?.slice(0, 10)}</div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
