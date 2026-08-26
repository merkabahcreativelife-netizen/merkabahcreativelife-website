import { X } from "lucide-react";
import { INSTRUMENTS } from "@/data/worlds";

export default function AdmissionPopup({ onClose, onExplore }) {
  return (
    <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose} data-testid="academy-popup">
      <div onClick={e => e.stopPropagation()} className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden reveal">
        <button onClick={onClose} data-testid="academy-popup-close" className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-ink shadow-md transition-colors">
          <X size={18} />
        </button>

        <div className="grid grid-cols-3 h-40">
          {[INSTRUMENTS.piano.img, INSTRUMENTS.vocals.img, INSTRUMENTS.guitar.img].map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(109,40,217,0.35)", mixBlendMode: "multiply" }} />
            </div>
          ))}
        </div>

        <div className="px-8 py-8 text-center">
          <div className="overline mb-2">Merkabah Academy of Music · Electronic City</div>
          <div className="font-display font-black text-5xl sm:text-6xl tracking-tighter leading-none text-violet-700">ADMISSIONS<br/>OPEN</div>
          <div className="font-display italic text-4xl mt-3" style={{ color: "#ec4899" }}>Join Now!</div>

          <p className="mt-5 text-ink font-semibold">Ready for a world-class music education?</p>
          <p className="mt-2 text-sm text-ink-soft font-semibold">
            International Certifications · RSL · Trinity · ABRSM<br/>
            Foundation Programs ● Expert Guidance ● Master Rhythm ● Perform on Stage
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["Beginners", "Intermediate", "Advanced", "Offline · Online"].map((l, i) => (
              <span key={l} className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] ${i % 2 === 0 ? "bg-violet-700 text-white" : "border border-violet-700 text-violet-700"}`}>{l}</span>
            ))}
          </div>

          <p className="mt-5 text-sm text-ink-mute">Enroll today. Spots are limited — thank yourself later.</p>

          <button onClick={onExplore} data-testid="academy-popup-cta"
            className="mt-6 w-full bg-violet-700 hover:bg-violet-600 text-white py-4 text-xs uppercase tracking-[0.25em] font-bold transition-colors">
            Book Your Free Trial Class
          </button>
        </div>
      </div>
    </div>
  );
}
