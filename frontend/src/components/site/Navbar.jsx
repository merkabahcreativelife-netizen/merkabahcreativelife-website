import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { WORLDS } from "@/data/worlds";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/creative-agency", label: "Creative Agency" },
  { to: "/studios", label: "Studios" },
  { to: "/academy", label: "Academy" },
  { to: "/live", label: "Live" },
  { to: "/courses", label: "Courses" },
  { to: "/podcast", label: "Podcast" },
  { to: "/wellness", label: "Wellness" },
  { to: "/careers", label: "Careers" },
  { to: "/store", label: "Store" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [worlds, setWorlds] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); setWorlds(false); }, [loc.pathname]);

  return (
    <>
      <header
        data-testid="site-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled ? "bg-cream-50/85 backdrop-blur-xl border-b border-cream-200" : "bg-cream-50/40 backdrop-blur-md"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <Link to="/" data-testid="nav-logo" className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight text-ink">Merkabah</span>
            <span className="overline mt-0.5">Creative Life</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            <div className="relative" onMouseEnter={() => setWorlds(true)} onMouseLeave={() => setWorlds(false)}>
              <button data-testid="nav-worlds-toggle" className="nav-link text-sm text-ink-soft tracking-wide font-body">Our Worlds</button>
              {worlds && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[880px]">
                  <div className="bg-cream-50 border border-cream-200 p-8 grid grid-cols-3 gap-6">
                    {WORLDS.map((w) => (
                      <Link key={w.key} to={w.href} data-testid={`mega-${w.key}`}
                        className="group block">
                        <div className="overline mb-1 group-hover:text-terracotta-400 transition-colors">{w.tagline}</div>
                        <div className="font-display text-lg text-ink group-hover:text-terracotta-400 transition-colors">{w.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {["/about", "/creative-agency", "/academy", "/live", "/careers", "/store", "/contact"].map((to) => {
              const item = NAV.find(n => n.to === to);
              return (
                <NavLink key={to} to={to} data-testid={`nav-${to.replace("/","")||"home"}`}
                  className={({isActive}) => `nav-link text-sm tracking-wide font-body ${isActive ? "active text-terracotta-400" : "text-ink-soft"}`}>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/search" data-testid="nav-search" className="hidden sm:flex text-ink-soft hover:text-terracotta-400 transition-colors">
              <Search size={18} />
            </Link>
            <Link to="/creative-agency#enquiry" data-testid="nav-cta"
              className="hidden md:inline-block bg-terracotta-500 hover:bg-terracotta-600 text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-body transition-colors">
              Start a Project
            </Link>
            <button data-testid="nav-mobile-open" onClick={() => setOpen(true)} className="lg:hidden text-ink p-2">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div data-testid="mobile-menu" className="fixed inset-0 z-[60] bg-cream-50 overflow-y-auto">
          <div className="flex items-center justify-between px-6 h-20 border-b border-cream-200">
            <span className="font-display text-lg text-ink">Merkabah</span>
            <button data-testid="nav-mobile-close" onClick={() => setOpen(false)} className="text-ink p-2"><X size={24}/></button>
          </div>
          <div className="px-6 py-10 flex flex-col gap-4">
            {NAV.map((n, i) => (
              <NavLink key={n.to} to={n.to} data-testid={`m-nav-${n.to.replace("/","")||"home"}`}
                className="font-display text-4xl text-ink hover:text-terracotta-400 reveal"
                style={{ animationDelay: `${i * 40}ms` }}>
                {n.label}
              </NavLink>
            ))}
            <Link to="/creative-agency#enquiry" data-testid="m-nav-cta"
              className="mt-8 bg-terracotta-500 text-white py-4 text-center text-xs uppercase tracking-[0.25em]">Start a Project</Link>
          </div>
        </div>
      )}
    </>
  );
}
