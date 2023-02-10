import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";
import loginService from "./services/login";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const initialNotes = await noteService.getAll();
        setNotes(initialNotes);
      } catch (exception) {
        console.error(`Error getting initial notes: '${exception}'`);
        setNotification({
          class: "error",
          message: `Error getting initial notes: '${exception}'`,
        });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  function toggleImportanceOf(id) {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch(() => {
        setNotification({
          class: "error",
          message: `The note '${note.content}' was already deleted from the server`,
        });
        setTimeout(() => setNotification(null), 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <>
      <h1>Notes</h1>

      <Notification notification={notification} />

      <Togglable buttonLabel="log in / out">
        <LoginForm
          noteService={noteService}
          loginService={loginService}
          user={user}
          handleSetUser={(user) => setUser(user)}
          handleSetNotification={(n) => setNotification(n)}
        />
      </Togglable>
      {user !== null && (
        <Togglable buttonLabel="Add a new note" ref={noteFormRef}>
          <NoteForm
            noteService={noteService}
            handleSetNotes={(notes) => setNotes(notes)}
            handleSetNotification={(n) => setNotification(n)}
            notes={notes}
            noteFormRef={noteFormRef}
          />
        </Togglable>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note
            note={note}
            key={note.id}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <footer>
        <p>
          Note app, Department of Computer Science, University of Helsinki 2023
        </p>
      </footer>
    </>
  );
}
