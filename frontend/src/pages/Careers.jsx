import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const DEPTS = ["Creative Production","Audio","Music","Video","Marketing","Social Media","Graphic Design","Events","Operations","Business Development","Technology","Content","Podcast","Wellness"];
const TYPES = ["Full-Time","Part-Time","Internships","Freelance","Apprenticeships","Volunteer / Community"];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => { api.get("/content/jobs").then(r => setJobs(r.data)).catch(() => {}); }, []);
  return (
    <>
      <section className="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline">Merkabah Careers</div>
        <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-4 max-w-5xl">Create your next chapter with Merkabah.</h1>
        <p className="mt-8 max-w-2xl text-lg text-stone-300">We're building a creative ecosystem — and we're looking for curious people to build it with us.</p>
      </section>
      <section className="pb-16 max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
        <div>
          <div className="overline mb-3">Employment Types</div>
          <div className="flex flex-wrap gap-2">{TYPES.map(t => <span key={t} className="text-xs border border-stone-800 px-3 py-2 text-stone-300">{t}</span>)}</div>
        </div>
        <div>
          <div className="overline mb-3">Departments</div>
          <div className="flex flex-wrap gap-2">{DEPTS.map(d => <span key={d} className="text-xs border border-stone-800 px-3 py-2 text-stone-300">{d}</span>)}</div>
        </div>
      </section>
      <section className="py-16 border-t border-stone-900 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-6">Open Positions</div>
        {jobs.length === 0 ? (
          <div className="border border-stone-800 p-10 text-center"><p className="text-stone-400">We're between hires. Interested in joining anyway? <Link to="/careers/internships" className="text-terracotta-400 hover:text-terracotta-300 underline">Send us your details</Link>.</p></div>
        ) : (
          <ul className="divide-y divide-stone-800">
            {jobs.map(j => (
              <li key={j.id}>
                <Link to={`/careers/job/${j.id}`} data-testid={`job-${j.id}`} className="py-6 flex items-center justify-between group">
                  <div><div className="font-display text-xl text-cream-50 group-hover:text-terracotta-400 transition-colors">{j.title}</div><div className="text-stone-500 text-sm mt-1">{j.department} · {j.employment_type} · {j.location}</div></div>
                  <span className="text-terracotta-400 text-xs uppercase tracking-[0.2em]">View →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Link to="/careers/internships" data-testid="internships-cta" className="mt-14 inline-block bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-8 py-4 text-xs uppercase tracking-[0.25em]">Apply for an Internship</Link>
      </section>
    </>
  );
}
