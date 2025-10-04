import {useQuery, type UseQueryResult} from "@tanstack/react-query";
import type {Product} from "../types/productType.ts";
import {fetchProducts} from "../api/products.ts";

export const useProducts = (): UseQueryResult<Product[], Error> => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 5000,
    });
};

export const useFeaturedProducts = (): UseQueryResult<Product[], Error> => {
    return useQuery<Product[], Error>({
        queryKey: ['featured-products'],
        queryFn: async () => {
            const products = await fetchProducts();
            return products.slice(0, 3);
        },
        staleTime: 5000,
    });
};