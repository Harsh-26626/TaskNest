import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import { addTask, updateTask } from "../store/tasksSlice";
import { COLUMNS, PRIORITIES } from "../utils/constants";

export default function TaskModal({ open, task, defaultStatus, onClose }) {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "todo",
    tag: "General",
    dueDate: today,
  });
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (open) {
      if (task) {
        setForm({
          title: task.title || "",
          description: task.description || "",
          priority: task.priority || "Medium",
          status: task.status || "todo",
          tag: task.tag || "General",
          dueDate: task.dueDate || today,
        });
      } else {
        setForm({
          title: "",
          description: "",
          priority: "Medium",
          status: defaultStatus || "todo",
          tag: "General",
          dueDate: today,
        });
      }
      setTitleError("");
    }
  }, [open, task, defaultStatus]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) {
      setTitleError("Title is required");
      return;
    }

    const payload = {
      ...form,
      title: trimmedTitle,
      tag: form.tag.trim() || "General",
    };

    if (task) {
      dispatch(updateTask({ id: task.id, ...payload }));
    } else {
      dispatch(addTask(payload));
    }
    onClose?.();
  };

  const inputStyle =
    "w-full bg-surface-container px-4 py-2.5 rounded-lg border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-on-surface placeholder:text-outline";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-high rounded-2xl p-6 w-full max-w-lg border border-outline-variant/20 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10 mb-5">
          <h2 className="text-lg font-semibold text-on-surface">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
              Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
                if (titleError) setTitleError("");
              }}
              placeholder="e.g. Design user profile page"
              className={`${inputStyle} ${titleError ? "border-rose-500 focus:ring-rose-500" : ""}`}
            />
            {titleError && (
              <p className="text-rose-400 text-xs mt-1 font-medium">{titleError}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Provide a brief summary of the task..."
              className={`${inputStyle} resize-none`}
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className={`${inputStyle} cursor-pointer`}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p} className="bg-surface-container">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={`${inputStyle} cursor-pointer`}
              >
                {COLUMNS.map((col) => (
                  <option key={col.id} value={col.id} className="bg-surface-container">
                    {col.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tag + Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
                Tag
              </label>
              <input
                type="text"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                placeholder="General"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className={`${inputStyle} [color-scheme:dark] cursor-pointer`}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-outline-variant/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-on-primary hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
