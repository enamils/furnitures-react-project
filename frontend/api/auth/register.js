import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { kv } from '@vercel/kv';

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

      if (!email || !email.includes('@') || !password || password.length < 6) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await kv.hget('users', email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email exists already' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword
      };

      // Stocker l'utilisateur dans Vercel KV
      await kv.hset('users', email, JSON.stringify(newUser));

      const token = jwt.sign({ id: newUser.id, email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
      const expirationTime = 3600 * 1000;

      res.status(201).json({
        token,
        userId: newUser.id,
        expirationTime
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error during registration' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
