import { createSlice, nanoid } from "@reduxjs/toolkit";
import { STORAGE_KEY } from "../utils/constants";

const today = new Date().toISOString().split("T")[0];

const seed = [
  { id: "1", title: "Design the project API", description: "Plan the endpoints for the first release.", priority: "High", status: "todo", tag: "Backend", dueDate: today },
  { id: "2", title: "Build login screen", description: "Form, validation and error states.", priority: "Medium", status: "progress", tag: "Frontend", dueDate: today },
  { id: "3", title: "Set up the repository", description: "Branch rules and README.", priority: "Low", status: "done", tag: "DevOps", dueDate: today },
];

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : seed;
  } catch {
    return seed;
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: load() },
  reducers: {
    addTask: {
      reducer: (state, action) => { state.items.push(action.payload); },
      prepare: (data) => ({
        payload: { ...data, id: nanoid(), createdAt: new Date().toISOString() },
      }),
    },
    updateTask: (state, { payload }) => {
      const i = state.items.findIndex((t) => t.id === payload.id);
      if (i !== -1) state.items[i] = { ...state.items[i], ...payload };
    },
    deleteTask: (state, { payload: id }) => {
      state.items = state.items.filter((t) => t.id !== id);
    },
    moveTask: (state, { payload: { id, status } }) => {
      const task = state.items.find((t) => t.id === id);
      if (task) task.status = status;
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
