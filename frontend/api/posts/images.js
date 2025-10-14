// Images data included directly
const images = [
  {
    "path": "images/post-1.jpg",
    "caption": "Owner Ideas"
  },
  {
    "path": "images/post-2.jpg",
    "caption": "Furniture Clean"
  },
  {
    "path": "images/post-3.jpg",
    "caption": "Apartment Ideas"
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      console.log('Images loaded successfully, count:', images.length);
      res.json(images);
    } catch (error) {
      console.error('Error loading images:', error);
      res.status(500).json({
        error: 'Failed to load images',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
