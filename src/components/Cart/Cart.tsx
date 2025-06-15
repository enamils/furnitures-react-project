import * as React from "react";
import CartItem from "./CartItem.tsx";
import {useCart} from "../../hooks/useCart.ts";
import InfoBlock from "../UI/InfoBlock.tsx";
import Total from "./Total.tsx";
import type {CartProductType} from "../../types/cartProductType.ts";

const Cart: React.FC = () => {
    const {cart} = useCart();

    const totalCartPrice: number = cart.reduce(
        (sum: number, product: CartProductType) => sum + product.price * product.quantity,
        0
    );

    return (
        <>
            {cart.length === 0 && <InfoBlock message="Your shopping cart is empty !"/>}
            {cart.length > 0 && (
                <>
                    <table className="min-w-full divide-y divide-black-200 overflow-x-auto block">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-[color:var(--black)] uppercase md:text-base w-full">Image</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-[color:var(--black)] uppercase md:text-base w-full">Product</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-[color:var(--black)] uppercase md:text-base w-full">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-[color:var(--black)] uppercase md:text-base w-full">Quantity</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-[color:var(--black)] uppercase md:text-base w-full">Total</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-[color:var(--black)] uppercase md:text-base w-full">Remove</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-base">
                            {cart.map(product => (
                                <CartItem key={product.id} product={product}/>
                            ))}
                        </tbody>
                    </table>
                    <div className="md:flex md:justify-end pt-5 pb-28">
                        <Total priceTotal={totalCartPrice} />
                    </div>
                </>
            )}
        </>
    );
}

export default Cart;