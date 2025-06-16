import type {Product} from "../types/productType.ts";

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('http://localhost:5000/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}