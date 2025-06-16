import * as React from "react";
import ProductItem from "./ProductItem.tsx";
import ProductSkeleton from "../UI/Skeleton.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import {useProducts} from "../../hooks/useProducts.ts";

const Products: React.FC = () => {
    const {data: loadedProducts = [], isLoading, error} = useProducts();

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