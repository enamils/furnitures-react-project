import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '1h';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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

      const existingUser = await redis.hget('users', email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email exists already' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword
      };

      await redis.hset('users', email, JSON.stringify(newUser));

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
