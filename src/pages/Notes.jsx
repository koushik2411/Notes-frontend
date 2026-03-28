import { useEffect, useState } from "react";
import API from "../services/api";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import { SlNote } from "react-icons/sl";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    try {
        const res = await API.get("/notes", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        setNotes(res.data);

    } catch (err) {
        console.log("FETCH ERROR:", err.response?.data || err.message);
    }
};

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className=" py-2 px-3 h-full min-h-screen flex flex-col gap-5 bg-slate-200 text-slate-900 dark:text-slate-100 dark:bg-slate-900">

      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" p-2 border w-full rounded-lg outline-none mt-2"
      />

      {/* Add Note Button */}
      <button
        onClick={() => setOpen(true)}
        className=" flex gap-2 items-center font-semibold bg-linear-to-b from-slate-800 to-slate-900 dark:bg-linear-to-b dark:from-blue-500 dark:to-blue-600 text-slate-100 dark:text-white py-3 px-5 fixed bottom-18 right-8 rounded-lg shadow-lg"
      >
        Add Note <SlNote />
      </button>

      {/* Notes Grid */}
      <div className=" md:px-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3 md:gap-5">
        {filteredNotes.map((note) => (
          <NoteCard key={note._id} note={note} refresh={fetchNotes} />
        ))}
      </div>

      {/* Modal */}
      {open && <NoteModal close={() => setOpen(false)} refresh={fetchNotes} />}
    </div>
  );
}
