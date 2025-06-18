import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

router.use(express.json());

// Répertoire de base sécurisé
const baseDir = path.join(currentDir, '..', 'api');

router.get('/', async (req, res) => {
    const postsPath = path.join(currentDir, '../api/posts.json');

    if (!fs.existsSync(postsPath)) {
        fs.writeFileSync(postsPath, '[]');
    }

    const postsData = fs.readFileSync(postsPath);
    const posts = JSON.parse(postsData);
    res.json(posts);
});

router.get('/images', async (req, res) => {
    try {
        const filePath = path.join(baseDir, 'images.json');

        // check if the file path is within the base directory
        if (!filePath.startsWith(baseDir)) {
            return res.status(400).json({ error: 'Invalid file path' });
        }

        const data = await fs.promises.readFile(filePath, 'utf-8');
        const images = JSON.parse(data);

        res.json(images);
    } catch (err) {
        console.error('Error reading images:', err.message);
        res.status(500).json({ error: 'Failed to load images' });
    }
});

export default router;