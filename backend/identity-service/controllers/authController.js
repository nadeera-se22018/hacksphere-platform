const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id), 
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: 'User registered successfully!'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        const validRoles = ['participant', 'judge', 'teacher'];

        if (!role || !validRoles.includes(role.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role selected.',
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        user.role = role.toLowerCase();
        await user.save();

        const newToken = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d',
            }
        );

        res.status(200).json({
            success: true,
            token: newToken,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Update Role Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

module.exports = { registerUser, authUser, getUserProfile, updateUserRole };