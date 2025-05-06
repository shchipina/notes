import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { DeletedNote, Note } from "../types/note";

type NotesState = {
  notes: Note[];
  history: DeletedNote[]
};

const presistedState = localStorage.getItem("notesAppState");

const initialState: NotesState = presistedState
  ? JSON.parse(presistedState)
  : {
    notes: [],
    history: []
  };

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },

    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);

      if (index !== -1) {
        state.notes[index] = action.payload
      }

    },

    deleteNote: (state, action: PayloadAction<number>) => {
      const index = state.notes.findIndex(note => note.id === action.payload);
      if (index !== -1) {
        const deletedNote = state.notes.splice(index, 1)[0];

        state.history.push({
          ...deletedNote,
          deletedAt: Date.now()
        });
      }
    },

    restoreNote: (state, action: PayloadAction<number>) => {
      const index = state.history.findIndex(note => note.id === action.payload);

      if (index !== -1) {
        const restoredNote = state.history.splice(index, 1)[0];

        delete restoredNote.deletedAt;
        state.notes.push(restoredNote)
      }
    },

    deleteHistoryNote: (state, action: PayloadAction<number>) => {
      state.history = state.history.filter(note => note.id !== action.payload)
    },

    clearOldHistory: (state) => {
      const now = Date.now();
      state.history = state.history.filter(note => (
        now - (note.deletedAt ?? 0) < 30 * 24 * 60 * 60 * 1000
      ))
    }
  }
});

export const {
  addNote,
  deleteNote,
  updateNote,
  restoreNote,
  deleteHistoryNote,
  clearOldHistory
} = notesSlice.actions;
export default notesSlice.reducer;

export const selectNotes = (state: RootState) => state.notes.notes;
