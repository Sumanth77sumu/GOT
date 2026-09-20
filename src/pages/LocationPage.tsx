import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LocationDetail from "../components/locations/LocationDetail";
import { locations, type LocationData } from "../data/locations";
import { mapLocations } from "../data/mapLocations";

const DEFAULT_ACCENT = "#c9a84c";

/**
 * Builds a graceful "chronicle not yet written" placeholder for any mapped
 * location that doesn't have full LocationData yet, so every hotspot on the
 * map leads somewhere real instead of a 404 — and so adding the 20-odd
 * remaining locations later is just adding an entry to `locations.ts`.
 */
function buildPlaceholder(slug: string): LocationData {
  const mapEntry = mapLocations.find((loc) => loc.id === slug);

  return {
    id: slug,
    name: (mapEntry?.name ?? slug).toUpperCase(),
    subtitle: "THE CHRONICLE CONTINUES",
    house: mapEntry?.house ?? "Unknown",
    region: mapEntry?.region ?? "Uncharted",
    motto: "The Realm Remembers",
    quote: {
      text: "Not every tale has been written — yet.",
      speaker: "The Maesters of the Citadel",
    },
    closingQuote: {
      text: "All men must wait.",
      speaker: "The Citadel",
    },
    heroImage: null,
    sigil: mapEntry?.sigil ?? "🗺️",
    accentColor: DEFAULT_ACCENT,
    description:
      "The maesters have not yet finished this chronicle. Return to the map to explore one of the realms already recorded in full, or check back soon as more of Westeros and Essos are illuminated.",
    facts: [
      { label: "Region", value: mapEntry?.region ?? "Uncharted" },
      ...(mapEntry?.house ? [{ label: "House", value: mapEntry.house }] : []),
    ],
  };
}

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = (slug && locations[slug]) || buildPlaceholder(slug ?? "");

  // Re-trigger the cinematic entrance animation and land at the top when
  // navigating directly between two location pages via the carousel.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  return <LocationDetail key={slug} location={data} />;
}
