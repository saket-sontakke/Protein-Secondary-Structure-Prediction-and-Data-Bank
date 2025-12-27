import express from "express";
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const router = express.Router();
const { ModifiedPathsSnapshot } = mongoose;

dotenv.config();
const ADMIN_KEY = process.env.ADMIN_KEY;

router.post('/signup', async (req, res) => {
    const { username, email, password, role, adminKey } = req.body; 
    const user = await User.findOne({ email });

    if (user) {
        return res.json({ message: "User already exists" });
    }

    if (role === 'Admin') {
        if (adminKey !== process.env.ADMIN_KEY) {
            return res.json({ message: "Invalid Admin key" });
        }
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashpassword,
        role 
    });

    await newUser.save();
    return res.json({ status: true, message: "New User added successfully" });
});


router.post('/login', async (req, res) => {
    const { email, password, role, adminKey } = req.body; 
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ message: "User doesn't exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
    }

    if (role === 'Admin') {
        if (user.role !== 'Admin') {
            return res.json({ message: "Unauthorized: You do not have Admin privileges" });
        }
        if (adminKey !== ADMIN_KEY) {
            return res.json({ message: "Invalid Admin key" });
        }
    }

    const token = jwt.sign({ username: user.username, role: user.role }, process.env.KEY, { expiresIn: '1h' });
    // res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.cookie('token', token, { 
        httpOnly: true, 
        secure: true,       // <--- REQUIRED for HTTPS
        sameSite: 'none',   // <--- REQUIRED for Cross-Site (Frontend <-> Backend)
        maxAge: 3600000     // 1 hour
    });
    
    return res.json({ status: true, message: "Login successful" });
});

router.post('/guest-login', (req, res) => {
    // 1. Generate a random temporary ID
    const guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
    
    // 2. Create a token exactly like you do for normal Login
    // But set the role to 'Guest' explicitly
    const token = jwt.sign(
        { username: "Guest", id: guestId, role: "Guest" }, 
        process.env.KEY, 
        { expiresIn: '1h' }
    );

    // 3. Set the cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    
    return res.json({ status: true, message: "Logged in as Guest" });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "User not registered" });
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            text: `${process.env.CLIENT_URL}/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "Error sending email" });
            } else {
                return res.json({ status: true, message: "Email sent" });
            }
        });

    } catch (err) {
        return res.json({ message: "Something went wrong" });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashpassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: id }, { password: hashpassword });

        return res.json({ status: true, message: "Password updated successfully" });
    } catch (err) {
        return res.json({ message: "Invalid token" });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    return res.json({ status: true, message: "Logged out successfully" });
});

router.get('/verifyToken', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ status: false });
    }

    try {
        jwt.verify(token, process.env.KEY);
        return res.json({ status: true });
    } catch (err) {
        return res.json({ status: false });
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

router.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashpassword, role: 'User' });
    await newUser.save();
    res.json({ status: true, message: "User created successfully" });
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    await User.findByIdAndUpdate(id, { username, email });
    res.json({ status: true, message: "User updated successfully" });
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ status: true, message: "User deleted successfully" });
});

export { router as UserRouter };
