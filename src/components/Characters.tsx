import { useMemo, useState } from "react";
import { Search, Shield, Crown } from "lucide-react";
import { characters } from "../data/characters";

const houses = ["All", "Stark", "Lannister", "Targaryen", "Clegane"];

const houseIcons: Record<string, string> = {
  All: "⚔",
  Stark: "🐺",
  Lannister: "🦁",
  Targaryen: "🐉",
  Clegane: "🐕",
};

export default function Characters() {
  const [search, setSearch] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("All");

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchesSearch =
        character.name.toLowerCase().includes(search.toLowerCase()) ||
        character.title.toLowerCase().includes(search.toLowerCase());

      const matchesHouse =
        selectedHouse === "All" || character.house === selectedHouse;

      return matchesSearch && matchesHouse;
    });
  }, [search, selectedHouse]);

  return (
    <section
      id="characters"
      className="relative min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 tracking-[0.45em] uppercase text-yellow-500 text-sm">
            Heroes • Villains • Legends
          </p>

          <h2 className="font-serif text-6xl font-bold tracking-widest text-white">
            CHARACTERS
          </h2>

          <div className="mx-auto mt-6 h-[2px] w-40 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </div>

        {/* Search */}
        <div className="relative mx-auto mb-10 max-w-lg">
          <Search
            size={20}
            className="absolute left-5 top-4 text-yellow-500"
          />

          <input
            type="text"
            placeholder="Search a hero, house or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-yellow-600/30 bg-black/40 py-3 pl-14 pr-5 backdrop-blur-lg outline-none transition focus:border-yellow-500"
          />
        </div>

        {/* Filters */}
        <div className="mb-14 flex flex-wrap justify-center gap-3">
          {houses.map((house) => (
            <button
              key={house}
              onClick={() => setSelectedHouse(house)}
              className={`rounded-full border px-5 py-2 transition-all duration-300 ${
                selectedHouse === house
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : "border-white/10 bg-white/5 hover:border-yellow-500 hover:bg-yellow-500/10"
              }`}
            >
              <span className="mr-2">{houseIcons[house]}</span>
              {house}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] transition-all duration-500 hover:-translate-y-3 hover:border-yellow-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.25)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={character.image}
                  alt={character.name}
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Status */}
                <span
                  className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${
                    character.status === "Alive"
                      ? "bg-green-600"
                      : "bg-red-700"
                  }`}
                >
                  {character.status}
                </span>

                {/* Character Name */}
                <div className="absolute bottom-0 w-full p-6">
                  <h3 className="font-serif text-3xl font-bold leading-tight">
                    {character.name}
                  </h3>

                  <p className="mt-1 text-yellow-400">
                    {character.title}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 p-6">

                <div className="flex items-center gap-2 text-sm text-yellow-400">
                  <Shield size={16} />
                  House {character.house}
                </div>

                <blockquote className="border-l-2 border-yellow-500 pl-4 italic text-gray-300">
                  “{character.quote}”
                </blockquote>

                <p className="line-clamp-4 text-sm leading-7 text-gray-400">
                  {character.description}
                </p>

                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Crown size={14} />
                    {character.actor}
                  </div>

                  <button className="font-semibold text-yellow-400 transition hover:text-yellow-300">
                    Read Chronicle →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="mt-24 text-center text-gray-400">
            <h3 className="text-3xl font-semibold">
              No characters found
            </h3>

            <p className="mt-3">
              Try searching for another hero or house.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}