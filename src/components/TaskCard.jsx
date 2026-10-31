import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { PRIORITY_STYLES } from "../utils/constants";

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-surface-container border border-outline-variant/10 rounded-xl p-4 flex flex-col gap-3 group hover:border-primary/40 transition-all cursor-grab select-none ${
        isDragging ? "opacity-80 z-50 shadow-lg" : ""
      }`}
    >
      {/* Row 1 */}
      <div className="flex items-center justify-between">
        <span
          className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
            PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium
          }`}
        >
          {task.priority}
        </span>

        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-1">
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

      {/* Body */}
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-sm text-on-surface leading-snug">{task.title}</h3>
        {task.description && (
          <p className="text-[13px] text-on-surface-variant line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-outline-variant/10 pt-2 flex items-center justify-between text-[11px]">
        <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded font-medium">
          {task.tag || "General"}
        </span>

        {task.dueDate && (
          <div
            className={`flex items-center gap-1 font-medium ${
              isPastDue ? "text-rose-400" : "text-on-surface-variant"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{task.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
