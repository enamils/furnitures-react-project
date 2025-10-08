import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// TODO : En production, utilisez une base de données
let users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const TOKEN_EXPIRY = '1h';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'POST') {
            const { email, password } = req.body;
            const url = new URL(req.url, `http://${req.headers.host}`);
            const endpoint = url.pathname.split('/').pop();

            if (endpoint === 'register') {
                // Registration logic
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
                const expirationTime = 3600 * 1000;

                return res.status(201).json({
                    token,
                    userId: newUser.id,
                    expirationTime
                });

            } else if (endpoint === 'login') {
                // Login logic
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
                const expirationTime = 3600 * 1000;

                return res.json({
                    token,
                    userId: user.id,
                    expirationTime
                });
            }
        }

        return res.status(404).json({ message: 'Endpoint not found' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
