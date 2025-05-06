import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import type { Note } from "../types/note";
import { useAppDispatch } from "../app/hooks";
import { deleteNote } from "../app/notesSlice";

type Props = {
  note: Note;
  setSelectedNote: (note: Note) => void;
}

const NoteItem: React.FC<Props> = ({ note, setSelectedNote }) => {

  const dispatch = useAppDispatch();

  return (
    <article className="p-5 mb-4 border-b hover:shadow-lg transition-all duration-200">
  <h4 className="text-lg font-semibold text-white mb-2">{note.title}</h4>
  <p className="text-gray-600 mb-4">{note.description}</p>

  <div className="flex items-center gap-3">
    <button
      onClick={() => dispatch(deleteNote(note.id))}
      className="text-red-500 hover:text-red-700 text-xl transition-colors duration-150"
      title="Delete"
    >
      <MdDeleteForever />
    </button>

    <button
      onClick={() => setSelectedNote(note)}
      className="text-blue-500 hover:text-blue-700 text-xl transition-colors duration-150"
      title="Edit"
    >
      <FaPencilAlt />
    </button>
  </div>
</article>

  )
}

export default NoteItem;
