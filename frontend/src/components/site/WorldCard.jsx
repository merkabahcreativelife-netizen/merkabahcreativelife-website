import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function WorldCard({ world, size = "md" }) {
  const heights = { sm: "aspect-[4/5]", md: "aspect-[3/4]", lg: "aspect-[4/6]" };
  return (
    <Link to={world.href} data-testid={`world-card-${world.key}`}
      className={`group relative block overflow-hidden bg-stone-900 border border-stone-800 ${heights[size]}`}>
      <img src={world.img} alt={world.name} loading="lazy"
        className="card-media absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <div className="overline mb-2">{world.tagline}</div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl sm:text-3xl leading-tight text-cream-50 group-hover:text-terracotta-400 transition-colors">
            {world.name}
          </h3>
          <ArrowUpRight className="text-cream-50 group-hover:text-terracotta-400 transition-colors mt-1" size={22}/>
        </div>
        <p className="mt-4 text-sm text-stone-300/90 line-clamp-2">{world.desc}</p>
      </div>
    </Link>
  );
}
