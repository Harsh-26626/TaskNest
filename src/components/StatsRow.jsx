import React from "react";
import { useSelector } from "react-redux";
import { LayoutGrid, ClipboardList, RefreshCw, CheckCircle2 } from "lucide-react";

export default function StatsRow() {
  const tasks = useSelector((state) => state.tasks.items);

  const total = tasks.length;
  const notStarted = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "progress").length;
  const completed = tasks.filter((t) => t.status === "done").length;

  const stats = [
    {
      label: "Total Tasks",
      count: total,
      icon: LayoutGrid,
      color: "text-primary",
    },
    {
      label: "Not Started",
      count: notStarted,
      icon: ClipboardList,
      color: "text-tertiary",
    },
    {
      label: "In Progress",
      count: inProgress,
      icon: RefreshCw,
      color: "text-secondary",
    },
    {
      label: "Completed",
      count: completed,
      icon: CheckCircle2,
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((s) => {
        const IconComponent = s.icon;
        return (
          <div
            key={s.label}
            className="bg-surface-container rounded-xl p-5 flex justify-between items-center border border-outline-variant/10 shadow-sm"
          >
            <div>
              <p className="text-xs text-on-surface-variant font-medium mb-1">{s.label}</p>
              <p className="text-xl font-semibold text-on-surface">{s.count}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center ${s.color}`}>
              <IconComponent className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
