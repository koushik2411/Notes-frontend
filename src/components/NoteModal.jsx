import { useEffect, useState } from "react";
import API from "../services/api";

export default function NoteModal({ close, refresh, note }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setColor(note.color || "#ffffff");
    }
  }, [note]);

  const handleSave = async () => {
    if (note) {
      // Update Note
      await API.put(`/notes/${note._id}`, { title, content, color });
    } else {
      // Create Note
      await API.post("/notes", { title, content, color });
    }

    refresh();
    close();
  };

  return (
    <div className=" h-full w-full top-0 left-0 fixed bg-[rgba(0,0,0,0.6)] backdrop-blur-[3px]">
      <div className=" py-1 px-2.5 mt-10 mx-auto w-[90vw] h-[93vh] rounded flex flex-col gap-2 text-slate-900 bg-slate-200 dark:bg-slate-900 dark:text-slate-100">
        <h3 className=" border-b font-semibold">
          {note ? "Edit Note" : "Create Note"}
        </h3>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" font-bold text-lg outline-none bg-slate-100 dark:bg-slate-800 p-1 rounded"
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className=" h-[80%] outline-none overflow-y-auto bg-slate-100 dark:bg-slate-800 p-1 resize-none rounded"
        />

        <div className=" w-full mt-3 flex items-center justify-center gap-5">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className=" border w-10 h-10 p-2 rounded-lg bg-linear-to-br 
         from-red-500 via-yellow-400 to-purple-600"
          />

          <button
            onClick={handleSave}
            className=" py-2 px-5 rounded-lg bg-linear-to-b from-emerald-400 to-emerald-600 text-slate-100"
          >
            Save
          </button>

          <button
            onClick={close}
            className=" py-2 px-5 rounded-lg bg-linear-to-b from-red-500 to-red-600 text-slate-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
