import type {Product} from "../types/productType.ts";
const API_URL = import.meta.env.VITE_FURNITURES_URL || 'http://localhost:5000';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}