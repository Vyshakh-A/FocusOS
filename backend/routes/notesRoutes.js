import express from 'express';
import { getTodayNote, saveTodayNote } from '../controllers/notesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/today',protect, getTodayNote);
router.put('/today',protect, saveTodayNote);

export default router;


