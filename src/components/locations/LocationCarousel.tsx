import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { locations, locationOrder } from "../../data/locations";

export default function LocationCarousel({ currentId }: { currentId: string }) {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  return (
    <nav
      aria-label="Jump to another location"
      className="flex items-center gap-3 rounded-lg border border-yellow-900/25 bg-[#0d0d0d] p-3"
    >
      <button
        type="button"
        onClick={() => navigate("/", { state: { openWorld: true } })}
        className="location-label flex shrink-0 items-center gap-2 rounded-md border border-yellow-700/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-yellow-400 transition hover:border-yellow-500 hover:bg-yellow-500/10"
      >
        <ArrowLeft size={14} />
        Back to Map
      </button>

      <div
        ref={scrollerRef}
        className="flex flex-1 gap-2 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        {locationOrder.map((id) => {
          const loc = locations[id];
          const isActive = id === currentId;
          return (
            <button
              key={id}
              type="button"
              onClick={() => navigate(`/locations/${id}`)}
              aria-current={isActive ? "page" : undefined}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition sm:h-20 sm:w-32 ${
                isActive
                  ? "border-yellow-400 shadow-[0_0_16px_rgba(212,175,55,0.6)]"
                  : "border-white/10 hover:border-yellow-600/60"
              }`}
            >
              {loc.heroImage ? (
                <img src={loc.heroImage} alt="" className="h-full w-full object-cover" />
              ) : (
                <div
                  className="h-full w-full"
                  style={{ background: `radial-gradient(circle, ${loc.accentColor}33, #0a0a0a)` }}
                />
              )}
              <span className="absolute inset-x-0 bottom-0 bg-black/75 px-1 py-1 text-[9px] font-semibold uppercase tracking-wide text-white sm:text-[10px]">
                {loc.name}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollerRef.current?.scrollBy({ left: 240, behavior: "smooth" })}
        aria-label="Scroll locations right"
        className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md border border-yellow-700/40 text-yellow-400 transition hover:border-yellow-500 hover:bg-yellow-500/10 sm:flex"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
