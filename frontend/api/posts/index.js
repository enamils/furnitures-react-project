import { kv } from '@vercel/kv';

// Initial posts data for first time setup
const initialPosts = [
  {
    "id": "1751220252735",
    "author": "Aicha",
    "title": "A new event",
    "image": "images/post-2.jpg",
    "date": "2025-06-29T18:04:12.737Z"
  },
  {
    "id": "1751220319552",
    "author": "Kristin Watson",
    "title": "How To Keep Your Furniture Clean",
    "image": "images/post-3.jpg",
    "date": "2025-06-29T18:05:19.552Z"
  },
  {
    "id": "1751220334822",
    "author": "Robert Fox",
    "title": "Small Space Furniture Apartment Ideas",
    "image": "images/post-2.jpg",
    "date": "2025-06-29T18:05:34.822Z"
  },
  {
    "id": "1751230760946",
    "author": "Kristin Watson",
    "title": "How To Keep Your Furniture Clean 3",
    "image": "images/post-1.jpg",
    "date": "2025-06-29T20:59:20.946Z"
  },
  {
    "id": "1751230768374",
    "author": "Robert Fox",
    "title": "Small Space Furniture Apartment Ideas",
    "image": "images/post-3.jpg",
    "date": "2025-06-29T20:59:28.374Z"
  },
  {
    "id": "1751230783299",
    "author": "Kristin Watson",
    "title": "First Time Home Owner Ideas",
    "image": "images/post-2.jpg",
    "date": "2025-06-29T20:59:43.299Z"
  }
];

export default async function handler(req, res) {
  // Headers CORS complets
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Gérer les requêtes preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      let posts = await kv.get('posts');

      // Si aucun post n'existe, initialiser avec les données par défaut
      if (!posts) {
        posts = initialPosts;
        await kv.set('posts', posts);
      }

      console.log('Posts loaded successfully, count:', posts.length);
      res.json(posts);
    } catch (error) {
      console.error('Error loading posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { author, title, image } = req.body;

      if (!author?.trim() || !title?.trim() || !image?.trim()) {
        return res.status(400).json({ error: 'The author, title and image are required.' });
      }

      // Récupérer les posts existants
      let posts = await kv.get('posts') || [];

      const newPost = {
        id: Date.now().toString(),
        author,
        title,
        image,
        date: new Date().toISOString()
      };

      posts.push(newPost);

      // Sauvegarder dans Vercel KV
      await kv.set('posts', posts);

      console.log('New post created:', newPost.id);
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
}
