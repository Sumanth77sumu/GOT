export interface Character {
  id: number;
  name: string;
  house: string;
  status: "Alive" | "Dead";
  title: string;
  weapon: string;
  actor: string;
  image: string;
  quote: string;
  description: string;
}

export const characters: Character[] = [
  {
    id: 1,
    name: "Jon Snow",
    house: "Stark",
    status: "Alive",
    title: "King in the North",
    weapon: "Longclaw",
    actor: "Kit Harington",
    image: "/characters/jon.jpg",
    quote: "Love is the death of duty.",
    description:
      "The son of Lyanna Stark and Rhaegar Targaryen, raised as Ned Stark's bastard and later becoming the King in the North."
  },

  {
    id: 2,
    name: "Daenerys Targaryen",
    house: "Targaryen",
    status: "Dead",
    title: "Mother of Dragons",
    weapon: "Dragons",
    actor: "Emilia Clarke",
    image: "/characters/daenerys.jpg",
    quote: "I will take what is mine with fire and blood.",
    description:
      "The last surviving Targaryen princess who sought to reclaim the Iron Throne."
  },

  {
    id: 3,
    name: "Arya Stark",
    house: "Stark",
    status: "Alive",
    title: "No One",
    weapon: "Needle",
    actor: "Maisie Williams",
    image: "/characters/arya.jpg",
    quote: "Not Today.",
    description:
      "Youngest daughter of Ned Stark, trained by the Faceless Men and slayer of the Night King."
  },

  {
    id: 4,
    name: "Tyrion Lannister",
    house: "Lannister",
    status: "Alive",
    title: "Hand of the King",
    weapon: "Intelligence",
    actor: "Peter Dinklage",
    image: "/characters/tyrion.jpg",
    quote: "I drink and I know things.",
    description:
      "The clever youngest son of Tywin Lannister whose wit repeatedly saves Westeros."
  },

  {
    id: 5,
    name: "Cersei Lannister",
    house: "Lannister",
    status: "Dead",
    title: "Queen of the Seven Kingdoms",
    weapon: "Wildfire",
    actor: "Lena Headey",
    image: "/characters/cersei.jpg",
    quote: "When you play the game of thrones, you win or you die.",
    description:
      "The ruthless queen who would stop at nothing to protect her children and power."
  },

  {
    id: 6,
    name: "Jaime Lannister",
    house: "Lannister",
    status: "Dead",
    title: "Kingslayer",
    weapon: "Sword",
    actor: "Nikolaj Coster-Waldau",
    image: "/characters/jaime.jpg",
    quote: "The things I do for love.",
    description:
      "Once known as the Kingslayer, Jaime evolves into one of the most complex knights in Westeros."
  },

  {
    id: 7,
    name: "Sansa Stark",
    house: "Stark",
    status: "Alive",
    title: "Queen in the North",
    weapon: "Politics",
    actor: "Sophie Turner",
    image: "/characters/sansa.jpg",
    quote: "The lone wolf dies, but the pack survives.",
    description:
      "After enduring immense hardship, Sansa becomes the independent Queen in the North."
  },

  {
    id: 8,
    name: "Bran Stark",
    house: "Stark",
    status: "Alive",
    title: "Three-Eyed Raven",
    weapon: "Greenseeing",
    actor: "Isaac Hempstead Wright",
    image: "/characters/bran.jpg",
    quote: "I'm not really Bran anymore.",
    description:
      "Gifted with supernatural visions, Bran ultimately becomes King of the Six Kingdoms."
  },

  {
    id: 9,
    name: "The Hound",
    house: "Clegane",
    status: "Dead",
    title: "Sandor Clegane",
    weapon: "Greatsword",
    actor: "Rory McCann",
    quote: "Fuck the King.",
    image: "/characters/hound.jpg",
    description:
      "A feared warrior who slowly develops a moral code and protects Arya Stark."
  },

  {
    id: 10,
    name: "Ned Stark",
    house: "Stark",
    status: "Dead",
    title: "Lord of Winterfell",
    weapon: "Ice",
    actor: "Sean Bean",
    quote: "The man who passes the sentence should swing the sword.",
    image: "/characters/ned.jpg",
    description:
      "The honorable Lord of Winterfell whose execution ignites the War of the Five Kings."
  },

  {
  id: 11,
  name: "Robb Stark",
  house: "Stark",
  status: "Dead",
  title: "King in the North",
  weapon: "Sword",
  actor: "Richard Madden",
  image: "/characters/robb.jpg",
  quote: "The North will never bow to the Lannisters.",
  description:
    "The eldest son of Eddard Stark who was proclaimed King in the North and led the northern armies during the War of the Five Kings."
}
];