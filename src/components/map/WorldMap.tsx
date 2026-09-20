import { useEffect, useRef, useState } from "react";
import { mapLocations } from "../../data/mapLocations";
import MapHotspot from "./MapHotspot";
import MapLegend from "./MapLegend";
import MapControls from "./MapControls";
import "./WorldMap.css";

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.35;
const clamp = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

export default function WorldMap() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const handleReset = () => {
    setZoom(1);
    scrollRef.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const handleToggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {
        // Fullscreen may be unavailable (e.g. iOS Safari) — controls still
        // work, the button just won't visibly do anything in that case.
      });
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <section
      id="world"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-b from-black via-[#0b0b0b] to-black px-4 py-16 text-white sm:px-8"
    >
      {/* Title */}
      <header className="mb-8 animate-[fade-in_0.8s_ease-out] text-center sm:mb-10">
        <h1 className="map-title text-4xl font-bold tracking-[0.15em] text-[#f5e6c8] sm:text-5xl lg:text-6xl">
          GAME OF THRONES
        </h1>
        <p className="mt-3 text-[11px] uppercase tracking-[0.5em] text-yellow-500 sm:text-sm">
          A Song of Ice and Fire
        </p>
        <div className="mx-auto mt-5 h-[2px] w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      </header>

      {/* Map frame: fullscreen target + anchor for legend/controls, which
          stay fixed in the corners regardless of internal zoom/scroll. */}
      <div
        ref={frameRef}
        className="relative mx-auto rounded-lg border border-yellow-800/30 bg-black shadow-[0_0_60px_rgba(0,0,0,0.65)]"
        style={{
          // The map is aspect-ratio locked at 3:2, so width and height fight
          // for the same space — cap width by whichever runs out first: the
          // viewport's width, its height (converted through the 1.5 ratio,
          // with room left for the header/hint text), or a sane absolute max.
          width: "min(1800px, 94vw, 123vh)",
        }}
      >
        {/* Scrollable viewport (mobile pans/scrolls instead of shrinking) */}
        <div ref={scrollRef} className="overflow-auto rounded-lg">
          <div
            className="relative mx-auto transition-[width] duration-300 ease-out"
            style={{
              aspectRatio: "1536 / 1024",
              width: `max(640px, ${zoom * 100}%)`,
            }}
          >
            <img
              src="/images/the_world.jpg"
              alt="Map of the known world — Westeros and Essos"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
              draggable={false}
            />

            {mapLocations.map((location, index) => (
              <MapHotspot
                key={location.id}
                location={location}
                phase={(index % 4) as 0 | 1 | 2 | 3}
              />
            ))}
          </div>
        </div>

        <MapLegend />
        <MapControls
          onZoomIn={() => setZoom((z) => clamp(z + ZOOM_STEP))}
          onZoomOut={() => setZoom((z) => clamp(z - ZOOM_STEP))}
          onReset={handleReset}
          onToggleFullscreen={handleToggleFullscreen}
          isFullscreen={isFullscreen}
        />
      </div>

      <p className="mt-5 text-center text-[11px] uppercase tracking-[0.3em] text-gray-500">
        Hover a sigil to preview a realm · click to explore its chronicle
      </p>
    </section>
  );
}
