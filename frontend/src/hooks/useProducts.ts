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