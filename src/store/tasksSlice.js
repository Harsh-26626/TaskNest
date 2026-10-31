import { createSlice, nanoid } from "@reduxjs/toolkit";
import { STORAGE_KEY } from "../utils/constants";

const today = new Date().toISOString().split("T")[0];

const seed = [
  {
    id: "1",
    title: "Design problem fetching api for admin",
    description: "Plan and implement endpoints for problem management and admin dashboard.",
    author: "Harsh Ahuja",
    priority: "High",
    status: "todo",
    tag: "Backend",
    dueDate: today,
  },
  {
    id: "2",
    title: "Create Problems Provider and Problems page in admin app",
    description: "State management provider and interactive table for problems.",
    author: "Harsh Ahuja",
    priority: "Medium",
    status: "todo",
    tag: "Frontend",
    dueDate: today,
  },
  {
    id: "3",
    title: "Create a admin panel (admin app)",
    description: "Form, validation, user role management and error handling.",
    author: "Harsh Ahuja",
    priority: "High",
    status: "progress",
    tag: "Frontend",
    dueDate: today,
  },
  {
    id: "4",
    title: "Implement cursor based pagination - problem sets",
    description: "Optimize high volume problem list retrieval with cursor pagination.",
    author: "Harsh Ahuja",
    priority: "High",
    status: "done",
    tag: "Frontend",
    dueDate: today,
  },
  {
    id: "5",
    title: "Transform db calls from mysql2 to Prisma",
    description: "Migrate raw queries to type-safe Prisma client models and schemas.",
    author: "Harsh Ahuja",
    priority: "High",
    status: "done",
    tag: "Backend",
    dueDate: today,
  },
];

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length > 0) {
      // Ensure all loaded tasks have an author
      return saved.map((task) => ({
        ...task,
        author: task.author || "Harsh Ahuja",
      }));
    }
    return seed;
  } catch {
    return seed;
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: load() },
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (data) => ({
        payload: {
          ...data,
          id: nanoid(),
          author: (data.author && data.author.trim()) || "Harsh Ahuja",
          createdAt: new Date().toISOString(),
        },
      }),
    },
    updateTask: (state, { payload }) => {
      const i = state.items.findIndex((t) => t.id === payload.id);
      if (i !== -1) {
        state.items[i] = {
          ...state.items[i],
          ...payload,
          author: (payload.author && payload.author.trim()) || state.items[i].author || "Harsh Ahuja",
        };
      }
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
