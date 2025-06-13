import * as React from "react";
import testImg from "../assets/images/sofa.png";

const CartItem: React.FC = () => {
    return (
        <tr>
            <td className="px-4 py-2 whitespace-nowrap">
                <img src={testImg} alt="Product" className="w-16 h-16 md:w-40 md:h-40 object-contain" />
            </td>
            <td className="px-4 py-2 whitespace-nowrap md:text-center">Produit</td>
            <td className="px-4 py-2 whitespace-nowrap text-center">20.99€</td>
            <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex gap-2 items-center justify-center">
                    <button className="text-xl text-[color:var(--black)] cursor-pointer">-</button>
                    <span className="p-1">10</span>
                    <button className="text-xl text-[color:var(--black)] cursor-pointer">+</button>
                </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-center">200.99€</td>
            <td className="px-4 py-2 whitespace-nowrap text-center">
                <button className="text-[color:var(--black)] cursor-pointer">X</button>
            </td>
        </tr>
    );
}

export default CartItem;