import * as React from "react";
import CartItem from "./CartItem.tsx";
import {useCart} from "../../hooks/useCart.ts";
import {currencyFormatter} from "../../utils/formatting.ts";
import InfoBlock from "../UI/InfoBlock.tsx";

const Cart: React.FC = () => {
    const {cart} = useCart();

    const totalCartPrice = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
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
                    <div className="mt-12">
                        Total: {currencyFormatter.format(totalCartPrice)}
                    </div>
                </>
            )}
        </>
    );
}

export default Cart;