import express from 'express';
import { googleLogin } from '../controllers/authController.js';

const router = express.Router();

// The route will be: POST /api/auth/google
router.post('/google', googleLogin);

export default router;