import { useState } from "react";
import NoteForm from "../components/NoteForm"
import NoteList from "../components/NoteList";
import type { Note } from "../types/note";
import RestoreNote from "../components/RestoreNote";
import Modal from "../components/Modal";
import { FaHistory } from "react-icons/fa";

const HomePage = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="min-h-screenp-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        <div className=" p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-white">Add New Note</h1>
          <NoteForm
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
          />
        </div>

        <div className="p-8 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-6 text-blue-900">
              My Notes
            </h2>
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2"
              >
                <FaHistory />
                History
              </button>
              {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                  <RestoreNote />
                </Modal>
              )}

            </div>
          </div>
          <NoteList setSelectedNote={setSelectedNote} />
        </div>
      </div>
    </div>
  )
}

export default HomePage