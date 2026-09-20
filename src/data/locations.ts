/**
 * Rich content for locations that have a full cinematic detail page.
 * Keyed by the same `id` used in `mapLocations.ts` and in the
 * `/locations/:id` route param, so a hotspot, a carousel entry and a page
 * all resolve through one lookup.
 *
 * Adding a 7th location later means: add one entry here, one entry in
 * `mapLocations.ts` (with `hasDetail: true`), and drop a hero image in
 * `public/assets/locations/`. No component changes required.
 */

export interface LocationFact {
  label: string;
  value: string;
}

export interface LocationData {
  id: string;
  name: string;
  subtitle: string;
  house: string;
  region: string;
  motto: string;
  quote: { text: string; speaker: string };
  closingQuote: { text: string; speaker: string };
  /** Path under public/, or null when no hero photograph exists yet. */
  heroImage: string | null;
  /** Existing image path (house sigil) or a single emoji glyph. */
  sigil: string;
  accentColor: string;
  description: string;
  facts: LocationFact[];
}

export const locations: Record<string, LocationData> = {
  winterfell: {
    id: "winterfell",
    name: "WINTERFELL",
    subtitle: "THE NORTH REMEMBERS",
    house: "House Stark",
    region: "The North",
    motto: "Winter Is Coming",
    quote: { text: "Winter is coming.", speaker: "Eddard Stark" },
    closingQuote: { text: "The North remembers.", speaker: "Lyanna Mormont" },
    heroImage: "/assets/locations/winterfell.jpg",
    sigil: "/images/one.jpg",
    accentColor: "#8fafc4",
    description:
      "Winterfell is the ancestral seat of House Stark, rulers of the North. A fortress of ancient stone, it has stood for thousands of years, enduring countless winters. Home to a proud and honorable house, Winterfell symbolizes resilience, loyalty, and the unbreakable bond between the Starks and the North.",
    facts: [
      { label: "Region", value: "The North" },
      { label: "House", value: "Stark" },
      { label: "Sigil", value: "Direwolf" },
      { label: "Words", value: '"Winter is Coming"' },
      { label: "Current Lord", value: "Bran Stark" },
      { label: "Key Locations", value: "The Godswood, The Great Keep, Crypts of Winterfell" },
    ],
  },

  "kings-landing": {
    id: "kings-landing",
    name: "KING'S LANDING",
    subtitle: "THE IRON THRONE AWAITS",
    house: "House Lannister",
    region: "The Crownlands",
    motto: "Hear Me Roar",
    quote: {
      text: "When you play the game of thrones, you win or you die.",
      speaker: "Cersei Lannister",
    },
    closingQuote: {
      text: "Power resides where men believe it resides.",
      speaker: "Lord Varys",
    },
    // No hero photograph has been generated for this location yet —
    // LocationHero falls back to a themed gradient + sigil treatment.
    heroImage: null,
    sigil: "/images/two.jpg",
    accentColor: "#d4a84b",
    description:
      "King's Landing is the capital of the Seven Kingdoms and seat of the Iron Throne. Built upon Aegon's Hill where the first Targaryen conqueror made his camp, the city is a labyrinth of wealth, treachery, and ambition. Whoever rules the Red Keep rules the realm — for a time.",
    facts: [
      { label: "Region", value: "The Crownlands" },
      { label: "Seat", value: "The Red Keep" },
      { label: "House", value: "Lannister (current)" },
      { label: "Words", value: '"Hear Me Roar"' },
      { label: "Symbol", value: "The Iron Throne" },
      { label: "Known For", value: "Politics, Wealth, Intrigue" },
    ],
  },

  dragonstone: {
    id: "dragonstone",
    name: "DRAGONSTONE",
    subtitle: "THE BIRTHRIGHT ENDURES",
    house: "House Targaryen",
    region: "The Narrow Sea",
    motto: "Fire and Blood",
    quote: {
      text: "I will take what is mine with fire and blood.",
      speaker: "Daenerys Targaryen",
    },
    closingQuote: { text: "A dragon is not a slave.", speaker: "Daenerys Targaryen" },
    heroImage: "/assets/locations/dragonstone.jpg",
    sigil: "/images/three.png",
    accentColor: "#c0392b",
    description:
      "Dragonstone is the ancestral seat of House Targaryen, an ancient Valyrian house. Perched on a volcanic island in Blackwater Bay, it is a place of power, forged by dragons and shaped by destiny. Here, Aegon the Conqueror began his journey, and here the Targaryens return when the dragons stir again.",
    facts: [
      { label: "Region", value: "The Narrow Sea" },
      { label: "Seat", value: "Dragonstone" },
      { label: "House", value: "Targaryen" },
      { label: "Words", value: "Fire and Blood" },
      { label: "Symbol", value: "Three-Headed Dragon" },
      { label: "Current Ruler", value: "Daenerys Targaryen (later)" },
    ],
  },

  highgarden: {
    id: "highgarden",
    name: "HIGHGARDEN",
    subtitle: "THE GARDEN OF THE REALM",
    house: "House Tyrell",
    region: "The Reach",
    motto: "Growing Strong",
    quote: { text: "Growth is power.", speaker: "House Tyrell" },
    closingQuote: { text: "Beauty endures where others fall.", speaker: "Lady Olenna Tyrell" },
    heroImage: "/assets/locations/highgarden.jpg",
    sigil: "/images/six.jpg",
    accentColor: "#5a9e48",
    description:
      "Highgarden is the ancestral seat of House Tyrell and the heart of the Reach. Renowned for its beauty, fertile lands, and bountiful harvests, it is one of the wealthiest and most influential regions in Westeros. Highgarden is a symbol of prosperity, culture, and diplomacy.",
    facts: [
      { label: "Region", value: "The Reach" },
      { label: "Seat", value: "Highgarden" },
      { label: "House", value: "Tyrell" },
      { label: "Words", value: '"Growing Strong"' },
      { label: "Symbol", value: "Golden Rose" },
      { label: "Known For", value: "Fertility, Wealth, Diplomacy" },
    ],
  },

  dorne: {
    id: "dorne",
    name: "DORNE",
    subtitle: "UNBOWED, UNBENT, UNBROKEN",
    house: "House Martell",
    region: "Dorne",
    motto: "Unbowed, Unbent, Unbroken",
    quote: { text: "We do not kneel.", speaker: "Prince Doran Martell" },
    closingQuote: { text: "Dorne will never be broken.", speaker: "Prince Doran Martell" },
    heroImage: "/assets/locations/dorne.jpg",
    sigil: "☀️",
    accentColor: "#e08b2b",
    description:
      "Dorne is the southernmost of the Seven Kingdoms, ruled by House Martell. A land of sun, sand, and spear, it is known for its proud independence, fierce people, and unmatched resilience. Dorne has never been conquered, and its people hold their freedom above all.",
    facts: [
      { label: "Region", value: "Dorne" },
      { label: "Seat", value: "Sunspear" },
      { label: "House", value: "Martell" },
      { label: "Words", value: '"Unbowed, Unbent, Unbroken"' },
      { label: "Symbol", value: "A Sun Pierced by a Spear" },
      { label: "Known For", value: "Independence, Honor, Vengeance" },
    ],
  },

  "the-vale": {
    id: "the-vale",
    name: "THE VALE",
    subtitle: "AS HIGH AS HONOR",
    house: "House Arryn",
    region: "The Vale of Arryn",
    motto: "As High as Honor",
    quote: { text: "The Vale remembers.", speaker: "House Arryn" },
    closingQuote: { text: "Honor lifts us higher than fear ever could.", speaker: "Lord Jon Arryn" },
    heroImage: "/assets/locations/the-vale.jpg",
    sigil: "🦅",
    accentColor: "#3b6ea5",
    description:
      "The Vale is the easternmost of the Seven Kingdoms, ruled by House Arryn. Its seat, the Eyrie, is a nearly impregnable fortress high in the mountains, reachable only by the winding, perilous mountain passes known as the Sky Roads. The Vale is known for its breathtaking beauty, fierce independence, and unwavering loyalty to honor.",
    facts: [
      { label: "Region", value: "The Vale" },
      { label: "Seat", value: "The Eyrie" },
      { label: "House", value: "Arryn" },
      { label: "Words", value: '"As High as Honor"' },
      { label: "Symbol", value: "The Falcon and Crescent" },
      { label: "Known For", value: "Honor, Chivalry, Isolation, Strong Defenses" },
    ],
  },
  meereen: {
    id: "meereen",
    name: "MEEREEN",
    subtitle: "CHAINS TO FREEDOM",
    house: "Targaryen (by conquest)",
    region: "Essos",
    motto: "Breaking Chains",
    quote: { text: "A city of slaves, a city of hope.", speaker: "Daenerys Targaryen" },
    closingQuote: { text: "I will break the wheel.", speaker: "Daenerys Targaryen" },
    heroImage: "/assets/locations/meereen.jpg",
    sigil: "/images/three.png",
    accentColor: "#c0392b",
    description:
      "Meereen is one of the great Slave Cities of Essos, conquered by Daenerys Targaryen. A city of ancient walls, rich history, and deep-rooted slavery, it became a symbol of change when the dragon queen broke the chains and sought to build a new future. Meereen stands as a testament to power, justice, and the difficult task of ruling a fractured world.",
    facts: [
      { label: "Region", value: "Essos" },
      { label: "Status", value: "Ruled by Daenerys Targaryen" },
      { label: "Former Rulers", value: "Great Masters" },
      { label: "Known For", value: "Slavery, Rebellion, Dragons, Justice" },
      { label: "Current State", value: "Stabilizing" },
    ],
  },

  volantis: {
    id: "volantis",
    name: "VOLANTIS",
    subtitle: "FLAME AND GOLD",
    house: "The Triarchs",
    region: "Essos",
    motto: "Flame and Gold",
    quote: { text: "In Volantis, even shadows burn.", speaker: "Unknown" },
    closingQuote: { text: "All things burn, and from the flames we rise.", speaker: "A Red Priestess" },
    heroImage: "/assets/locations/volantis.jpg",
    sigil: "🐙",
    accentColor: "#c9a84c",
    description:
      "Volantis is one of the oldest and most powerful cities in Essos, known for its wealth, sorcery, and devotion to fire. Built by Valyrians in the ancient days, it remains a center of trade, learning, and mystery. The city is ruled by the Triarchs, and its great temples are dedicated to the Lord of Light, whose flames burn day and night.",
    facts: [
      { label: "Region", value: "Essos" },
      { label: "Status", value: "Free City" },
      { label: "Rulers", value: "The Triarchs" },
      { label: "Known For", value: "Trade, Sorcery, Red Priests, Wealth" },
      { label: "Main Religion", value: "The Lord of Light" },
    ],
  },

  valyria: {
    id: "valyria",
    name: "VALYRIA",
    subtitle: "THE DRAGONLORDS' FALL",
    house: "House Targaryen (ancestral)",
    region: "The Smoking Sea",
    motto: "The Fall of a Dynasty",
    quote: { text: "Here, dragons ruled the skies, and men touched the gods.", speaker: "Unknown" },
    closingQuote: { text: "All things turn to ash.", speaker: "A Valyrian Proverb" },
    heroImage: "/assets/locations/valyria.jpg",
    sigil: "/images/three.png",
    accentColor: "#8b1a1a",
    description:
      "Valyria was the mightiest empire the world has ever known — a land of unimaginable power, ruled by dragonlords who mastered fire, magic, and the skies themselves. But in a cataclysm known as the Doom, the Fourteen Flames consumed Valyria, reducing its cities to ash and ruin. To this day, the smoking ruins remain a haunted reminder of its greatness and its fall.",
    facts: [
      { label: "Region", value: "The Smoking Sea" },
      { label: "Status", value: "Ruins" },
      { label: "Former Rulers", value: "Valyrian Dragonlords" },
      { label: "Known For", value: "Dragons, Magic, Steel" },
      { label: "Current State", value: "Ruined, Uninhabitable" },
      { label: "Event", value: "The Doom (c. 400 years before Aegon)" },
    ],
  },
};

/** Ordered list for the bottom carousel — deliberately not `Object.values`,
 * so carousel order stays stable regardless of key insertion order. */
export const locationOrder = [
  "winterfell",
  "kings-landing",
  "dragonstone",
  "highgarden",
  "dorne",
  "the-vale",
  "meereen",
  "volantis",
  "valyria",
];
