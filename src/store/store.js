import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import { STORAGE_KEY } from "../utils/constants";

export const store = configureStore({ reducer: { tasks: tasksReducer } });

store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().tasks.items));
});
