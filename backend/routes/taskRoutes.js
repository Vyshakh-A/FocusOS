// backend/routes/taskRoutes.js
import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, toggleTaskCompletion } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask); 

router.route("/:id")
    .patch(protect, updateTask)     
    .delete(protect, deleteTask);

router.patch("/:id/toggle", protect, toggleTaskCompletion);
export default router;