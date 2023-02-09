import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm /> calls noteService.create", async () => {
  const user = userEvent.setup();
  const noteService = jest.fn();
  noteService.create = jest.fn();
  const handleSetNotification = jest.fn();
  const handleSetNotes = jest.fn();
  const notes = [];
  const noteFormRef = jest.fn();
  noteFormRef.current = jest.fn();
  noteFormRef.current.toggleVisibility = jest.fn();

  render(
    <NoteForm
      noteService={noteService}
      handleSetNotes={handleSetNotes}
      handleSetNotification={handleSetNotification}
      notes={notes}
      noteFormRef={noteFormRef}
    />
  );

  const input = screen.getByPlaceholderText("Note content");
  const sendButton = screen.getByText("Save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(noteService.create.mock.calls).toHaveLength(1);
  expect(noteService.create.mock.calls[0][0].content).toBe("testing a form...");
});
