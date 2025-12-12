import { supabase } from "../lib/supabase";
import type { CheckoutOrderType, CheckoutResponseType } from '../types/checkoutType';

export const createOrder = async (orderData: Omit<CheckoutOrderType, 'orderDate'>): Promise<CheckoutResponseType> => {
  const { data: { user } } = await supabase.auth.getUser();

  const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  const newOrder = {
    id: orderId,
    user_id: user?.id || null,
    billing_details: orderData.billingDetails,
    cart_items: orderData.cartItems,
    subtotal: orderData.subtotal,
    total: orderData.total,
    order_date: new Date().toISOString(),
    status: 'pending',
  };

  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }

  // Convert snake_case from Supabase to camelCase for frontend
  return {
    success: true,
    orderId: data.id,
    message: 'Order created successfully',
    order: {
      id: data.id,
      billingDetails: data.billing_details,
      cartItems: data.cart_items,
      subtotal: parseFloat(data.subtotal),
      total: parseFloat(data.total),
      orderDate: data.order_date,
      status: data.status,
    }
  };
};

export const getOrder = async (orderId: string): Promise<CheckoutResponseType> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) {
    throw new Error(`Error retrieving order: ${error.message}`);
  }

  // Convert snake_case from Supabase to camelCase for frontend
  return {
    success: true,
    orderId: data.id,
    message: 'Order retrieved successfully',
    order: {
      id: data.id,
      billingDetails: data.billing_details,
      cartItems: data.cart_items,
      subtotal: parseFloat(data.subtotal),
      total: parseFloat(data.total),
      orderDate: data.order_date,
      status: data.status,
    }
  };
};
