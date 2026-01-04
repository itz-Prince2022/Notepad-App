import Note from "../Models/noteSchema.js";

// GET: Only fetch current user's notes
export const getNotesContoller = async (req, res) => {
    try {
        const { search } = req.query;
        // Filter by USER ID
        let query = { user: req.user._id }; 
        
        if (search) {
            query.$text = { $search: search };
        }

        const notes = await Note.find(query)
            // SORT ORDER IS CRITICAL:
            // 1. isPinned: -1 (True comes first)
            // 2. updatedAt: -1 (Newest comes next)
            .sort({ isPinned: -1, updatedAt: -1 });

        // const notes = await Note.find(query).sort({ updatedAt: -1 }).lean();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE: Attach user ID to new note
export const createNoteController = async (req, res) => {
    try {
        // 1. Destructure ALL fields
        const { title, content, tags, isPinned } = req.body;
        const { user } = req;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        // 2. Create note with all fields
        const note = await Note.create({
            title,
            content,
            tags: tags || [], // Handle empty tags
            isPinned: isPinned || false,
            user: user._id
        });

        res.status(201).json({ note, message: "Note created successfully", success: true });
    } catch (error) {
        console.error("Create Error:", error); // Log exact error to terminal
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    // try {
    //     const { title, content } = req.body;
    //     const note = await Note.create({ 
    //         title, 
    //         content, 
    //         user: req.user._id // <--- IMPORTANT
    //     });
    //     res.status(201).json({ note, success: true });
    // } catch (error) {
    //     res.status(400).json({ error: error.message });
    // }
};

// UPDATE: Ensure user owns the note
export const updateNoteController = async (req, res) => {
    try {
        // 1. EXTRACT 'isPinned' FROM REQUEST
        // If you don't list it here, it gets ignored!
        const { title, content, tags, isPinned } = req.body; 
        const { id } = req.params;

        // 2. Prepare the object to update
        // We check if fields are provided to avoid overwriting with undefined
        const updateData = {
            title,
            content,
            tags,
            isPinned // <--- CRITICAL: Pass this to MongoDB
        };

        // 3. Find and Update
        const note = await Note.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { $set: updateData }, // $set ensures we update only specific fields
            { new: true } 
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ note, message: "Note updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    // try {
    //     const { title, content } = req.body;
    //     // Find by ID AND User (security check)
    //     const updatedNote = await Note.findOneAndUpdate(
    //         { _id: req.params.id, user: req.user._id }, 
    //         { title, content },
    //         { new: true, runValidators: true }
    //     );
    //     if (!updatedNote) return res.status(404).json({ message: "Note not found or unauthorized" });
    //     res.status(200).json({ note: updatedNote, success: true });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
};

// DELETE: Ensure user owns the note
export const deleteNoteController = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });
        if (!deletedNote) return res.status(404).json({ message: "Note not found or unauthorized" });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};