import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    isPinned: { type: Boolean, default: false },
    tags: { 
        type: [String],
        default: [],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Text index for search
notesSchema.index({ title: 'text', content: 'text' });

export default mongoose.model("Note", notesSchema);