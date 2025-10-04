import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
  timestamps: true // This option adds `createdAt` and `updatedAt` fields
});

const notes = mongoose.model("notes", notesSchema);

export default notes;