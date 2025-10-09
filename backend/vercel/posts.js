import { kv } from '@vercel/kv';

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

        if (req.method === 'GET') {
            if (postId === 'images') {
                const images = []; // Copiez images.json ici
                return res.json(images);
            } else {
                const posts = await kv.get('posts') || [];
                return res.json(posts);
            }

        } else if (req.method === 'POST') {
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

            const posts = await kv.get('posts') || [];
            posts.push(newPost);
            await kv.set('posts', posts);

            return res.status(201).json(newPost);

        } else if (req.method === 'DELETE' && postId !== 'posts') {
            let posts = await kv.get('posts') || [];
            const postIndex = posts.findIndex(post => post.id === postId);

            if (postIndex === -1) {
                return res.status(404).json({ error: 'Post not found' });
            }

            posts = posts.filter(post => post.id !== postId);
            await kv.set('posts', posts);

            return res.status(200).json({ message: 'Post deleted successfully.' });

        } else if (req.method === 'PATCH' && postId !== 'posts') {
            const { author, title, image } = req.body;

            if (!author?.trim() || !title?.trim() || !image?.trim()) {
                return res.status(400).json({ error: 'The author, title and image fields are required.' });
            }

            let posts = await kv.get('posts') || [];
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

            await kv.set('posts', posts);
            return res.status(200).json(posts[postIndex]);

        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (err) {
        console.error('Error processing posts:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
}
