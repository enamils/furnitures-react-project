const products = [
    {
        "id": 1,
        "name": "Nordic Chair",
        "price": 49.99,
        "image": "images/product-1.png"
    },
    {
        "id": 2,
        "name": "Sweeden Chair",
        "price": 69.99,
        "image": "images/product-2.png"
    },
    {
        "id": 3,
        "name": "Kruzo Aero Chair",
        "price": 78.99,
        "image": "images/product-3.png"
    },
    {
        "id": 4,
        "name": "Finland Chair",
        "price": 48.99,
        "image": "images/product-2.png"
    },
    {
        "id": 5,
        "name": "Ergonomic Chair",
        "price": 43.57,
        "image": "images/product-1.png"
    },
    {
        "id": 6,
        "name": "Viking Chair",
        "price": 97.99,
        "image": "images/product-3.png"
    },
    {
        "id": 7,
        "name": "Salt Chair",
        "price": 36.98,
        "image": "images/product-1.png"
    },
    {
        "id": 8,
        "name": "Sugar Chair",
        "price": 99.01,
        "image": "images/product-2.png"
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

    return res.status(200).json(products); // Ajoutez return et status
}