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

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    return res.json(teams);
}
