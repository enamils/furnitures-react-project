import { kv } from '@vercel/kv';

// Initial orders data for first time setup
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
  // Headers CORS complets
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Gérer les requêtes preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { billingDetails, cartItems, subtotal, total } = req.body;

      if (!billingDetails || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid order data !'
        });
      }

      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const order = {
        id: orderId,
        billingDetails,
        cartItems,
        subtotal,
        total,
        orderDate: new Date().toISOString(),
        status: 'pending'
      };

      // Récupérer les commandes existantes
      let orders = await kv.get('orders') || [];

      orders.push(order);

      // Sauvegarder dans Vercel KV
      await kv.set('orders', orders);

      console.log('New order created:', orderId);

      res.status(201).json({
        success: true,
        orderId,
        message: 'Order created successfully',
        order
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({
        success: false,
        error: 'Error creating order'
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
