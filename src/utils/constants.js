export const COLUMNS = [
  {
    id: "todo",
    label: "Not started",
    dot: "bg-zinc-400",
    pill: "bg-zinc-800/90 text-zinc-200 border border-zinc-700/60",
    statColor: "text-zinc-300",
  },
  {
    id: "progress",
    label: "In progress",
    dot: "bg-sky-400",
    pill: "bg-sky-950/70 text-sky-200 border border-sky-800/60",
    statColor: "text-sky-300",
  },
  {
    id: "done",
    label: "Done",
    dot: "bg-emerald-400",
    pill: "bg-emerald-950/70 text-emerald-200 border border-emerald-800/60",
    statColor: "text-emerald-300",
  },
];

export const PRIORITIES = ["High", "Medium", "Low"];

export const PRIORITY_ORDER = {
  High: 1,
  Medium: 2,
  Low: 3,
};

export const PRIORITY_STYLES = {
  High: "bg-rose-950/70 text-rose-300 border border-rose-800/60",
  Medium: "bg-amber-950/70 text-amber-300 border border-amber-800/60",
  Low: "bg-emerald-950/70 text-emerald-300 border border-emerald-800/60",
};

export const STATUS_CARD_STYLES = {
  todo: "bg-[#161a18] border-[#29352c] hover:border-[#3e5043] shadow-sm",
  progress: "bg-[#121c27] border-[#1d3246] hover:border-[#2e4c69] shadow-sm",
  done: "bg-[#11231a] border-[#1b3d2d] hover:border-[#285740] shadow-sm",
};

export const STORAGE_KEY = "tasknest-tasks";
