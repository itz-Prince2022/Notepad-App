import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import NoteCard from './NoteCard'; // Assuming you have this component
import NoteModel from './NoteModel'; // Assuming you have this (Edit/Add Modal)
import axios from 'axios';
import { Plus, SearchX } from 'lucide-react'; // Import icons
// import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../utils/constants';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // SEARCH STATE
    const [searchQuery, setSearchQuery] = useState(""); 

    // Fetch Notes Function (Accepts an optional query)
    const fetchNotes = async (query = '') => {
        try {
            setIsLoading(true);
            // Send search query to backend  http://localhost:3000
            const { data } = await axios.get(`${BASE_URL}/api/notes?search=${query}`);
            setNotes(data.notes || data); // Handle { notes: [] } or just []
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // The Debounce Effect (Google-Level Logic)
    useEffect(() => {
        // Set a timer to fetch notes after 500ms
        const delayDebounceFn = setTimeout(() => {
            fetchNotes(searchQuery);
        }, 500); // Wait 500ms after user stops typing

        // Cleanup: If user types again before 500ms, cancel the previous timer
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]); // Run this effect whenever 'searchQuery' changes

    // CRUD Handlers (Keep your existing ones) 
    const handleAddNote = () => {
        setSelectedNote(null);
        setIsModalOpen(true);
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/notes/${id}`);
            // Remove from UI immediately (Optimistic UI)
            setNotes(prev => prev.filter(n => n._id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    // Inside src/components/Notes.jsx

    const handlePinNote = async (note) => {
        try {
            const newIsPinned = !note.isPinned; // Toggle status

            // UPDATE UI INSTANTLY (Optimistic Update)
            setNotes(prevNotes => {
                // Update the specific note
                const updatedList = prevNotes.map(n => 
                    n._id === note._id ? { ...n, isPinned: newIsPinned } : n
                );

                // Re-sort the list immediately so the note jumps to top/bottom
                return updatedList.sort((a, b) => {
                    // If 'a' is pinned and 'b' is not, 'a' goes first (-1)
                    if (a.isPinned === b.isPinned) {
                        // If pin status is same, sort by date (newest first)
                        return new Date(b.updatedAt) - new Date(a.updatedAt);
                    }
                    return a.isPinned ? -1 : 1;
                });
            });

            // SEND TO SERVER
            await axios.patch(`${BASE_URL}/api/notes/${note._id}`, {
                isPinned: newIsPinned
            });

        } catch (error) {
            console.error("Pinning failed:", error);
            // If error, just reload original data
            fetchNotes(searchQuery); 
        }
      };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Pass Search Props to Navbar */}
            <Navbar 
                onNewNoteClick={handleAddNote} 
                onSearch={setSearchQuery} 
                searchQuery={searchQuery}
            />

            <div className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 px-1">
                    {searchQuery ? `Results for "${searchQuery}"` : "My Notes"}
                </h1>

                {/* Loading State */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                         {[1,2,3].map(i => (
                             <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
                         ))}
                    </div>
                ) : (
                    <>
                        {/* Empty State (No Search Results) */}
                        {notes.length === 0 ? (
                             <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                                {searchQuery ? (
                                    <>
                                        <SearchX className="w-16 h-16 mb-4 text-gray-300" />
                                        <p className="text-lg">No notes found matching "{searchQuery}"</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                            <Plus className="w-8 h-8 text-blue-500" />
                                        </div>
                                        <p className="text-lg font-medium text-gray-600">Create your first note!</p>
                                    </>
                                )}
                             </div>
                        ) : (
                            /* Grid Layout */
                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mx-auto">
                                {notes.map((note) => (
                                    <NoteCard 
                                        key={note._id} 
                                        note={note} 
                                        onEdit={() => handleEditNote(note)}
                                        onDelete={() => handleDeleteNote(note._id)}
                                        onPin={() => handlePinNote(note)} // Add pin logic later if needed
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
            <NoteModel 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                refreshNotes={() => fetchNotes(searchQuery)} // <--- ADD THIS LINE
                noteToEdit={selectedNote}
            />
            )}
        </div>
    );
};

export default Notes;













// import { useState, useEffect } from "react";
// import axios from "axios";
// import NoteCard from "./NoteCard";
// import NoteEditorModal from "./NoteModel";
// import Navbar from "./Navbar";

// function Notes() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [notes, setNotes] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/notes/")
//       .then((res) => {
//         setNotes(res.data);
//         setIsLoading(false); // Set loading to false on success
//       })
//       .catch((err) => {
//         console.error(err);
//         setIsLoading(false); // Also set to false on error
//       });
//   }, []);

//   // Function to handle opening the modal for a NEW note
//   const handleOpenModalForNewNote = () => {
//     setSelectedNote(null); // Set selectedNote to null to indicate a new note
//     setIsModalOpen(true);
//   };

//   const handleOpenModal = (note = null) => {
//     setSelectedNote(note); // Set the note to be edited, or null for a new one
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedNote(null);
//   };

//   const handleSaveNote = async (updatedNote) => {
//     if (!updatedNote || !updatedNote._id) {
//       console.error("Error: Trying to update a note without an ID");
//       return;
//     }
//     // API call to save or update the note
//     await axios
//       .patch(`http://localhost:3000/api/notes/${updatedNote._id}`, updatedNote)
//       .then((res) => {
//         // Update the notes array with the updated note
//         const updatedNotes = notes.map((note) =>
//           note._id === updatedNote._id ? updatedNote : note
//         );
//         setNotes(updatedNotes);
//         handleCloseModal();
//       })
//       .catch((err) => {
//         console.log(err);
//         handleCloseModal();
//       });
//   };

//   const handleDeleteNote = async (noteId) => {
//     // API call to delete the note
//     await axios
//       .delete(`http://localhost:3000/api/notes/${noteId}`)
//       .then(() => {
//         // Remove the deleted note from the notes array
//         const updatedNotes = notes.filter((note) => note._id !== noteId);
//         setNotes(updatedNotes);
//         handleCloseModal();
//       })
//       .catch((err) => {
//         console.log(err);
//         handleCloseModal();
//       });
//   };

//   const layoutNotes = () => {
//     // Layout notes in a grid for better readability
//     return <div className="mt-19 columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
//       {notes.length > 0 ? (
//         notes.map((note) => (
//           <div
//             key={note._id}
//             onClick={() => handleOpenModal(note)}
//             className="cursor-pointer w-auto h-auto"
//           >
//             <NoteCard
//               key={note._id}
//               title={note?.title}
//               content={note?.content}
//               created_at={note?.updatedAt}
//             />
//           </div>
//         ))
//       ) : (
//         <p className="mt-19">No notes found. Create your first note!</p>
//       )}
//     </div>;
//   };

//   const handleNewNote = async ({ title, content }) => {
//     await axios
//       .post("http://localhost:3000/api/notes/", { title, content })
//       .then((res) => {
//         setNotes([ res.data.note, ...notes]);
//         handleCloseModal();
//       })
//       .catch((err) => {
//         console.error(err);
//         handleCloseModal();
//       });
//   };

//   return (
//     <>
//       <Navbar onNewNoteClick={handleOpenModalForNewNote} 
//         onSearch={setSearchQuery}    // <--- Pass the setter function
//         searchQuery={searchQuery}
//       />

//       {isLoading ? (
//         <p className="mt-19 p-4">Loading notes...</p>
//       ) : (
//         layoutNotes()
//       )}
      
//       {/* The Modal Component */}
//       <NoteEditorModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         note={selectedNote}
//         onSave={handleSaveNote}
//         onDelete={handleDeleteNote}
//         onNewNoteClick={handleNewNote}
//       />
//     </>
//   );
// }

// export default Notes;



















// // this was from line 120

//         // columns-2 md:columns-3 lg:columns-4 gap-4 p-4
//         // <div className="mt-19 columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
//         //   {notes.length > 0 ? (
//         //     notes.map((note) => (
//         //       <div
//         //         key={note._id}
//         //         onClick={() => handleOpenModal(note)}
//         //         className="cursor-pointer w-auto h-auto"
//         //       >
//         //         <NoteCard
//         //           key={note._id}
//         //           title={note?.title}
//         //           content={note?.content}
//         //           created_at={note?.updatedAt}
//         //         />
//         //       </div>
//         //     ))
//         //   ) : (
//         //     <p className="mt-19">No notes found. Create your first note!</p>
//         //   )}
//         // </div>