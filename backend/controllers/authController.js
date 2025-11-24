// backend/controllers/authController.js

import User from '../models/User.js';

export const register = async (req, res) => { // Register new user
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) return res.status(400).json({ message: 'Please provide all required fields' });

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({ message: 'User already exists' }); // 400 -> Bad Request from client

        const user = await User.create({ username, email, password});

        const token = user.generateToken();

        res.status(201).json ({ // 201 -> Resource created
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,

            },
        })
    } catch (e) {
        res.status(500).json({ message: 'Server Error', error: e.message });
    }
}


export const login = async (req, res) => { // Login existing user
    try {
        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json({ message: 'Please provide all required fields' });

        const user = await User.findOne({ email }).select('+password');

        if(!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);

        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials'});

        const token = user.generateToken();

        res.status(200).json({
            message: 'Login successful',
            token, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch(e) {
        res.status(500).json({ message: 'Server Error', error: e.message });
    }
}