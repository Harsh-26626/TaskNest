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
      className={`bg-surface-container-low rounded-xl p-4 flex flex-col gap-4 min-h-[600px] border border-outline-variant/10 transition-all ${
        isOver ? "ring-1 ring-primary/40 bg-surface-container-low/90" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-outline-variant/10">
        <div className="flex items-center gap-2.5">
          <span className={`w-3 h-3 rounded-full ${column.dot}`} />
          <h2 className="font-semibold text-sm text-on-surface">{column.label}</h2>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onNew?.(column.id)}
          className="p-1 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          title={`Add task to ${column.label}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 flex-1">
        {tasks.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-sm text-outline border border-dashed border-outline-variant/20 rounded-xl">
            No tasks
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
