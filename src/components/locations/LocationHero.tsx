import { useRef, type MouseEvent } from "react";
import type { LocationData } from "../../data/locations";

function isImagePath(sigil?: string) {
  return !!sigil && sigil.startsWith("/");
}

/**
 * Large cinematic hero photo. Falls back to a themed gradient + sigil card
 * when a location doesn't have a hero image yet (e.g. King's Landing),
 * rather than showing a broken image.
 *
 * Includes a restrained mouse-parallax on the image — the same lightweight
 * "tilt toward the cursor" idea already used on character portraits
 * elsewhere in this app, just toned down to a few pixels of drift.
 */
export default function LocationHero({ location }: { location: LocationData }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `scale(1.04) translate(${px * -10}px, ${py * -10}px)`;
  };

  const handleMouseLeave = () => {
    if (wrapRef.current) wrapRef.current.style.transform = "";
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-yellow-900/25 bg-black"
      style={{
        // Size the box by the hero photo's own aspect ratio (matches the
        // 1128x844 crop used for every location) instead of a fixed
        // viewport-height box, so object-cover never has to zoom into /
        // crop out parts of the image to fill a mismatched shape. The
        // max-height is just a safety cap for very wide/short viewports —
        // object-contain below means it letterboxes rather than crops if
        // that cap ever actually binds.
        aspectRatio: "1128 / 844",
        maxHeight: "72vh",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {location.heroImage ? (
        <div
          ref={wrapRef}
          className="h-full w-full transition-transform duration-500 ease-out will-change-transform"
        >
          <img
            src={location.heroImage}
            alt={`${location.name} — ${location.region}`}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-4 text-center"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${location.accentColor}22 0%, #0a0a0a 70%)`,
          }}
        >
          {isImagePath(location.sigil) ? (
            <img
              src={location.sigil}
              alt=""
              className="h-20 w-20 rounded-full border object-cover opacity-80"
              style={{ borderColor: location.accentColor }}
            />
          ) : (
            <span className="text-6xl">{location.sigil}</span>
          )}
          <p className="location-label px-6 text-xs uppercase tracking-[0.3em] text-gray-500">
            Chronicle illustration coming soon
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
    </div>
  );
}
