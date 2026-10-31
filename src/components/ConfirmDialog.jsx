import React, { useEffect } from "react";

export default function ConfirmDialog({ open, onConfirm, onCancel }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-high rounded-2xl p-6 w-full max-w-sm border border-outline-variant/20 shadow-2xl">
        <h3 className="text-base font-semibold text-on-surface mb-2">Delete Task</h3>
        <p className="text-sm text-on-surface-variant mb-6">
          Delete this task? This can't be undone.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-rose-500 text-white hover:bg-rose-600 transition-colors cursor-pointer shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
