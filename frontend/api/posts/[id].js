import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      let posts = await redis.get('posts') || initialPosts;

      const postIndex = posts.findIndex((post) => post.id === id);

      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
      }

      posts = posts.filter((post) => post.id !== id);

      await redis.set('posts', posts);

      console.log('Post deleted:', id);
      res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { author, title, image } = req.body;

      if (!author?.trim() || !title?.trim() || !image?.trim()) {
        return res.status(400).json({ error: 'The author, title and image fields are required.' });
      }

      let posts = await redis.get('posts') || initialPosts;

      const postIndex = posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
      }

      posts[postIndex] = { ...posts[postIndex], author, title, image };

      await redis.set('posts', posts);

      console.log('Post updated:', id);
      res.status(200).json(posts[postIndex]);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  }
}
