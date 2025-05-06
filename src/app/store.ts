import { configureStore } from "@reduxjs/toolkit";
import notesReduser from "./notesSlice";

export const store = configureStore({
  reducer: {
    notes: notesReduser,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("notesAppState", JSON.stringify(state.notes))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

