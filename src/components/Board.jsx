import React from "react";
import { DndContext } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { moveTask } from "../store/tasksSlice";
import { COLUMNS, PRIORITY_ORDER } from "../utils/constants";
import Column from "./Column";

export default function Board({ search, onNew, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.tasks.items);
  const visible = tasks.filter((t) =>
    t.title.toLowerCase().includes((search || "").toLowerCase())
  );

  const handleDragEnd = ({ active, over }) => {
    if (over && active.data?.current?.status !== over.id) {
      dispatch(moveTask({ id: active.id, status: over.id }));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {COLUMNS.map((col) => {
          const colTasks = visible
            .filter((t) => t.status === col.id)
            .sort((a, b) => {
              const priorityA = PRIORITY_ORDER[a.priority] ?? 99;
              const priorityB = PRIORITY_ORDER[b.priority] ?? 99;
              return priorityA - priorityB;
            });

          return (
            <Column
              key={col.id}
              column={col}
              tasks={colTasks}
              onNew={onNew}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </DndContext>
  );
}
