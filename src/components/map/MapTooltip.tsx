import type { MapLocation } from "../../data/mapLocations";

function isImagePath(sigil?: string) {
  return !!sigil && sigil.startsWith("/");
}

/**
 * Fantasy tooltip shown near a hovered/focused hotspot. Position is clamped
 * with simple percentage-based heuristics (flip below when too close to the
 * top edge, hug left/right instead of centering when too close to a side)
 * so it never spills outside the map frame.
 */
export default function MapTooltip({ location }: { location: MapLocation }) {
  const showBelow = location.y < 18;
  const hugLeft = location.x < 14;
  const hugRight = location.x > 86;

  const horizontal = hugLeft
    ? "left-0 translate-x-0"
    : hugRight
      ? "left-auto right-0 translate-x-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      role="tooltip"
      className={`map-tooltip pointer-events-none absolute z-30 w-56 rounded-md border border-yellow-600/40 bg-black/90 px-4 py-3 text-left shadow-[0_0_30px_rgba(0,0,0,0.6)] backdrop-blur-sm ${horizontal} ${
        showBelow ? "top-full mt-3" : "bottom-full mb-3"
      }`}
    >
      <div className="flex items-center gap-2">
        {location.sigil &&
          (isImagePath(location.sigil) ? (
            <img
              src={location.sigil}
              alt=""
              className="h-6 w-6 rounded-full border border-yellow-500/50 object-cover"
            />
          ) : (
            <span className="text-lg leading-none">{location.sigil}</span>
          ))}
        <p className="font-serif text-sm font-bold uppercase tracking-wider text-yellow-400">
          {location.name}
        </p>
      </div>

      {location.house && (
        <p className="mt-1 text-xs uppercase tracking-wide text-gray-300">{location.house}</p>
      )}
      <p className="text-xs uppercase tracking-wide text-gray-500">{location.region}</p>

      <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-500">
        Click to explore
        <span aria-hidden="true">→</span>
      </p>

      {/* Little pointer nub */}
      <span
        aria-hidden="true"
        className={`absolute h-2 w-2 rotate-45 border border-yellow-600/40 bg-black/90 ${
          hugLeft ? "left-4" : hugRight ? "right-4" : "left-1/2 -translate-x-1/2"
        } ${showBelow ? "-top-1 border-b-0 border-r-0" : "-bottom-1 border-l-0 border-t-0"}`}
      />
    </div>
  );
}
