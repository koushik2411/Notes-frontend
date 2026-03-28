import { useState } from "react";
import API from "../services/api";
import NoteModal from "./NoteModal";

export default function NoteCard({ note, refresh }) {
  const [open, setOpen] = useState(false);

  const deleteNote = async () => {
    try {
      const res = await API.delete(`/notes/${note._id}`);
      console.log("DELETE SUCCESS:", res.data);
      refresh();
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className=" w-full">
        <div style={{ backgroundColor: note.color }} 
        className=" p-2 pb-3 flex flex-col rounded-lg  md:hover:scale-[1.04] transition">
          {/* Title */}
          <h3 className=" font-semibold text-lg border-b text-slate-900">{note.title}</h3>

          {/* Content */}
          <p className=" h-36 md:h-44 text-slate-900">{note.content}</p>

          {/* Date */}
          <p className=" my-3 text-xs text-slate-900">{new Date(note.createdAt).toLocaleString()}</p>

          <div className=" flex items-center justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className=" py-1 px-4 bg-linear-to-b from-yellow-400 to-yellow-500 text-slate-100 shadow rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={deleteNote}
              className=" py-1 px-3 sm:px-5 bg-linear-to-b from-red-500 to-red-600 text-slate-100 shadow rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {open && (
        <NoteModal
          note={note} // ✅ IMPORTANT (small 'note')
          close={() => setOpen(false)}
          refresh={refresh}
        />
      )}
    </>
  );
}
