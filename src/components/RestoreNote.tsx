import { MdDeleteForever, MdOutlineRestore } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteHistoryNote, restoreNote } from "../app/notesSlice";

const RestoreNote = () => {
  const history = useAppSelector(state => state.notes.history);
  const dispatch = useAppDispatch();

  return (
    <>
      {history.length === 0 ? (
        <p>History is Empty</p>
      ) : (
        <div>
          {history.map(h => (
            <div key={h.id} className="border-b border-[#777] mt-6">
              <p className="text-[18px] font-medium mb-3">{h.title}</p>
              <p className="mb-4 text-[#777]">{h.description}</p>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => dispatch(deleteHistoryNote(h.id))}
                  className="text-red-500 hover:text-red-700 text-xl transition-colors duration-150 text-[22px]"
                  title="Delete"
                >
                  <MdDeleteForever />
                </button>
                <button
                  onClick={() => dispatch(restoreNote(h.id))}
                  className="text-[22px]"
                >
                  <MdOutlineRestore />
                </button>
              </div>
            </div>
          ))
          }
        </div>
      )}
    </>
  )
}

export default RestoreNote