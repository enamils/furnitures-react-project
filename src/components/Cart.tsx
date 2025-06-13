import * as React from "react";
import CartItem from "./CartItem.tsx";

const Cart: React.FC = () => {
    return (
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
                <CartItem />
            </tbody>
        </table>
    );
}

export default Cart;