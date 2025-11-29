import Task from "../models/Tasks.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, duetime, category } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = await Task.create({
            title,
            description,
            priority,
            category,
            duetime,
            user: req.user.id
        });

        res.status(201).json({
            message: 'Task created successfully',
            newTask
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Tasks retrieved successfully',
            count: tasks.length,
            tasks
        });

        
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { title, category } = req.body;
        const taskId = req.params.id;

        if (!title) {
            return res.status(400).json({ message: "Title required" });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, user: req.user.id },
            { title, category },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            message: "Task updated",
            task: updatedTask
        });

    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Task.findOneAndDelete({ _id: id, user: req.user.id });

        if (!deleted) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({
            message: 'Task deleted successfully',
            deleted
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const toggleTaskCompletion = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findOne({ _id: taskId, user: req.user.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = !task.completed;
        await task.save();

        res.status(200).json({
            message: "Task status updated",
            task,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
