import React, { useState, useEffect } from 'react';

const NoteEditorModal = ({ isOpen, onClose, note, onSave, onDelete, onNewNoteClick }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // When the modal opens and a note is passed, populate the form
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      // For a new note, clear the form
      setTitle('');
      setContent('');
    }
  }, [note]);

  // Use a state variable to handle the transition effect
  const [showModal, setShowModal] = useState(false);

  // This useEffect handles the CSS transition states
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the DOM element exists before applying the transition
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave({ ...note, title, content });
  };

  const handleDelete = () => {
    onDelete(note._id);
  }

  const handleNewNote = async() => {
    await onNewNoteClick({title, content });
    setTitle('');
    setContent('');
  }

  return (
    <div className={`fixed inset-0 bg-gray-900/[.7] flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
      {/* MODAL CONTENT CARD: Added transform and scale for the animation */}
      <div className={`bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg ${showModal ? 'scale-100' : 'scale-95'}`}>
        {/* Modal Header */}
        <div className="bg-gray-100 px-4 py-3 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{note ? 'Edit Note' : 'New Note'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="note-title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your note title"
            />
          </div>
          <div>
            <label htmlFor="note-content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="note-content"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Start writing..."
            ></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
          {note && <button className="del-btn bg-red-600 text-2xl px-4 py-2 rounded-md hover:bg-red-700 cursor-default" onClick={handleDelete}>Delete Note</button>}
          <button
            onClick={note ? handleSave : handleNewNote}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditorModal;