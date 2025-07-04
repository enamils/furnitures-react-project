import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRoutes from './routes/products.js';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use(express.static(path.join(currentDir, 'public')));

// ROUTES
app.use('/products', productsRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`API shopping on http://localhost:${PORT}`);
});