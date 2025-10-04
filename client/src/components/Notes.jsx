import { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import NoteEditorModal from "./NoteModel";
import Navbar from "./Navbar";

function Notes() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/notes/")
      .then((res) => {
        setNotes(res.data);
        setIsLoading(false); // Set loading to false on success
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Also set to false on error
      });
  }, []);

  // Function to handle opening the modal for a NEW note
  const handleOpenModalForNewNote = () => {
    setSelectedNote(null); // Set selectedNote to null to indicate a new note
    setIsModalOpen(true);
  };

  const handleOpenModal = (note = null) => {
    setSelectedNote(note); // Set the note to be edited, or null for a new one
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleSaveNote = async (updatedNote) => {
    // API call to save or update the note
    await axios
      .patch(`http://localhost:3000/api/notes/${updatedNote._id}`, updatedNote)
      .then((res) => {
        // Update the notes array with the updated note
        const updatedNotes = notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
        setNotes(updatedNotes);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        handleCloseModal();
      });
  };

  const handleDeleteNote = async (noteId) => {
    // API call to delete the note
    await axios
      .delete(`http://localhost:3000/api/notes/${noteId}`)
      .then(() => {
        // Remove the deleted note from the notes array
        const updatedNotes = notes.filter((note) => note._id !== noteId);
        setNotes(updatedNotes);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        handleCloseModal();
      });
  };

  const layoutNotes = () => {
    // Layout notes in a grid for better readability
    return <div className="mt-19 columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note._id}
            onClick={() => handleOpenModal(note)}
            className="cursor-pointer w-auto h-auto"
          >
            <NoteCard
              key={note._id}
              title={note?.title}
              content={note?.content}
              created_at={note?.updatedAt}
            />
          </div>
        ))
      ) : (
        <p className="mt-19">No notes found. Create your first note!</p>
      )}
    </div>;
  };

  const handleNewNote = async ({ title, content }) => {
    await axios
      .post("http://localhost:3000/api/notes/", { title, content })
      .then((res) => {
        setNotes([ res.data.note, ...notes]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
        handleCloseModal();
      });
  };

  return (
    <>
      <Navbar onNewNoteClick={handleOpenModalForNewNote} />

      {isLoading ? (
        <p className="mt-19 p-4">Loading notes...</p>
      ) : (
        layoutNotes()
      )}
      {/* The Modal Component */}
      <NoteEditorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        note={selectedNote}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
        onNewNoteClick={handleNewNote}
      />
    </>
  );
}

export default Notes;



















// this was from line 120

        // columns-2 md:columns-3 lg:columns-4 gap-4 p-4
        // <div className="mt-19 columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
        //   {notes.length > 0 ? (
        //     notes.map((note) => (
        //       <div
        //         key={note._id}
        //         onClick={() => handleOpenModal(note)}
        //         className="cursor-pointer w-auto h-auto"
        //       >
        //         <NoteCard
        //           key={note._id}
        //           title={note?.title}
        //           content={note?.content}
        //           created_at={note?.updatedAt}
        //         />
        //       </div>
        //     ))
        //   ) : (
        //     <p className="mt-19">No notes found. Create your first note!</p>
        //   )}
        // </div>