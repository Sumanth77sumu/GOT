import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MapLocation } from "../../data/mapLocations";
import MapTooltip from "./MapTooltip";

/**
 * A single clickable hotspot on the world map.
 *
 * The small marker dot pulses gently at all times (so the map reads as
 * "interactive" without the user having to discover hotspots blindly), but
 * the name/house/region card only appears on hover or keyboard focus — a
 * native <button> gives us keyboard activation (Enter/Space) and focus
 * styling for free.
 */
export default function MapHotspot({
  location,
  phase,
}: {
  location: MapLocation;
  phase: 0 | 1 | 2 | 3;
}) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const ariaLabel = [
    location.name,
    location.house,
    location.region,
    "— click to explore",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <button
      type="button"
      onClick={() => navigate(location.route)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label={ariaLabel}
      className="group absolute z-40 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center outline-none"
      style={{ left: `${location.x}%`, top: `${location.y}%` }}
    >
      {/* Always-on ambient marker */}
      <span
        data-phase={phase}
        className={`map-marker-dot h-2.5 w-2.5 rounded-full border border-yellow-300/80 bg-yellow-400/90 transition-transform duration-300 group-hover:scale-150 group-focus-visible:scale-150 ${
          active ? "scale-150" : ""
        }`}
      />

      {/* Focus ring for keyboard users */}
      <span className="absolute h-7 w-7 rounded-full ring-0 ring-yellow-400/60 transition-all duration-200 group-focus-visible:ring-2" />

      {active && <MapTooltip location={location} />}
    </button>
  );
}
