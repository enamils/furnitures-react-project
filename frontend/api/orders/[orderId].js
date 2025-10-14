import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const initialOrders = [
  {
    "id": "ORDER-1759419023310-t2cg80d76",
    "billingDetails": {
      "country": "fr",
      "firstName": "aaa",
      "lastName": "zzzz",
      "address": "5 rue ernest roche",
      "apartment": "rue ernest roche",
      "state": "France",
      "postalCode": "75017",
      "email": "test@mail.fr",
      "phone": "0101010101",
      "createAccount": false,
      "differentAddress": false,
      "orderNotes": "dsfsdv"
    },
    "cartItems": [
      {
        "id": 2,
        "name": "Sweeden Chair",
        "price": 69.99,
        "image": "images/product-2.png",
        "quantity": 1
      },
      {
        "id": 3,
        "name": "Kruzo Aero Chair",
        "price": 78.99,
        "image": "images/product-3.png",
        "quantity": 1
      }
    ],
    "subtotal": 296.98,
    "total": 296.98,
    "orderDate": "2025-10-02T15:30:23.310Z",
    "status": "pending"
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

  if (req.method === 'GET') {
    try {
      const { orderId } = req.query;

      let orders = await redis.get('orders') || initialOrders;

      const order = orders.find((o) => o.id === orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      console.log('Order retrieved:', orderId);
      setTimeout(() => res.json({
        success: true,
        order
      }), 3000);
    } catch (error) {
      console.error('Error retrieving order:', error);
      res.status(500).json({
        success: false,
        error: 'Error retrieving order'
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
