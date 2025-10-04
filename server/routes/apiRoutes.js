import { Router } from 'express';
import { createNoteController, deleteNoteController, getNotesContoller, updateNoteController } from '../controllers/notesController.js';

const router = Router();

// Add a GET route for retrieving all notes
router.get('/', getNotesContoller);
router.post('/', createNoteController);
router.patch('/:id', updateNoteController);
router.delete('/:id', deleteNoteController);


export default router;