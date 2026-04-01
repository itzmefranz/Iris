import chalk from "chalk";
import gradient from "gradient-string";

const themes = {
  galaxy: gradient(["#1B263B", "#6B7280", "#9D4EDD", "#C77DFF"]),
  aqua: gradient(["#00A8CC", "#48CAE4", "#90E0EF", "#ADE8F4"]),
  hacker: gradient(["#0D1B2A", "#1B263B", "#00FF00", "#40C057"]),
  flame: gradient(["#FF4500", "#FF6347", "#FFD700", "#FFA500"]),
  rose: gradient(["#FF69B4", "#FF8C94", "#FFC1CC", "#FFE4E1"]),
  sunflower: gradient(["#FFC107", "#FFCA28", "#FFD54F", "#FFECB3"]),
  default: gradient(["#4B5EAA", "#7B9FE7"]),
  sunset: gradient(["#FF512F", "#DD2476", "#FA7E1E", "#F83600"]),
  ocean: gradient(["#00C9FF", "#92FE9D", "#00C9FF"]),
  purpleDream: gradient(["#667eea", "#764ba2", "#a855f7", "#e0aaff"]),
  neon: gradient(["#00F260", "#0575E6", "#00F260"]),
  crimson: gradient(["#8B0000", "#DC143C", "#FF0000", "#FF6347"]),
  forest: gradient(["#134E5E", "#71B280", "#C4E17F", "#FFFDE7"]),
  candy: gradient(["#FFB6C1", "#FFC0CB", "#FF69B4", "#FF1493"]),
  midnight: gradient(["#232526", "#414345", "#2C3E50", "#4CA1AF"]),
  aurora: gradient(["#00c6ff", "#0072ff", "#ff7e5f", "#feb47b"]),
  lavender: gradient(["#B993D6", "#8CA6DB", "#C2B5E3", "#E6D6FC"]),
  matrix: gradient(["#000000", "#0F4C3A", "#00FF41", "#00FF41"]),
  peach: gradient(["#FFE5B4", "#FFB6C1", "#FF6961", "#FF4757"]),
  retro: gradient(["#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1"]),
  instagram: gradient(["#833AB4", "#FD1D1D", "#FCB045", "#F56040"]),
  pride: gradient([
    "#FF0018",
    "#FFA52C",
    "#FFFF41",
    "#008018",
    "#0000F9",
    "#86007D",
  ]),
  vaporwave: gradient(["#FF6AD5", "#C774E8", "#7F95F7", "#56C8F9"]),
  emerald: gradient(["#0B3D91", "#1E8A9A", "#3FD4A7", "#6FFFE9"]),
  coral: gradient(["#FF7F50", "#FF6347", "#FF4500", "#FF2D00"]),
  twilight: gradient(["#4A00E0", "#8E2DE2", "#FF6BFF", "#FFB3FF"]),
  citrus: gradient(["#FFE135", "#FF9F1C", "#FF7844", "#FF4D6D"]),
  arctic: gradient(["#1E3A5F", "#2B597A", "#86BBD8", "#B1E4E3"]),
  gold: gradient(["#B8860B", "#DAA520", "#FFD700", "#FFEA00"]),
  violet: gradient(["#4B0082", "#8A2BE2", "#DA70D6", "#EE82EE"]),
  spring: gradient(["#C9FFBF", "#FFAFBD", "#FFC3A0", "#FF677D"]),
} as const;

type _Themes = typeof themes;

export interface Themes extends _Themes {}

export type ThemeKeys = keyof Themes;

const themeCycle: ThemeKeys[] = [
  "galaxy",
  "aqua",
  "hacker",
  "flame",
  "rose",
  "sunflower",
  "sunset",
  "ocean",
  "purpleDream",
  "neon",
  "crimson",
  "forest",
  "candy",
  "midnight",
  "aurora",
  "lavender",
  "matrix",
  "peach",
  "retro",
  "instagram",
  "pride",
  "vaporwave",
  "emerald",
  "coral",
  "twilight",
  "citrus",
  "arctic",
  "gold",
  "violet",
  "spring",
];

const runSeed = Date.now();
const themeIndex = Math.abs(runSeed) % themeCycle.length;
const defaultThemeForThisRun: ThemeKeys = themeCycle[themeIndex];

export function log(category: string, message: unknown, theme?: ThemeKeys) {
  const selectedKey: ThemeKeys = theme ?? defaultThemeForThisRun;
  const selectedGradient = themes[selectedKey] ?? themes.default;
  const colorizedCategory = chalk.bold(selectedGradient(` ${category} `));
  console.log(`${colorizedCategory}`, message);
}