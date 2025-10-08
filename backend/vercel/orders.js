import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const baseDir = path.join(currentDir, '..', 'api');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        const orderId = pathSegments[pathSegments.length - 1];

        if (req.method === 'POST') {
            // Créer une nouvelle commande
            const { billingDetails, cartItems, subtotal, total } = req.body;

            if (!billingDetails || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid order data !'
                });
            }

            const newOrderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const order = {
                id: newOrderId,
                billingDetails,
                cartItems,
                subtotal,
                total,
                orderDate: new Date().toISOString(),
                status: 'pending'
            };

            const ordersFilePath = path.join(baseDir, 'orders.json');
            let orders = [];

            try {
                if (fs.existsSync(ordersFilePath)) {
                    const data = await fs.promises.readFile(ordersFilePath, 'utf-8');
                    orders = JSON.parse(data);
                }
            } catch (err) {
                console.log('Creating new orders file');
            }

            orders.push(order);
            await fs.promises.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

            return res.status(201).json({
                success: true,
                orderId: newOrderId,
                message: 'Order created successfully',
                order
            });

        } else if (req.method === 'GET' && orderId && orderId !== 'orders') {
            // Récupérer une commande par ID
            const ordersFilePath = path.join(baseDir, 'orders.json');

            if (!fs.existsSync(ordersFilePath)) {
                return res.status(404).json({
                    success: false,
                    error: 'Order not found'
                });
            }

            const data = await fs.promises.readFile(ordersFilePath, 'utf-8');
            const orders = JSON.parse(data);
            const order = orders.find(o => o.id === orderId);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    error: 'Order not found'
                });
            }

            res.json({
                success: true,
                order
            });

        } else {
            return res.status(404).json({ error: 'Endpoint not found' });
        }

    } catch (err) {
        console.error('Error processing order:', err.message);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}
