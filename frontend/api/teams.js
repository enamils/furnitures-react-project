const teams = [
  {
    "id": 1,
    "name": "Lawson Arnold",
    "job": "CEO, Founder, Atty.",
    "resume": "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    "image": "images/person_1.jpg"
  },
  {
    "id": 2,
    "name": "Jeremy Walker",
    "job": "CEO, Founder, Atty.",
    "resume": "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    "image": "images/person_2.jpg"
  },
  {
    "id": 3,
    "name": "Patrik White",
    "job": "CEO, Founder, Atty.",
    "resume": "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    "image": "images/person_3.jpg"
  },
  {
    "id": 4,
    "name": "Kathryn Ryan",
    "job": "CEO, Founder, Atty.",
    "resume": "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    "image": "images/person_4.jpg"
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
      console.log('Teams loaded successfully, count:', teams.length);
      res.json(teams);
    } catch (error) {
      console.error('Error loading teams:', error);
      res.status(500).json({
        error: 'Failed to load teams profile',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
