import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

router.use(express.json());

// base directory for API files
const baseDir = path.join(currentDir, '..', 'api');

router.get('/', async (req, res) => {
    const postsPath = path.join(currentDir, '../api/posts.json');

    if (!fs.existsSync(postsPath)) {
        fs.writeFileSync(postsPath, '[]');
    }

    const postsData = fs.readFileSync(postsPath, 'utf-8');
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

router.post('/', async (req, res) => {
    try {
        const { author, title, image } = req.body;

        // Check if the required fields are present
        if (!author?.trim() || !title?.trim() || !image?.trim()) {
            return res.status(400).json({ error: 'The author, title and image are required.' });
        }

        console.log('Creating a new post:', { author, title, image });

        // Create a new post
        const newPost = {
            id: Date.now().toString(), // Use timestamp as a unique ID
            author,
            title,
            image,
            date: new Date().toISOString() // Format ISO pour la date
        };

        const postsPath = path.join(currentDir, '../api/posts.json');

        if (!fs.existsSync(postsPath)) {
            fs.writeFileSync(postsPath, '[]');
        }

        const postsData = fs.readFileSync(postsPath, 'utf-8');
        const posts = JSON.parse(postsData);

        posts.push(newPost);
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating post:', err.message);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postsPath = path.join(currentDir, '../api/posts.json');

        if (!fs.existsSync(postsPath)) {
            return res.status(404).json({ error: 'No post found' });
        }

        const postsData = fs.readFileSync(postsPath, 'utf-8');
        let posts = JSON.parse(postsData);

        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        posts = posts.filter(post => post.id !== id);
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
        console.error('Error deleting post:', err.message);
        res.status(500).json({ error: 'Failed to delete post' });
    }
})

export default router;