import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(express.json());

router.get('/', async (req, res) => {
    const postsPath = path.join(__dirname, '../api/posts.json');

    if (!fs.existsSync(postsPath)) {
        fs.writeFileSync(postsPath, '[]');
    }

    const postsData = fs.readFileSync(postsPath);
    const posts = JSON.parse(postsData);
    res.json(posts);
});

export default router;