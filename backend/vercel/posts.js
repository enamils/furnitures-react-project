import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const baseDir = path.join(currentDir, '..', 'api');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        const postId = pathSegments[pathSegments.length - 1];

        const postsPath = path.join(baseDir, 'posts.json');

        if (req.method === 'GET') {
            if (postId === 'images') {
                // GET /posts/images
                const filePath = path.join(baseDir, 'images.json');

                if (!filePath.startsWith(baseDir)) {
                    return res.status(400).json({ error: 'Invalid file path' });
                }

                const data = await fs.promises.readFile(filePath, 'utf-8');
                const images = JSON.parse(data);
                return res.json(images);
            } else {
                // GET /posts
                if (!fs.existsSync(postsPath)) {
                    fs.writeFileSync(postsPath, '[]');
                }

                const postsData = fs.readFileSync(postsPath, 'utf-8');
                const posts = JSON.parse(postsData);
                return res.json(posts);
            }

        } else if (req.method === 'POST') {
            // POST /posts
            const { author, title, image } = req.body;

            if (!author?.trim() || !title?.trim() || !image?.trim()) {
                return res.status(400).json({ error: 'The author, title and image are required.' });
            }

            const newPost = {
                id: Date.now().toString(),
                author,
                title,
                image,
                date: new Date().toISOString()
            };

            if (!fs.existsSync(postsPath)) {
                fs.writeFileSync(postsPath, '[]');
            }

            const postsData = fs.readFileSync(postsPath, 'utf-8');
            const posts = JSON.parse(postsData);

            posts.push(newPost);
            fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

            return res.status(201).json(newPost);

        } else if (req.method === 'DELETE' && postId !== 'posts') {
            // DELETE /posts/:id
            if (!fs.existsSync(postsPath)) {
                return res.status(404).json({ error: 'No post found' });
            }

            const postsData = fs.readFileSync(postsPath, 'utf-8');
            let posts = JSON.parse(postsData);

            const postIndex = posts.findIndex(post => post.id === postId);
            if (postIndex === -1) {
                return res.status(404).json({ error: 'Post not found' });
            }

            posts = posts.filter(post => post.id !== postId);
            fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

            return res.status(200).json({ message: 'Post deleted successfully.' });

        } else if (req.method === 'PATCH' && postId !== 'posts') {
            // PATCH /posts/:id
            const { author, title, image } = req.body;

            if (!author?.trim() || !title?.trim() || !image?.trim()) {
                return res.status(400).json({ error: 'The author, title and image fields are required.' });
            }

            if (!fs.existsSync(postsPath)) {
                return res.status(404).json({ error: 'No posts found' });
            }

            const postsData = fs.readFileSync(postsPath, 'utf-8');
            let posts = JSON.parse(postsData);

            const postIndex = posts.findIndex(post => post.id === postId);
            if (postIndex === -1) {
                return res.status(404).json({ error: 'Post not found' });
            }

            posts[postIndex] = {
                ...posts[postIndex],
                author,
                title,
                image
            };

            fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

            return res.status(200).json(posts[postIndex]);

        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (err) {
        console.error('Error processing posts:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
}
