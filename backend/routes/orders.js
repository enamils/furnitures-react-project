import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

// base directory for API files
const baseDir = path.join(currentDir, '..', 'api');

// POST - Create a new order
router.post('/', async (req, res) => {
    try {
        const { billingDetails, cartItems, subtotal, total } = req.body;

        // Validation des données requises
        if (!billingDetails || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid order data !'
            });
        }

        // Generating a unique order ID
        const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Creating the command object
        const order = {
            id: orderId,
            billingDetails,
            cartItems,
            subtotal,
            total,
            orderDate: new Date().toISOString(),
            status: 'pending'
        };

        // Reading the existing commands file
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

        // Added new command
        orders.push(order);

        // Save to file
        await fs.promises.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

        res.status(201).json({
            success: true,
            orderId,
            message: 'Order created successfully',
            order
        });

    } catch (err) {
        console.error('Error creating order:', err.message);
        res.status(500).json({
            success: false,
            error: 'Error creating order'
        });
    }
});

// GET - Get order by ID
router.get('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
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


    } catch (err) {
        console.error('Error fetching order:', err.message);
        res.status(500).json({
            success: false,
            error: 'Error retrieving order'
        });
    }
});

export default router;
