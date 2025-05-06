import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { Note } from "../types/note";
import NoteItem from "./NoteItem";
import { clearOldHistory } from "../app/notesSlice";

type Props = {
  
  setSelectedNote: (note: Note) => void,
}

const NoteList:React.FC<Props> = ({ setSelectedNote }) => {
  const notes = useAppSelector((state) => state.notes.notes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearOldHistory())
  }, []);

  return (
    <div>
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          setSelectedNote={setSelectedNote}
        />
      ))}
    </div>

  );
}

export default NoteList;
