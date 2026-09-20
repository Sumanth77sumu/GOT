import { Crown } from "lucide-react";
import type { LocationData } from "../../data/locations";

function isImagePath(sigil?: string) {
  return !!sigil && sigil.startsWith("/");
}

export default function LocationInfo({ location }: { location: LocationData }) {
  return (
    <aside
      className="flex h-full flex-col rounded-lg border border-yellow-900/25 bg-[#0d0d0d] p-6"
      style={{ boxShadow: `inset 0 0 60px ${location.accentColor}14` }}
    >
      {/* Sigil banner */}
      <div className="mb-5 flex items-center gap-3">
        {isImagePath(location.sigil) ? (
          <img
            src={location.sigil}
            alt=""
            className="h-14 w-14 shrink-0 rounded-full border-2 object-cover"
            style={{ borderColor: location.accentColor }}
          />
        ) : (
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-2xl"
            style={{ borderColor: location.accentColor }}
          >
            {location.sigil}
          </span>
        )}
        <div>
          <p className="location-label text-sm font-bold uppercase tracking-[0.15em] text-white">
            {location.house}
          </p>
          <p className="text-xs uppercase tracking-wide text-gray-500">{location.region}</p>
        </div>
      </div>

      <p
        className="location-label mb-4 text-xs font-semibold uppercase tracking-[0.3em]"
        style={{ color: location.accentColor }}
      >
        "{location.motto}"
      </p>

      <blockquote className="mb-4 border-l-2 pl-3 text-sm italic text-gray-300" style={{ borderColor: location.accentColor }}>
        "{location.quote.text}"
        <footer className="mt-1 text-xs not-italic text-gray-500">— {location.quote.speaker}</footer>
      </blockquote>

      <p className="mb-5 flex-1 text-sm leading-6 text-gray-400">{location.description}</p>

      <dl className="mb-5 space-y-2 border-t border-white/10 pt-4">
        {location.facts.map((fact, i) => (
          <div
            key={fact.label}
            className="location-fact grid grid-cols-[auto_1fr] gap-3 text-xs"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <dt className="location-label uppercase tracking-wider text-gray-500">{fact.label}</dt>
            <dd className="text-right text-gray-200 sm:text-left">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div
        className="mt-auto rounded-md border px-4 py-3 text-center"
        style={{ borderColor: `${location.accentColor}55` }}
      >
        <Crown size={14} className="mx-auto mb-2 text-gray-500" />
        <p className="text-sm italic text-gray-300">"{location.closingQuote.text}"</p>
        <p className="mt-1 text-xs text-gray-500">— {location.closingQuote.speaker}</p>
      </div>
    </aside>
  );
}
