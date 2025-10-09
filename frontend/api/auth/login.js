import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const TOKEN_EXPIRY = '1h';

export default async function handler(req, res) {
  // Headers CORS complets
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Gérer les requêtes preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide an email and password' });
      }

      const usersPath = path.join(process.cwd(), 'data', 'users.json');

      if (!fs.existsSync(usersPath)) {
        return res.status(401).json({ message: 'Invalid user' });
      }

      const data = fs.readFileSync(usersPath, 'utf-8');
      const users = JSON.parse(data);

      const user = users.find((user) => user.email === email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid user' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
      const expirationTime = 3600 * 1000;

      res.json({
        token,
        userId: user.id,
        expirationTime
      });
    } catch (error) {
      res.status(500).json({ message: 'Not authenticated' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
