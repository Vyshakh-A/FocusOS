import Task from "../models/Tasks.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, duetime } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = await Task.create({
            title,
            description,
            priority,
            duetime,
            user: req.user.id
        })

        res.status(201).json({
            message: 'Task created successfully',
            newTask
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


export const getTasks = async (req, res) => {
    try {   
        const tasks = await Task.find({user: req.user.id}).sort({createdAt: -1});

        res.status(200).json({
            message: 'Tasks retrieved successfully',
            count: tasks.length,
            tasks
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


export const updateTask = async (req, res) => {
    try {
        const {id} = req.params;

        const updated = await Task.findByIdAndUpdate(
            { _id: id, user: req.user.id },
            req.body,
            {new: true}
        )

        if(!updated) return res.status(404).json({message: 'Task not found'});

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}



export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Task.findOneAndDelete({ _id: id, user: req.user.id });

        if(!deleted) return res.status(404).json({message: 'Task not found'});

        res.status(200).json({
            message: 'Task deleted successfully',
            deleted
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
    
}