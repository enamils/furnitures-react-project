import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/assets', express.static(path.join(currentDir, 'public')));

app.get('/products', async (req, res) => {
    try {
        const data = await fs.promises.readFile(path.join(currentDir, 'api/products.json'));
        const products = JSON.parse(data);
        res.json(products);
    } catch (err) {
        res.status(400).json({ error: 'Error loading products' });
    }
});

app.listen(PORT, () => {
    console.log(`API shopping on http://localhost:${PORT}`);
});