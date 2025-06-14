import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import ProductItem from "./ProductItem.tsx";
import type {Product} from "../../type/productType.ts";
import ProductSkeleton from "../UI/Skeleton.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";

const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('http://localhost:5000/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}

const Products: React.FC = () => {
    const {data: loadedProducts = [], isLoading, error} = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 5000,
    })

    if (isLoading) {
        return (
            <ul className="grid justify-center md:grid-cols-3 lg:grid-cols-4 md:gap-4 lg:gap-3">
                {[...Array(5)].map((_, i) => (
                    <li key={i}>
                        <ProductSkeleton />
                    </li>
                ))}
            </ul>
        );
    }

    if (error) {
        return <ErrorBlock title="An error occurred" message="Failed to fetch products." />
    }

    return (
        <ul className="grid justify-center md:grid-cols-3 lg:grid-cols-4 md:gap-4 lg:gap-3">
            {loadedProducts.map((product) => (
                <ProductItem key={product.id} product={product}/>
            ))}
        </ul>
    );
}

export default Products;