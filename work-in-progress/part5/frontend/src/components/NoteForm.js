import { useState } from "react";

export default function NoteForm({
  noteService,
  handleSetNotification,
  handleSetNotes,
  notes,
  noteFormRef,
}) {
  const [newNote, setNewNote] = useState("a new note...");

  function addNote(event) {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteFormRef.current.toggleVisibility();

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        handleSetNotes(notes.concat(returnedNote));
        setNewNote("");
      })
      .catch((error) => {
        handleSetNotification({
          class: "error",
          message: error.response.data.error,
        });
        setTimeout(() => handleSetNotification(null), 5000);
      });
  }

  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
