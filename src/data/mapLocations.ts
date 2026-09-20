/**
 * Hotspot configuration for the interactive world map.
 *
 * Coordinates are percentages (0-100) of the map image's own width/height,
 * measured directly against `/images/the_world.jpg` (1536x1024) — not
 * against the screen — so a hotspot rendered at `left: x%; top: y%` inside
 * a container that exactly wraps the (object-fit: contain) image stays
 * pinned to the same physical spot on the map at any viewport size.
 *
 * A few Essos locations (Qarth, Asshai) and Dragonstone aren't explicitly
 * pinned/labelled on this particular map illustration, so their coordinates
 * are lore-accurate estimates rather than measurements — flagged inline.
 */

export interface MapLocation {
  id: string;
  name: string;
  region: string;
  house?: string;
  /** Either an existing image path (e.g. "/images/two.jpg") or a single
   * emoji glyph used as a lightweight sigil when no house image exists. */
  sigil?: string;
  x: number;
  y: number;
  route: string;
  /** True when this location has a full cinematic detail page (see
   * src/data/locations.ts). Locations without one still get a hotspot and
   * route, but land on a "chronicle not yet written" placeholder. */
  hasDetail?: boolean;
}

export const mapLocations: MapLocation[] = [
  // ── Westeros ──────────────────────────────────────────────────────────
  {
    id: "winterfell",
    name: "Winterfell",
    region: "The North",
    house: "House Stark",
    sigil: "/images/one.jpg",
    x: 21.7,
    y: 19.5,
    route: "/locations/winterfell",
    hasDetail: true,
  },
  {
    id: "the-vale",
    name: "The Vale",
    region: "The Vale of Arryn",
    house: "House Arryn",
    sigil: "🦅",
    x: 32.6,
    y: 34.2,
    route: "/locations/the-vale",
    hasDetail: true,
  },
  {
    id: "riverrun",
    name: "Riverrun",
    region: "The Riverlands",
    house: "House Tully",
    sigil: "🐟",
    x: 20.2,
    y: 42.0,
    route: "/locations/riverrun",
  },
  {
    id: "casterly-rock",
    name: "Casterly Rock",
    region: "The Westerlands",
    house: "House Lannister",
    sigil: "/images/two.jpg",
    x: 13.2,
    y: 46.9,
    route: "/locations/casterly-rock",
  },
  {
    id: "pyke",
    name: "Pyke",
    region: "The Iron Islands",
    house: "House Greyjoy",
    sigil: "/images/five.jpg",
    x: 9.3,
    y: 34.7,
    route: "/locations/pyke",
  },
  {
    id: "highgarden",
    name: "Highgarden",
    region: "The Reach",
    house: "House Tyrell",
    sigil: "/images/six.jpg",
    x: 17.4,
    y: 57.1,
    route: "/locations/highgarden",
    hasDetail: true,
  },
  {
    id: "storms-end",
    name: "Storm's End",
    region: "The Stormlands",
    house: "House Baratheon",
    sigil: "/images/four.webp",
    x: 34.5,
    y: 58.6,
    route: "/locations/storms-end",
  },
  {
    id: "kings-landing",
    name: "King's Landing",
    region: "The Crownlands",
    house: "House Lannister",
    sigil: "/images/two.jpg",
    x: 31.3,
    y: 49.3,
    route: "/locations/kings-landing",
    hasDetail: true,
  },
  {
    id: "dragonstone",
    name: "Dragonstone",
    region: "The Narrow Sea",
    house: "House Targaryen",
    sigil: "/images/three.png",
    // Not explicitly pinned on this map illustration — placed on the small
    // island east of King's Landing in Blackwater Bay, per the books/show.
    x: 38.7,
    y: 50.3,
    route: "/locations/dragonstone",
    hasDetail: true,
  },
  {
    id: "dorne",
    name: "Dorne",
    region: "Dorne",
    house: "House Martell",
    sigil: "☀️",
    x: 21.0,
    y: 74.2,
    route: "/locations/dorne",
    hasDetail: true,
  },

  // ── Essos ─────────────────────────────────────────────────────────────
  { id: "braavos", name: "Braavos", region: "Essos", sigil: "🗡️", x: 47.5, y: 23.9, route: "/locations/braavos" },
  { id: "pentos", name: "Pentos", region: "Essos", sigil: "🏛️", x: 50.8, y: 36.1, route: "/locations/pentos" },
  { id: "lorath", name: "Lorath", region: "Essos", sigil: "🏔️", x: 59.1, y: 24.9, route: "/locations/lorath" },
  { id: "norvos", name: "Norvos", region: "Essos", sigil: "🐐", x: 57.9, y: 35.2, route: "/locations/norvos" },
  { id: "qohor", name: "Qohor", region: "Essos", sigil: "🔥", x: 67.2, y: 35.0, route: "/locations/qohor" },
  { id: "myr", name: "Myr", region: "Essos", sigil: "🎭", x: 56.2, y: 43.0, route: "/locations/myr" },
  { id: "tyrosh", name: "Tyrosh", region: "Essos", sigil: "🌈", x: 52.9, y: 55.5, route: "/locations/tyrosh" },
  {
    id: "volantis",
    name: "Volantis",
    region: "Essos",
    house: "The Triarchs",
    sigil: "🐙",
    x: 62.2,
    y: 60.4,
    route: "/locations/volantis",
    hasDetail: true,
  },
  {
    id: "slavers-bay",
    name: "Slaver's Bay",
    region: "Essos",
    sigil: "⛓️",
    x: 75.7,
    y: 67.7,
    route: "/locations/slavers-bay",
  },
  {
    id: "meereen",
    name: "Meereen",
    region: "Slaver's Bay",
    house: "Targaryen (by conquest)",
    sigil: "/images/three.png",
    x: 77.5,
    y: 50.3,
    route: "/locations/meereen",
    hasDetail: true,
  },
  { id: "yunkai", name: "Yunkai", region: "Slaver's Bay", sigil: "🟡", x: 84.6, y: 55.5, route: "/locations/yunkai" },
  { id: "astapor", name: "Astapor", region: "Slaver's Bay", sigil: "🔺", x: 91.8, y: 55.5, route: "/locations/astapor" },
  {
    id: "qarth",
    name: "Qarth",
    region: "Essos",
    sigil: "🏜️",
    // Not shown on this map illustration — Qarth lies further east, at the
    // edge of the Jade Sea; estimated relative to Astapor/Ibben.
    x: 97.0,
    y: 48.8,
    route: "/locations/qarth",
  },
  {
    id: "vaes-dothrak",
    name: "Vaes Dothrak",
    region: "The Dothraki Sea",
    sigil: "🐎",
    x: 82.4,
    y: 40.3,
    route: "/locations/vaes-dothrak",
  },
  {
    id: "valyria",
    name: "Valyria",
    region: "The Smoking Sea",
    house: "House Targaryen (ancestral)",
    sigil: "/images/three.png",
    x: 87.6,
    y: 76.7,
    route: "/locations/valyria",
    hasDetail: true,
  },
  {
    id: "asshai",
    name: "Asshai",
    region: "The Shadow Lands",
    sigil: "🌑",
    // Not shown on this map illustration — Asshai sits far beyond it, at
    // the easternmost edge of the known world; placed near the map's edge.
    x: 97.7,
    y: 74.2,
    route: "/locations/asshai",
  },
];
