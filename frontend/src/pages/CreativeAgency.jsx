import { useState } from "react";
import { api, formatError } from "@/lib/api";
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
        <img src="https://images.unsplash.com/photo-1693159682618-074078ed271e?crop=entropy&cs=srgb&fm=jpg&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Creative Agency</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-6 max-w-5xl">
            Transform your ideas into brand growth.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-stone-300 leading-relaxed">
            We combine strategy, creativity, media and technology to help brands stand out, connect with their audiences and grow.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#enquiry" data-testid="agency-cta-start" className="bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Start a Project</a>
            <a href="#services" data-testid="agency-cta-services" className="border border-stone-600 hover:border-terracotta-500 hover:text-terracotta-400 text-cream-50 px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">Explore Services</a>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Our Services</div>
        <h2 className="font-display text-4xl lg:text-6xl text-cream-50 font-light tracking-tight leading-[1.05] mb-16 max-w-3xl">Everything a modern brand needs — under one roof.</h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {Object.entries(CATS).map(([cat, items]) => (
            <div key={cat}>
              <div className="font-display text-2xl text-cream-50 mb-4 pb-3 border-b border-stone-800">{cat}</div>
              <ul className="space-y-2">
                {items.map(i => <li key={i} className="text-stone-400 text-sm hover:text-terracotta-400 transition-colors">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 border-y border-stone-900 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Why Merkabah</div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {WHY.map(([t, d]) => (
              <div key={t} className="border border-stone-800 p-10 hover:border-terracotta-500 transition-colors">
                <div className="font-display text-3xl text-cream-50 mb-4">{t}</div>
                <p className="text-stone-400 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Our Creative Process</div>
        <h2 className="font-display text-4xl lg:text-6xl text-cream-50 font-light tracking-tight leading-[1.05] mb-14">Discover → Strategize → Create → Grow</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {PROCESS.map(([t, d], i) => (
            <div key={t} className="border border-stone-800 p-8">
              <div className="overline mb-3 text-terracotta-500">Step {i + 1}</div>
              <div className="font-display text-2xl text-cream-50 mb-3">{t}</div>
              <p className="text-stone-400 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Who We Work With</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {CLIENTS.map(c => <span key={c} className="border border-stone-800 px-5 py-3 text-sm text-stone-300">{c}</span>)}
          </div>
        </div>
      </section>

      <section id="enquiry" className="py-24 lg:py-32 border-t border-stone-900 bg-stone-900/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Start a Project</div>
          <h2 className="font-display text-4xl lg:text-6xl text-cream-50 font-light tracking-tight leading-[1.05] mb-10">Let's build something meaningful.</h2>
          {submitted ? (
            <div data-testid="agency-enquiry-success" className="border border-terracotta-500/40 p-10">
              <div className="font-display text-3xl text-cream-50 mb-3">Thank you.</div>
              <p className="text-stone-300">Your project enquiry has been received. Our team will review it and get back to you.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
              {[["name","Name*"],["company","Company / Brand"],["email","Email*","email"],["phone","Phone"],["website","Website"],["industry","Industry"]].map(([k, l, type]) => (
                <input key={k} required={l.endsWith("*")} type={type || "text"} placeholder={l} value={form[k]} onChange={(e) => setForm(f => ({ ...f, [k]: e.target.value }))}
                  data-testid={`agency-field-${k}`}
                  className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm text-cream-50" />
              ))}
              <div className="md:col-span-2">
                <div className="overline mb-3">Services Required (multi-select)</div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(CATS).flat().slice(0, 30).map(s => (
                    <button type="button" key={s} onClick={() => toggle(s)} data-testid={`agency-svc-${s}`}
                      className={`text-xs px-3 py-2 border transition-colors ${form.services.includes(s) ? "bg-terracotta-500 border-terracotta-500 text-cream-50" : "border-stone-800 text-stone-400 hover:border-terracotta-500"}`}>{s}</button>
                  ))}
                </div>
              </div>
              <textarea required placeholder="Project description*" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                data-testid="agency-field-description" rows={4} className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm text-cream-50" />
              <input placeholder="Budget range" value={form.budget} onChange={(e) => setForm(f => ({ ...f, budget: e.target.value }))} data-testid="agency-field-budget" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <input placeholder="Timeline" value={form.timeline} onChange={(e) => setForm(f => ({ ...f, timeline: e.target.value }))} data-testid="agency-field-timeline" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <input placeholder="How did you hear about us?" value={form.heard_from} onChange={(e) => setForm(f => ({ ...f, heard_from: e.target.value }))} data-testid="agency-field-heard" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <button disabled={loading} data-testid="agency-submit" className="md:col-span-2 mt-4 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-60">
                {loading ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
