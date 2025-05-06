import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import type { Note } from "../types/note";
import { addNote, updateNote } from "../app/notesSlice";

type Props = {
  selectedNote: Note | null,
  setSelectedNote: (note: Note | null) => void,
}

const NoteForm: React.FC<Props> = ({ selectedNote, setSelectedNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setDescription(selectedNote.description)
    }
  }, [selectedNote])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote: Note = {
      id: selectedNote?.id ?? Date.now(),
      title,
      description,
    };

    if (selectedNote) {
      dispatch(updateNote(newNote))
    } else {
      dispatch(addNote(newNote));
    }

    setTitle('');
    setDescription('');
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setSelectedNote(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-[500px] gap-5">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2"
        placeholder="Title..."
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border rounded p-2 h-[200px]"
        placeholder="Description..."
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-900 py-2 rounded w-full">
          {selectedNote ? "Update Note" : "Create Note"}
        </button>
        {selectedNote && (
          <button
            className="w-[30%] bg-white text-blue-900 rounded"
            onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;