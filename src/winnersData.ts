export type Winner = {
  id: string;
  title: string;
  directors: string;
  poster: string;
  landscape?: boolean;
  opening?: boolean;
  awards: {
    title: string;
    laurel?: string;
  }[];
};

export const winners: Winner[] = [
  {
    id: "opening-seed-of-tomorrow",
    title: "Seed of Tomorrow",
    directors: "Yun Fan",
    poster: "/finalists/seed-of-tomorrow.webp",
    opening: true,
    awards: [{ title: "Opening Film" }],
  },
  {
    id: "2460",
    title: "WILL",
    directors: "Alejandro Gabriel Damiani & Marcelo Damiani",
    poster: "/finalists/2460.webp",
    landscape: true,
    awards: [{ title: "Best Film", laurel: "/winners/best-film.png" }],
  },
  {
    id: "1970",
    title: "Hallucination Products",
    directors: "Thiago Espeche & Ammiel Fazzari",
    poster: "/finalists/1970.webp",
    awards: [{ title: "Special Jury Award", laurel: "/winners/special-jury-award.png" }],
  },
  {
    id: "2226",
    title: "BOUSSADIA",
    directors: "Zoubeir Jlassi",
    poster: "/finalists/2226.webp",
    awards: [{ title: "Best Costume Design", laurel: "/winners/best-costume-design.png" }],
  },
  {
    id: "2226",
    title: "BOUSSADIA",
    directors: "Zoubeir Jlassi",
    poster: "/finalists/2226.webp",
    awards: [{ title: "Best Worldbuilding", laurel: "/winners/best-worldbuilding.png" }],
  },
  {
    id: "2049",
    title: "WHISPER",
    directors: "Barış Özaltaş",
    poster: "/finalists/2049.webp",
    landscape: true,
    awards: [{ title: "Best Narrative", laurel: "/winners/best-narrative.png" }],
  },
  {
    id: "2717",
    title: "Wires",
    directors: "Massimiliano Russo",
    poster: "/finalists/2717.webp",
    awards: [{ title: "Best Visual", laurel: "/winners/best-visual.png" }],
  },
  {
    id: "2107",
    title: "WALLET WARS",
    directors: "Pitak Ruangrojsin",
    poster: "/finalists/2107.webp",
    awards: [{ title: "Best Creative Use of AI", laurel: "/winners/best-creative-use-of-ai.png" }],
  },
  {
    id: "1982",
    title: "The Finding",
    directors: "Vincenzo Lo Re",
    poster: "/finalists/1982.webp",
    awards: [{ title: "Best Music / Sound", laurel: "/winners/best-music-sound.png" }],
  },
  {
    id: "1958",
    title: "TERRAGNI",
    directors: "Eric Honghao Zhao",
    poster: "/finalists/1958.webp",
    awards: [{ title: "Best Immersive Experience", laurel: "/winners/best-immersive-experience.png" }],
  },
  {
    id: "2574",
    title: "Glamourexia",
    directors: "John Paul DeFazio",
    poster: "/finalists/2574.webp",
    awards: [{ title: "Best Character", laurel: "/winners/best-character.png" }],
  },
];

