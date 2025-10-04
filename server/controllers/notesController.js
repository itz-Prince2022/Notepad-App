import Note from "../Models/noteSchema.js";

// GET notes controller
export const getNotesContoller = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const notes = await Note.find({}).sort({ updatedAt: -1 });
            res.status(200).json(notes);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// POST note controller
export const createNoteController = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { title, content } = req.body;
            const note = new Note({ title, content });
            await note.save();
            res.status(201).json({ note, success: true });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false
        });
    }
}

// PATCH note controller
export const updateNoteController = async (req, res) => {
    try {
        if (req.method === 'PATCH') {
            const id = (req.params.id);
            const updatedNote = req.body;

            if (!id) return res.status(400).json({ message: 'Invalid ID', success: false });
            await Note.findByIdAndUpdate(id, updatedNote, { new: true })
                .then((note) => res.status(200).json({ note, success: true }))
                .catch((error) => res.status(404).json({ message: `Note not found!!! ${error.message}`, success: false }));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE note controller
export const deleteNoteController = async (req, res) => {
    try {
        if (req.method === 'DELETE') {
            const noteId = (req.params.id);
            await Note.findByIdAndDelete(noteId, { new: true })
            .then((note) => res.status(200).json({ note, success: true }))
            .catch((error) => res.status(404).json({ message: `Note not found!!! ${error.message}`, success: false }));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

