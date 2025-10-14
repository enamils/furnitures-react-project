import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

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
      let orders = await redis.get('orders') || [];

      orders.push(order);

      // Sauvegarder dans Upstash Redis
      await redis.set('orders', orders);

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
