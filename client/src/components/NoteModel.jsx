import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save, Tag, Loader2 } from 'lucide-react'; // Import Loader2
import { BASE_URL } from '../utils/constants'; // Ensure you import BASE_URL

const NoteModel = ({ isOpen, onClose, noteToEdit, refreshNotes }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [error, setError] = useState(null);
    
    // NEW: Loading state to prevent double clicks
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
            setTagInput(noteToEdit.tags ? noteToEdit.tags.join(", ") : "");
        } else {
            setTitle("");
            setContent("");
            setTagInput("");
        }
        setError(null); // Clear errors on open
    }, [noteToEdit, isOpen]);

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            setError("Title and content are required");
            return;
        }

        // 1. Prevent double submission
        if (isSubmitting) return;

        try {
            setIsSubmitting(true); // Lock the button
            setError(null);

            const tagsArray = tagInput.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);

            if (noteToEdit) {
                await axios.patch(`${BASE_URL}/api/notes/${noteToEdit._id}`, {
                    title, content, tags: tagsArray 
                });
            } else {
                await axios.post(`${BASE_URL}/api/notes`, {
                    title, content, tags: tagsArray 
                });
            }

            refreshNotes(); 
            onClose();      
        } catch (error) {
            console.error("Save failed:", error);
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            // 2. Unlock the button (even if it failed)
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 transition-opacity">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
                
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        {noteToEdit ? "Edit Note" : "New Note"}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-5">
                    {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
                    
                    <input 
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-2xl font-bold text-gray-800 placeholder-gray-300 border-none outline-none w-full bg-transparent"
                    />
                    
                    <textarea 
                        placeholder="Start typing your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="text-gray-600 text-lg leading-relaxed placeholder-gray-300 border-none outline-none w-full bg-transparent resize-none h-60 scrollbar-thin scrollbar-thumb-gray-200"
                    />
                    
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-50 transition-all">
                         <Tag className="w-4 h-4 text-gray-400" />
                         <input 
                            type="text" 
                            placeholder="Tags (e.g., work, ideas)"
                            className="text-sm bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                         />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 bg-gray-50/50 flex justify-end gap-3 border-t border-gray-100">
                    <button onClick={onClose} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors">
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        disabled={isSubmitting} // 3. Disable native click
                        className={`px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {/* 4. Show Loader or Icon */}
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSubmitting ? "Saving..." : "Save Note"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteModel;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { X, Plus, Save, Tag } from 'lucide-react';
// import { BASE_URL } from '../utils/constants';

// const NoteModel = ({ isOpen, onClose, noteToEdit, refreshNotes }) => {
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [tagInput, setTagInput] = useState(""); // <--- CHANGED: Manage tags as a string first
//     const [error, setError] = useState(null);

//     // Populate fields when editing
//     useEffect(() => {
//         if (noteToEdit) {
//             setTitle(noteToEdit.title);
//             setContent(noteToEdit.content);
//             // Convert Array back to String for the input field
//             setTagInput(noteToEdit.tags ? noteToEdit.tags.join(", ") : "");
//         } else {
//             setTitle("");
//             setContent("");
//             setTagInput("");
//         }
//     }, [noteToEdit, isOpen]);

//     const handleSave = async () => {
//         if (!title.trim() || !content.trim()) {
//             setError("Title and content are required");
//             return;
//         }

//         try {
//             setError(null);

//             // PROCESS TAGS: Split string by comma, trim spaces, remove empty tags
//             const tagsArray = tagInput
//                 .split(",")
//                 .map(tag => tag.trim())
//                 .filter(tag => tag.length > 0);

//             if (noteToEdit) {
//                 // UPDATE
//                 await axios.patch(`${BASE_URL}/api/notes/${noteToEdit._id}`, {
//                     title, 
//                     content, 
//                     tags: tagsArray // Send the clean array
//                 });
//             } else {
//                 // CREATE
//                 await axios.post(`${BASE_URL}/api/notes`, {
//                     title, 
//                     content, 
//                     tags: tagsArray 
//                 });
//             }

//             refreshNotes(); 
//             onClose();      
//         } catch (error) {
//             console.error("Save failed:", error);
//             setError(error.response?.data?.message || "Something went wrong");
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
                
//                 {/* Header */}
//                 <div className="flex justify-between items-center p-4 border-b border-gray-100">
//                     <h2 className="text-xl font-bold text-gray-700">
//                         {noteToEdit ? "Edit Note" : "New Note"}
//                     </h2>
//                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                         <X className="w-5 h-5 text-gray-500" />
//                     </button>
//                 </div>

//                 {/* Body */}
//                 <div className="p-6 flex flex-col gap-4">
//                     {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}
                    
//                     {/* Title */}
//                     <input 
//                         type="text"
//                         placeholder="Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         className="text-2xl font-bold text-gray-800 placeholder-gray-400 border-none outline-none w-full bg-transparent"
//                     />
                    
//                     {/* Content */}
//                     <textarea 
//                         placeholder="Start typing..."
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                         className="text-gray-600 text-lg leading-relaxed placeholder-gray-400 border-none outline-none w-full bg-transparent resize-none h-64"
//                     />
                    
//                     {/* Tags Input - Now works smoothly */}
//                     <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
//                          <Tag className="w-4 h-4 text-gray-400" />
//                          <input 
//                             type="text" 
//                             placeholder="Add tags (comma separated, e.g., work, urgent)"
//                             className="text-sm bg-transparent outline-none flex-1 text-gray-600 placeholder-gray-400"
//                             value={tagInput}
//                             onChange={(e) => setTagInput(e.target.value)}
//                          />
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="p-4 bg-gray-50 flex justify-end gap-3">
//                     <button onClick={onClose} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors">
//                         Cancel
//                     </button>
//                     <button 
//                         onClick={handleSave} 
//                         className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
//                     >
//                         <Save className="w-4 h-4" />
//                         Save Note
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NoteModel;












// import React, { useState, useEffect } from 'react';

// const NoteEditorModal = ({ isOpen, onClose, note, onSave, onDelete, onNewNoteClick }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     // When the modal opens and a note is passed, populate the form
//     if (note) {
//       setTitle(note.title);
//       setContent(note.content);
//     } else {
//       // For a new note, clear the form
//       setTitle('');
//       setContent('');
//     }
//   }, [note]);

//   // Use a state variable to handle the transition effect
//   const [showModal, setShowModal] = useState(false);

//   // This useEffect handles the CSS transition states
//   useEffect(() => {
//     if (isOpen) {
//       // Small delay to ensure the DOM element exists before applying the transition
//       setTimeout(() => setShowModal(true), 10);
//     } else {
//       setShowModal(false);
//     }
//   }, [isOpen]);

//   // If the modal is not open, don't render anything
//   if (!isOpen) {
//     return null;
//   }

//   const handleSave = () => {
//     onSave({ ...note, title, content });
//   };

//   const handleDelete = () => {
//     onDelete(note._id);
//   }

//   const handleNewNote = async() => {
//     await onNewNoteClick({title, content });
//     setTitle('');
//     setContent('');
//   }

//   return (
//     <div className={`fixed inset-0 bg-gray-900/[.7] flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
//       {/* MODAL CONTENT CARD: Added transform and scale for the animation */}
//       <div className={`bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg ${showModal ? 'scale-100' : 'scale-95'}`}>
//         {/* Modal Header */}
//         <div className="bg-gray-100 px-4 py-3 flex justify-between items-center border-b border-gray-200">
//           <h3 className="text-xl font-semibold text-gray-900">{note ? 'Edit Note' : 'New Note'}</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="p-6">
//           <div className="mb-4">
//             <label htmlFor="note-title" className="block text-sm font-medium text-gray-700">Title</label>
//             <input
//               type="text"
//               id="note-title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="Your note title"
//             />
//           </div>
//           <div>
//             <label htmlFor="note-content" className="block text-sm font-medium text-gray-700">Content</label>
//             <textarea
//               id="note-content"
//               rows="10"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="Start writing..."
//             ></textarea>
//           </div>
//         </div>

//         {/* Modal Footer */}
//         <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
//           {note && <button className="del-btn bg-red-600 text-2xl px-4 py-2 rounded-md hover:bg-red-700 cursor-default" onClick={handleDelete}>Delete Note</button>}
//           <button
//             onClick={note ? handleSave : handleNewNote}
//             className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Save Note
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteEditorModal;