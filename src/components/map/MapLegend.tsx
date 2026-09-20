import { useState } from "react";
import { MapPin } from "lucide-react";

const LEGEND_ITEMS: { label: string; swatch: string }[] = [
  { label: "Location", swatch: "bg-yellow-400 border-yellow-200" },
  { label: "Kingdom / House", swatch: "bg-red-500/80 border-red-300" },
  { label: "Major City", swatch: "bg-amber-600/80 border-amber-300" },
  { label: "Region", swatch: "bg-slate-400/70 border-slate-200" },
];

/**
 * Compact by default — a small pill that expands into the full legend on
 * hover/focus, instead of a permanently large panel eating map real estate
 * (and, at some viewport sizes, crowding the Dorne hotspot beside it).
 */
export default function MapLegend() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="absolute bottom-3 left-3 z-20 sm:bottom-4 sm:left-4"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <div className="map-tooltip absolute bottom-full left-0 mb-2 w-48 rounded-md border border-yellow-700/40 bg-black/90 p-3 shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          <ul className="space-y-1.5">
            {LEGEND_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-[11px] text-gray-300">
                <span className={`h-2 w-2 shrink-0 rounded-full border ${item.swatch}`} />
                {item.label}
              </li>
            ))}
            <li className="flex items-center gap-2 text-[11px] text-gray-300">
              <span className="h-0 w-3 shrink-0 border-t border-dashed border-yellow-600/70" />
              Road / Route
            </li>
          </ul>
        </div>
      )}

      <button
        type="button"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        aria-label="Map legend"
        className="flex items-center gap-1.5 rounded-md border border-yellow-700/40 bg-black/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-yellow-400 shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-sm transition hover:border-yellow-500 hover:bg-black/95"
      >
        <MapPin size={12} />
        Legend
      </button>
    </div>
  );
}
