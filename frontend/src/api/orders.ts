import type { CheckoutOrderType, CheckoutResponseType } from '../types/checkoutType';

const API_URL = import.meta.env.VITE_FURNITURES_URL;

export const createOrder = async (orderData: Omit<CheckoutOrderType, 'orderDate'>): Promise<CheckoutResponseType> => {
    const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error creating order: ${response.statusText}`);
    }

    return response.json();
};

export const getOrder = async (orderId: string): Promise<CheckoutResponseType> => {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error retrieving order: ${response.statusText}`);
    }

    return response.json();
};
