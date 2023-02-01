const Note = ({ note, toggleImportance }) => {
  const importanceLabel = note.important
    ? "make not important"
    : "make important";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{importanceLabel}</button>
    </li>
  );
};

export default Note;
