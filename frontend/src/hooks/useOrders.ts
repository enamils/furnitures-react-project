import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder, getOrder } from '../api/orders';
import type { CheckoutOrderType, CheckoutResponseType } from '../types/checkoutType';

export const useCreateOrder = () => {
    return useMutation<CheckoutResponseType, Error, Omit<CheckoutOrderType, 'orderDate'>>({
        mutationFn: createOrder,
        onSuccess: (data) => {
            console.log('Order created successfully:', data);
        },
        onError: (error) => {
            console.error('Error creating order:', error);
        },
    });
};

export const useGetOrder = (orderId: string | null) => {
    return useQuery<CheckoutResponseType, Error>({
        queryKey: ['order', orderId],
        queryFn: () => getOrder(orderId!),
        enabled: !!orderId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
