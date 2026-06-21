// Shared color system for the product compositions.
// Base visuals are B&W (GREY); revealed/animated parts use VIVID.

export const VIVID = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#22c55e", // green
  "#14b8a6", // teal
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
] as const;

export const GREY = {
  ink: "#0a0a0a",
  dark: "#171717",
  mid: "#525252",
  text: "#737373",
  light: "#9a9a9a",
  rule: "#bfbfbf",
  line: "#ededed",
  faint: "#f7f7f7",
  paper: "#ffffff",
} as const;
