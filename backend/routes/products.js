import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

// base directory for API files
const baseDir = path.join(currentDir, '..', 'api');

router.get('/', async (req, res) => {
    try {
        const filePath = path.join(baseDir, 'products.json');

        // check if the file path is within the base directory
        if (!filePath.startsWith(baseDir)) {
            return res.status(400).json({ error: 'Invalid file path' });
        }

        const data = await fs.promises.readFile(filePath, 'utf-8');
        const products = JSON.parse(data);

        setTimeout(() => {
            res.json(products);
        }, 1000); // Simulate a delay to mimic a real-world scenario
    } catch (err) {
        console.error('Error reading products.json:', err.message);
        res.status(500).json({ error: 'Failed to load products' });
    }
});

export default router;