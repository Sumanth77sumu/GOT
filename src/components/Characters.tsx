import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { Search, Swords, Crown, ArrowRight, X } from "lucide-react";
import { characters, type Character } from "../data/characters";

const houses = ["All", "Stark", "Lannister", "Targaryen", "Clegane"];

const houseIcons: Record<string, string> = {
  All: "⚔",
  Stark: "🐺",
  Lannister: "🦁",
  Targaryen: "🐉",
  Clegane: "🐕",
};

const houseBadgeStyles: Record<string, string> = {
  Stark: "border-slate-400/40 bg-slate-400/10 text-slate-300",
  Lannister: "border-yellow-400/40 bg-yellow-400/10 text-yellow-300",
  Targaryen: "border-red-500/40 bg-red-500/10 text-red-300",
  Clegane: "border-neutral-400/40 bg-neutral-400/10 text-neutral-300",
};

const houseCounts: Record<string, number> = houses.reduce(
  (acc, house) => {
    acc[house] =
      house === "All"
        ? characters.length
        : characters.filter((c) => c.house === house).length;
    return acc;
  },
  {} as Record<string, number>,
);

type SortKey = "name" | "house" | "status";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "name", label: "Name (A–Z)" },
  { key: "house", label: "House" },
  { key: "status", label: "Status" },
];

function CharacterModal({
  character,
  onClose,
}: {
  character: Character;
  onClose: () => void;
}) {
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const handleTiltMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = tiltRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    tiltRef.current!.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.04, 1.04, 1.04)`;
  };

  const handleTiltLeave = () => {
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${character.name} details`}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-yellow-500/30 bg-[#0d0d0d] shadow-[0_0_80px_rgba(212,175,55,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition hover:border-yellow-500 hover:text-yellow-400"
        >
          <X size={18} />
        </button>

        {/* Portrait with 3D tilt */}
        <div className="[perspective:1200px]">
          <div
            ref={tiltRef}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="relative h-64 w-full overflow-hidden bg-black transition-transform duration-300 ease-out will-change-transform sm:h-[380px] lg:h-[440px]"
          >
            <img
              src={character.image}
              alt={character.name}
              className="h-full w-full object-contain object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <span
              className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm ${
                character.status === "Alive"
                  ? "bg-green-950/70 text-green-400"
                  : "bg-red-950/70 text-red-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  character.status === "Alive"
                    ? "animate-pulse bg-green-400"
                    : "bg-red-400"
                }`}
              />
              {character.status}
            </span>

            <div className="absolute bottom-0 w-full p-6">
              <h3 className="font-serif text-4xl font-bold leading-tight">
                {character.name}
              </h3>
              <p className="mt-1 tracking-wide text-yellow-400">
                {character.title}
              </p>
            </div>
          </div>
        </div>

        {/* Info below the image */}
        <div className="max-h-[40vh] space-y-5 overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                houseBadgeStyles[character.house] ??
                "border-white/15 bg-white/5 text-gray-300"
              }`}
            >
              <span>{houseIcons[character.house] ?? "⚔"}</span>
              House {character.house}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
              <Swords size={12} />
              {character.weapon}
            </span>
          </div>

          <blockquote className="border-l-2 border-yellow-500 pl-4 italic text-gray-300">
            "{character.quote}"
          </blockquote>

          <p className="text-sm leading-7 text-gray-400">
            {character.description}
          </p>

          <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-gray-500">
            <Crown size={14} />
            Played by {character.actor}
          </div>
        </div>
      </div>
    </div>
  );
}

function CharacterCard({
  character,
  index,
  onOpen,
}: {
  character: Character;
  index: number;
  onOpen: (character: Character) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), (index % 6) * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(character)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(character);
        }
      }}
      className={`group cursor-pointer overflow-hidden rounded-2xl border border-yellow-900/25 bg-[#0d0d0d] transition-all duration-700 hover:-translate-y-3 hover:border-yellow-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="h-72 w-full object-cover object-top transition duration-700 group-hover:scale-105 sm:h-80 lg:h-[420px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Status */}
        <span
          className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm ${
            character.status === "Alive"
              ? "bg-green-950/70 text-green-400"
              : "bg-red-950/70 text-red-400"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              character.status === "Alive"
                ? "animate-pulse bg-green-400"
                : "bg-red-400"
            }`}
          />
          {character.status}
        </span>

        {/* Character Name */}
        <div className="absolute bottom-0 w-full p-6">
          <h3 className="font-serif text-3xl font-bold leading-tight">
            {character.name}
          </h3>

          <p className="mt-1 tracking-wide text-yellow-400">
            {character.title}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
              houseBadgeStyles[character.house] ??
              "border-white/15 bg-white/5 text-gray-300"
            }`}
          >
            <span>{houseIcons[character.house] ?? "⚔"}</span>
            House {character.house}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
            <Swords size={12} />
            {character.weapon}
          </span>
        </div>

        <blockquote className="border-l-2 border-yellow-500 pl-4 italic text-gray-300">
          "{character.quote}"
        </blockquote>

        <p className="line-clamp-4 text-sm leading-7 text-gray-400">
          {character.description}
        </p>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Crown size={14} />
            {character.actor}
          </div>

          <button className="group/cta flex items-center gap-1.5 font-semibold text-yellow-400 transition hover:text-yellow-300">
            Read Chronicle
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Characters() {
  const [search, setSearch] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const filteredCharacters = useMemo(() => {
    const query = search.toLowerCase();

    const filtered = characters.filter((character) => {
      const matchesSearch =
        character.name.toLowerCase().includes(query) ||
        character.title.toLowerCase().includes(query) ||
        character.house.toLowerCase().includes(query) ||
        character.actor.toLowerCase().includes(query);

      const matchesHouse =
        selectedHouse === "All" || character.house === selectedHouse;

      return matchesSearch && matchesHouse;
    });

    return [...filtered].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "house") return a.house.localeCompare(b.house);
      return a.status.localeCompare(b.status);
    });
  }, [search, selectedHouse, sortKey]);

  return (
    <section
      id="characters"
      className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black via-[#0b0b0b] to-black px-6 py-24 text-white sm:px-10 lg:px-16 2xl:px-24"
    >
      <div className="mx-auto w-full max-w-none">

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

        {/* Toolbar: search (full width), filters (full width), sort + counter */}
        <div className="mb-[25px] grid grid-cols-[380px_1fr_180px] items-center gap-4" style={{ marginBottom: "25px" }}>

            {/* Search */}
            <div className="relative mb-[25px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500"
              />

              <input
                type="text"
                placeholder="Search characters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-full border border-yellow-600/30 bg-black/40 pl-11 pr-4 text-sm text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center justify-end gap-2">
              {houses.map((house) => (
                <button
                  key={house}
                  onClick={() => setSelectedHouse(house)}
                  className={`h-10 whitespace-nowrap rounded-full border px-4 text-sm transition ${
                    selectedHouse === house
                      ? "border-yellow-500 bg-yellow-500 text-black"
                      : "border-white/10 bg-white/5 text-white hover:border-yellow-500 hover:bg-yellow-500/10"
                  }`}
                >
                  <span className="mr-1">{houseIcons[house]}</span>
                  {house}
                  <span className="ml-1 opacity-70">
                    ({houseCounts[house]})
                  </span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex justify-end">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="h-10 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-yellow-500"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.key}
                    value={option.key}
                    className="bg-[#111]"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
          {filteredCharacters.map((character, index) => (
            <CharacterCard
              key={character.id}
              character={character}
              index={index}
              onOpen={setSelectedCharacter}
            />
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

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </section>
  );
}
