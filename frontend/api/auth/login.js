import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

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

      // Récupérer l'utilisateur depuis Upstash Redis
      const userData = await redis.hget('users', email);

      if (!userData) {
        return res.status(401).json({ message: 'Invalid user' });
      }

      const user = JSON.parse(userData);

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
      console.error('Login error:', error);
      res.status(500).json({ message: 'Not authenticated' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
