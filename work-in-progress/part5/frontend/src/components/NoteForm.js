import { useState } from "react";

export default function NoteForm({
  noteService,
  handleSetNotification,
  handleSetNotes,
  notes,
  noteFormRef,
}) {
  const [newNote, setNewNote] = useState("");

  async function addNote(event) {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: true,
    };

    noteFormRef.current.toggleVisibility();

    try {
      const returnedNote = await noteService.create(noteObject);
      handleSetNotes(notes.concat(returnedNote));
      setNewNote("");
    } catch (exception) {
      handleSetNotification({
        class: "error",
        message: exception.response.data.error,
      });
      setTimeout(() => handleSetNotification(null), 5000);
    }
  }

  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
        placeholder="Note content"
      />
      <button type="submit">Save</button>
    </form>
  );
}
