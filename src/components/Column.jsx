import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

export default function Column({ column, tasks, onNew, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-surface-container-low/80 rounded-xl p-3.5 flex flex-col gap-3 min-h-[600px] border border-outline-variant/15 transition-all ${
        isOver ? "ring-2 ring-primary/50 bg-surface-container-low" : ""
      }`}
    >
      {/* Header matching Notion template */}
      <div className="flex items-center justify-between pb-1 px-1">
        <div className="flex items-center gap-2">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              column.pill || "bg-zinc-800 text-zinc-200"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${column.dot}`} />
            <span>{column.label}</span>
          </div>

          <span className="text-xs text-on-surface-variant/80 font-medium ml-0.5">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onNew?.(column.id)}
          className="p-1 rounded-md text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
          title={`Add task to ${column.label}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Add Button matching Notion template */}
      <button
        onClick={() => onNew?.(column.id)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-on-surface-variant/80 hover:text-on-surface hover:bg-surface-container-high/50 border border-dashed border-outline-variant/20 hover:border-outline-variant/40 transition-all cursor-pointer group"
      >
        <Plus className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
        <span>New task</span>
      </button>

      {/* Body with Cards */}
      <div className="flex flex-col gap-3 flex-1">
        {tasks.length === 0 ? (
          <div className="h-28 flex items-center justify-center text-xs text-outline/60 border border-dashed border-outline-variant/15 rounded-xl">
            No tasks in this column
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
