import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// TODO : In production, use a database instead
let users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const TOKEN_EXPIRY = '1h';

// Registration
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !email.includes('@') || !password || password.length < 6) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email exists already' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { id: Date.now().toString(), email, password: hashedPassword };
        users.push(newUser);

        const token = jwt.sign({ id: newUser.id, email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

        const expirationTime = 3600 * 1000; // 1h in ms

        res.status(201).json({
            token,
            userId: newUser.id,
            expirationTime
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide an email and password' });
        }

        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

        const expirationTime = 3600 * 1000; // 1h in ms

        res.json({
            token,
            userId: user.id,
            expirationTime
        });
    } catch (error) {
        res.status(500).json({ message: 'Not authenticated', error: error.message });
    }
});

export default router;