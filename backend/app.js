import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRoutes from './routes/products.js';

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

const app = express();
const PORT = 5000;

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static(path.join(currentDir, 'public')));

// ROUTES
app.use('/products', productsRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`API shopping on http://localhost:${PORT}`);
});