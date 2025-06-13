import * as React from "react";
import {useEffect, useState} from "react";
import ProductItem from "./ProductItem.tsx";
import type {Product} from "../../type/productType.ts";

const Products: React.FC = () => {
    const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const products = await response.json();
            setLoadedProducts(products);
        }

        fetchProducts();
    }, []);

    return (
        <ul className="grid justify-center md:grid-cols-3 lg:grid-cols-4 md:gap-4 lg:gap-3">
            {loadedProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </ul>
    );
}

export default Products;