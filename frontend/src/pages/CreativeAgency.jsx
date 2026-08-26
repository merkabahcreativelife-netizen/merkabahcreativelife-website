import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { slugify } from "@/data/services";
import { api, formatError } from "@/lib/api";

const PORTFOLIO_FILTERS = {
  "Branding": ["logo","brand","identity"],
  "Digital Marketing": ["marketing","social media","content"],
  "Advertising": ["ad","campaign","media planning"],
  "Websites": ["website","landing","ecommerce","wordpress"],
  "Audio": ["audio","voice","jingle","anthem","sound","mixing","mastering","radio","composition","arrangement","music"],
  "Video": ["video","film","coverage","editing"],
  "Events": ["event","concert","live"],
  "Social Media": ["social"],
  "Photography": ["photo"],
  "Music": ["music","composition","jingle","anthem","arrangement"],
};
import { toast } from "sonner";

const CATS = {
  "Brand Strategy & Consultation": ["Brand Strategy","Brand Positioning","Brand Consultation","Marketing Strategy","Creative Direction","Campaign Planning"],
  "Digital Marketing": ["Digital Marketing Campaigns","Digital Advertising","Social Media Strategy","Social Media Management","Content Marketing","Audience Engagement","Campaign Management"],
  "Branding & Design": ["Logo Design","Brand Identity","Visual Communication","Marketing Collateral","Campaign Design","Social Media Creatives","Presentation Design"],
  "Content & Copy": ["Content Creation","Script Writing","Copywriting","Brand Storytelling","Social Media Content","Promotional Content","Campaign Concepts"],
  "Audio, Voice & Music": ["Voice-over","Dubbing","Radio Production","Jingles","Brand Anthems","Music Composition","Music Arrangement","Sound Design","Mixing & Mastering"],
  "Advertising & Media": ["Digital Ads","Radio Advertising","Newspaper / Print Advertising","Promotional Campaigns","Media Planning","Campaign Creative"],
  "Website Design & Development": ["Website Design","Website Development","Business Websites","Landing Pages","Ecommerce Websites","WordPress Development","Website Content","Website Maintenance"],
  "Photo & Video": ["Photography","Videography","Product Photography","Corporate Photography","Promotional Videos","Social Media Videos","Event Coverage","Video Editing"],
  "Public Relations": ["PR Strategy","Media Outreach","Press Communication","Brand Announcements","Media Relations"],
  "Events & Experiences": ["Event Promotion","Event Management","Concert Promotion","Brand Events","Corporate Events","Live Performances","Live Band Coordination","Artist Coordination"],
  "Translation & Localization": ["Translation Services","Multilingual Content","Advertising Translation","Voice-over Translation","Localization"],
};

const WHY = [
  ["Fresh Ideas","We turn fresh ideas into creative strategies that help brands stand out and capture attention in crowded markets."],
  ["More Growth","By focusing on what truly matters, we help brands grow steadily and create an impact that lasts."],
  ["Good Management","With the right creative team and clear direction, we help brands navigate today's fast-paced business environment."],
];
const PROCESS = [["Discover","Understand the business, audience, goals and challenges."],["Strategize","Develop a creative and strategic direction."],["Create","Produce the content, campaigns, media and experiences."],["Grow","Measure, optimize and improve."]];
const CLIENTS = ["Startups","Small Businesses","Growing Businesses","Established Brands","Artists & Creators","Restaurants & Hospitality","Educational Institutions","Corporate Organizations","Events & Entertainment","Personal Brands"];

export default function CreativeAgency() {
  const [form, setForm] = useState({ name:"", company:"", email:"", phone:"", website:"", industry:"", services:[], description:"", budget:"", timeline:"", heard_from:"" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [projects, setProjects] = useState([]);
  const [pFilter, setPFilter] = useState("All");
  useEffect(() => { api.get("/content/portfolio_projects").then(r => setProjects(r.data)).catch(() => {}); }, []);
  const filteredProjects = pFilter === "All" ? projects : projects.filter(p => {
    const hay = (p.services || []).join(" ").toLowerCase();
    return PORTFOLIO_FILTERS[pFilter]?.some(k => hay.includes(k));
  });

  const toggle = (s) => setForm(f => ({ ...f, services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s] }));
  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await api.post("/agency/enquiry", form); setSubmitted(true); toast.success("Enquiry received."); }
    catch (err) { toast.error(formatError(err.response?.data?.detail) || err.message); }
    finally { setLoading(false); }
  };

  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1787647561794-3835bee16a09?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxjcmVhdGl2ZSUyMHByb2Zlc3Npb25hbCUyMHRlYW0lMjBvZmZpY2UlMjBtZWV0aW5nfGVufDB8fHx8MTc4Nzc2NDkyNnww&ixlib=rb-4.1.0&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/30 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Creative Agency</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-6 max-w-5xl">
            Transform your ideas into brand growth.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
            We combine strategy, creativity, media and technology to help brands stand out, connect with their audiences and grow.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#enquiry" data-testid="agency-cta-start" className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Start a Project</a>
            <a href="#services" data-testid="agency-cta-services" className="border border-cream-300 hover:border-terracotta-500 hover:text-terracotta-400 text-ink px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Explore Services</a>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Our Services</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-16 max-w-3xl">Everything a modern brand needs — under one roof.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(CATS).map(([cat, items], idx) => {
            const accents = ["#7c3aed","#0d9488","#c9a227","#ec4899","#64748b"];
            const c = accents[idx % 5];
            return (
              <div key={cat} className="group border border-silver-200 bg-white p-7 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderTop: `3px solid ${c}` }}>
                <div className="font-body text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: c }}>{String(idx + 1).padStart(2, "0")}</div>
                <Link to={`/creative-agency/services/${slugify(cat)}`} data-testid={`svc-${slugify(cat)}`}
                  className="font-display text-2xl text-ink group-hover:text-terracotta-600 transition-colors leading-snug">{cat}</Link>
                <ul className="mt-5 space-y-1.5 flex-1">
                  {items.map(i => (
                    <li key={i} className="text-ink-mute text-sm flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 shrink-0" style={{ background: c }} />{i}
                    </li>
                  ))}
                </ul>
                <Link to={`/creative-agency/services/${slugify(cat)}`} className="mt-6 text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: c }}>Explore Service →</Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 border-y border-cream-200 bg-cream-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Why Merkabah</div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {WHY.map(([t, d]) => (
              <div key={t} className="border border-silver-200 bg-white p-10 hover:border-terracotta-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="font-display text-3xl text-ink mb-4">{t}</div>
                <p className="text-ink-mute leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Our Creative Process</div>
        <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-14">Discover → Strategize → Create → Grow</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {PROCESS.map(([t, d], i) => {
            const accents = ["#7c3aed","#0d9488","#c9a227","#ec4899"];
            return (
              <div key={t} className="border border-silver-200 bg-white p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ borderTop: `3px solid ${accents[i]}` }}>
                <div className="font-body text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: accents[i] }}>Step {i + 1}</div>
                <div className="font-display text-2xl text-ink mb-3">{t}</div>
                <p className="text-ink-mute text-sm">{d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Who We Work With</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {CLIENTS.map(c => <span key={c} className="border border-silver-200 bg-white px-5 py-3 text-sm text-ink-soft hover:border-terracotta-500 hover:text-ink transition-colors">{c}</span>)}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-silver-200 bg-cream-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Some of Our Clients</div>
          <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-14 max-w-3xl">Trusted by names you know.</h2>
          <div className="space-y-10">
            {[
              ["Jewellery", ["Malabar Gold & Diamonds","Tanishq","Kalyan Jewellers","GRT Jewellers","Joyalukkas"], "#c9a227"],
              ["Automotive", ["Maruti Suzuki","Tata Motors","Hyundai","Nissan India","Mahindra","Honda Dealerships","TVS"], "#7c3aed"],
              ["Finance & Banking", ["Life Insurance Corporation of India","Manappuram Finance","Muthoot Finance","State Bank of India","HDFC Bank"], "#0d9488"],
              ["FMCG & Retail", ["Hindustan Unilever","ITC","Chennai Silks","Poorvika"], "#ec4899"],
            ].map(([cat, names, c]) => (
              <div key={cat}>
                <div className="font-body text-[10px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: c }}>{cat}</div>
                <div className="flex flex-wrap gap-3">
                  {names.map(n => (
                    <span key={n} data-testid={`client-${n.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                      className="border border-silver-200 bg-white px-5 py-3 text-sm font-semibold text-ink hover:shadow-md hover:-translate-y-0.5 transition-all duration-300" style={{ borderLeft: `3px solid ${c}` }}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 border-t border-silver-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Portfolio</div>
          <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-10 max-w-3xl">Selected work from the ecosystem.</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {["All", ...Object.keys(PORTFOLIO_FILTERS)].map(f => (
              <button key={f} onClick={() => setPFilter(f)} data-testid={`portfolio-filter-${f.replace(/ /g, "-")}`}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${pFilter === f ? "bg-terracotta-500 border-terracotta-500 text-white" : "border-silver-200 bg-white text-ink-mute hover:border-terracotta-500"}`}>
                {f}
              </button>
            ))}
          </div>
          {filteredProjects.length === 0 ? (
            <div className="border border-silver-200 bg-white p-12 text-center text-ink-mute">Projects for this category are being documented. Check back soon.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map(p => (
                <Link to={`/creative-agency/work/${p.id}`} key={p.id} data-testid={`project-${p.id}`}
                  className="group border border-silver-200 bg-white p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderTop: "3px solid #7c3aed" }}>
                  <div className="overline mb-2">{p.industry}</div>
                  <div className="font-display text-2xl lg:text-3xl text-ink group-hover:text-terracotta-600 transition-colors">{p.name}</div>
                  <p className="mt-3 text-sm text-ink-mute leading-relaxed line-clamp-2">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(p.services || []).slice(0, 3).map(s => <span key={s} className="text-xs border border-silver-200 px-3 py-1.5 text-ink-mute">{s}</span>)}
                  </div>
                  <div className="mt-6 text-xs uppercase tracking-[0.2em] font-semibold text-terracotta-600">View Case Study →</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="enquiry" className="py-24 lg:py-32 border-t border-cream-200 bg-cream-100/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Start a Project</div>
          <h2 className="font-display text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.05] mb-10">Let's build something meaningful.</h2>
          {submitted ? (
            <div data-testid="agency-enquiry-success" className="border border-terracotta-500/40 p-10">
              <div className="font-display text-3xl text-ink mb-3">Thank you.</div>
              <p className="text-ink-soft">Your project enquiry has been received. Our team will review it and get back to you.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
              {[["name","Name*"],["company","Company / Brand"],["email","Email*","email"],["phone","Phone"],["website","Website"],["industry","Industry"]].map(([k, l, type]) => (
                <input key={k} required={l.endsWith("*")} type={type || "text"} placeholder={l} value={form[k]} onChange={(e) => setForm(f => ({ ...f, [k]: e.target.value }))}
                  data-testid={`agency-field-${k}`}
                  className="bg-transparent border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm text-ink" />
              ))}
              <div className="md:col-span-2">
                <div className="overline mb-3">Services Required (multi-select)</div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(CATS).flat().slice(0, 30).map(s => (
                    <button type="button" key={s} onClick={() => toggle(s)} data-testid={`agency-svc-${s}`}
                      className={`text-xs px-3 py-2 border transition-colors ${form.services.includes(s) ? "bg-terracotta-500 border-terracotta-500 text-white" : "border-cream-200 text-ink-mute hover:border-terracotta-500"}`}>{s}</button>
                  ))}
                </div>
              </div>
              <textarea required placeholder="Project description*" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                data-testid="agency-field-description" rows={4} className="md:col-span-2 bg-transparent border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm text-ink" />
              <input placeholder="Budget range" value={form.budget} onChange={(e) => setForm(f => ({ ...f, budget: e.target.value }))} data-testid="agency-field-budget" className="bg-transparent border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <input placeholder="Timeline" value={form.timeline} onChange={(e) => setForm(f => ({ ...f, timeline: e.target.value }))} data-testid="agency-field-timeline" className="bg-transparent border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <input placeholder="How did you hear about us?" value={form.heard_from} onChange={(e) => setForm(f => ({ ...f, heard_from: e.target.value }))} data-testid="agency-field-heard" className="md:col-span-2 bg-transparent border border-cream-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <button disabled={loading} data-testid="agency-submit" className="md:col-span-2 mt-4 bg-terracotta-500 hover:bg-terracotta-600 text-white py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-60">
                {loading ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
