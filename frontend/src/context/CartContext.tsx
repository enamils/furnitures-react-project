import {useCallback, useEffect, useMemo, useState} from "react";
import type { CartProductType } from '../types/cartProductType.ts';
import type {ChildrenType} from "../types/childrenType.ts";
import { CartStateContext, CartActionsContext, type CartStateContextType, type CartActionsContextType } from "./cartContext.ts";

const CART_STORAGE_KEY = 'cart';
const CART_TTL_MS = 60 * 60 * 1000; // 1 hour

type CartStorage = { items: CartProductType[]; savedAt: number };

const isCartStorage = (data: unknown): data is CartStorage => {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
    const d = data as Record<string, unknown>;
    return Array.isArray(d.items) && typeof d.savedAt === 'number';
};

const CartContextProvider = ({children}: ChildrenType) => {
    const [cart, setCart] = useState<CartProductType[]>(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (!stored) return [];
            const parsed: unknown = JSON.parse(stored);

            if (isCartStorage(parsed)) {
                if (Date.now() - parsed.savedAt > CART_TTL_MS) {
                    localStorage.removeItem(CART_STORAGE_KEY);
                    return [];
                }
                return parsed.items;
            }

            // Support carts saved before TTL feature was introduced
            if (Array.isArray(parsed)) {
                const items = parsed as CartProductType[];
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items, savedAt: Date.now() }));
                return items;
            }

            return [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        if (cart.length === 0) {
            localStorage.removeItem(CART_STORAGE_KEY);
        } else {
            const storage: CartStorage = { items: cart, savedAt: Date.now() };
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storage));
        }
    }, [cart]);

    const addToCart = useCallback((product: CartProductType): void => {
        setCart(prev => {
            let found = false;
            const updated = prev.map(item => {
                if (item.id === product.id) {
                    found = true;
                    return {...item, quantity: item.quantity + product.quantity};
                }
                return item;
            });
            return found ? updated : [...updated, product];
        });
    }, []);

    const removeFromCart = useCallback((id: string): void => {
        setCart(prev =>
            prev
                .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter(item => item.quantity > 0)
        );
    }, []);

    const clearCartItem = useCallback((id: string): void => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback((): void => {
        setCart([]);
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number): void => {
        if (quantity <= 0) {
            setCart(prev => prev.filter(item => item.id !== id));
            return;
        }
        setCart(prev =>
            prev.map(item => (item.id === id ? {...item, quantity} : item))
        );
    }, []);

    const stateValue: CartStateContextType = useMemo(() => ({ cart }), [cart]);

    const actionsValue: CartActionsContextType = useMemo(() => ({
        addToCart, removeFromCart, clearCartItem, clearCart, updateQuantity,
    }), [addToCart, removeFromCart, clearCartItem, clearCart, updateQuantity]);

    return (
        <CartStateContext.Provider value={stateValue}>
            <CartActionsContext.Provider value={actionsValue}>
                {children}
            </CartActionsContext.Provider>
        </CartStateContext.Provider>
    );
}

export default CartContextProvider;
