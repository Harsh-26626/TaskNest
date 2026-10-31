import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2, Calendar, CheckCircle2 } from "lucide-react";
import { PRIORITY_STYLES, STATUS_CARD_STYLES } from "../utils/constants";

function renderTagBadge(rawTag, index) {
  const tag = rawTag.trim();
  if (!tag) return null;

  const lower = tag.toLowerCase();
  let icon = null;
  let colorClass = "bg-zinc-800/80 text-zinc-300 border-zinc-700/60";

  if (lower.includes("front")) {
    icon = "💻";
    colorClass = "bg-sky-950/70 text-sky-200 border-sky-800/60";
  } else if (lower.includes("back")) {
    icon = "☁";
    colorClass = "bg-purple-950/70 text-purple-200 border-purple-800/60";
  } else if (lower.includes("admin")) {
    icon = "👩‍💼";
    colorClass = "bg-rose-950/70 text-rose-200 border-rose-800/60";
  } else if (lower.includes("devops")) {
    icon = "⚙️";
    colorClass = "bg-amber-950/70 text-amber-200 border-amber-800/60";
  }

  return (
    <span
      key={index}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${colorClass}`}
    >
      {icon && <span className="text-[10px]">{icon}</span>}
      <span>{tag}</span>
    </span>
  );
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { status: task.status },
  });

  const todayStr = new Date().toISOString().split("T")[0];
  const isPastDue = Boolean(task.dueDate && task.dueDate < todayStr && task.status !== "done");

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const statusStyle =
    STATUS_CARD_STYLES[task.status] || STATUS_CARD_STYLES.todo;

  const authorName = task.author || "Harsh Ahuja";
  const authorInitial = authorName.charAt(0).toUpperCase();

  // Split comma-separated tags if multiple
  const tagsList = (task.tag || "General")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-xl p-4 flex flex-col gap-2.5 group transition-all cursor-grab select-none border ${statusStyle} ${
        isDragging ? "opacity-80 z-50 shadow-2xl scale-[1.02]" : ""
      }`}
    >
      {/* Title + Action Buttons */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <CheckCircle2
            className={`w-4 h-4 shrink-0 mt-0.5 ${
              task.status === "done"
                ? "text-emerald-400"
                : task.status === "progress"
                ? "text-sky-400"
                : "text-emerald-500/80"
            }`}
          />
          <h3 className="font-semibold text-sm text-on-surface leading-snug break-words">
            {task.title}
          </h3>
        </div>

        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(task);
            }}
            className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Edit task"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(task.id);
            }}
            className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-rose-400 transition-colors cursor-pointer"
            title="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Description (if provided) */}
      {task.description && (
        <p className="text-[12px] text-on-surface-variant line-clamp-2 leading-relaxed pl-6">
          {task.description}
        </p>
      )}

      {/* Author Row (as shown in Notion template: (H) Harsh Ahuja) */}
      <div className="flex items-center gap-1.5 pl-6">
        <span className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700/80 text-[10px] flex items-center justify-center font-bold text-zinc-300">
          {authorInitial}
        </span>
        <span className="text-xs text-zinc-300/90 font-medium">{authorName}</span>
      </div>

      {/* Priority Pill */}
      <div className="pl-6 pt-0.5">
        <span
          className={`text-[11px] px-2 py-0.5 rounded font-medium inline-block border ${
            PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Tags and Due Date Row */}
      <div className="pl-6 pt-1 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {tagsList.map((tag, idx) => renderTagBadge(tag, idx))}
        </div>

        {task.dueDate && (
          <div
            className={`flex items-center gap-1 text-[11px] font-medium ml-auto ${
              isPastDue ? "text-rose-400 font-semibold" : "text-on-surface-variant/70"
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>{task.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
