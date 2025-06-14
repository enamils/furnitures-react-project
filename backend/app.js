import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

app.get('/products', async (req, res) => {
    try {
        const data = await fs.promises.readFile(path.join(currentDir, 'api', 'products.json'), 'utf-8');
        const products = JSON.parse(data);

        // Simulate a delay to mimic a real API call
        setTimeout(() => {
            res.json(products);
        }, 1000);
    } catch (err) {
        res.status(400).json({ error: 'Error loading products' });
    }
});

app.listen(PORT, () => {
    console.log(`API shopping on http://localhost:${PORT}`);
});