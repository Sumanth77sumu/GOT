import LocationHero from "./LocationHero";
import LocationInfo from "./LocationInfo";
import LocationCarousel from "./LocationCarousel";
import type { LocationData } from "../../data/locations";
import "./LocationDetail.css";

/**
 * Reusable cinematic layout for any location. Every /locations/:id route
 * renders this one component with different data — see LocationPage.
 */
export default function LocationDetail({ location }: { location: LocationData }) {
  return (
    <div className="location-page-enter relative min-h-screen w-full bg-gradient-to-b from-black via-[#0b0b0b] to-black px-4 py-10 text-white sm:px-8 lg:px-12">
      <header className="mx-auto mb-6 max-w-7xl text-center">
        <p className="location-label text-xs uppercase tracking-[0.4em] text-yellow-500">
          A Song of Ice and Fire
        </p>
        <h1 className="location-title mt-2 text-4xl font-bold tracking-wide sm:text-5xl lg:text-6xl">
          {location.name}
        </h1>
        <p className="location-label mt-2 text-sm uppercase tracking-[0.3em] text-gray-400">
          {location.subtitle}
        </p>
        <div className="mx-auto mt-5 h-[2px] w-28 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      </header>

      <div className="mx-auto mb-6 grid max-w-7xl gap-6 lg:grid-cols-[1fr_320px]">
        <LocationHero location={location} />
        <LocationInfo location={location} />
      </div>

      <div className="mx-auto max-w-7xl">
        <LocationCarousel currentId={location.id} />
      </div>
    </div>
  );
}
