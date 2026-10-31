export const COLUMNS = [
  { id: "todo", label: "Not started", dot: "bg-tertiary", statColor: "text-tertiary" },
  { id: "progress", label: "In progress", dot: "bg-secondary", statColor: "text-secondary" },
  { id: "done", label: "Done", dot: "bg-primary", statColor: "text-primary" },
];

export const PRIORITIES = ["High", "Medium", "Low"];

export const PRIORITY_STYLES = {
  High: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Low: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

export const STORAGE_KEY = "tasknest-tasks";
