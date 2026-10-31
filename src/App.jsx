import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { deleteTask } from "./store/tasksSlice";
import Header from "./components/Header";
import StatsRow from "./components/StatsRow";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import ConfirmDialog from "./components/ConfirmDialog";

export default function App() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null or { task?: Task, status?: string }
  const [deleteId, setDeleteId] = useState(null); // string | null

  const handleNew = (status = "todo") => {
    setModal({ status });
  };

  const handleEdit = (task) => {
    setModal({ task });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      dispatch(deleteTask(deleteId));
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header
        search={search}
        onSearch={setSearch}
        onNew={handleNew}
      />

      <main className="max-w-7xl mx-auto pt-24 p-6 lg:p-12 flex flex-col gap-8">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-on-surface">
              Mission Operations Board
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Organize, track, and manage your team tasks with real-time updates.
            </p>
          </div>

          <button
            onClick={() => handleNew("todo")}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>

        {/* Stats Row */}
        <StatsRow />

        {/* Board */}
        <Board
          search={search}
          onNew={handleNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modals rendered only when state is set */}
        {modal && (
          <TaskModal
            open={Boolean(modal)}
            task={modal.task}
            defaultStatus={modal.status}
            onClose={handleCloseModal}
          />
        )}

        {deleteId && (
          <ConfirmDialog
            open={Boolean(deleteId)}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </main>
    </div>
  );
}
