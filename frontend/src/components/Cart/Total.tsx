import * as React from "react";
import Button from "../UI/Button.tsx";
import {currencyFormatter} from "../../utils/formatting.ts";

const Total: React.FC<{priceTotal: number}>= ({priceTotal}) => {
    return (
        <div className="text-[color:var(--black)]">
            <p className="uppercase mb-10 border-b border-gray-200 text-2xl">Cart totals</p>
            <div className="flex justify-between mb-3">
                <p>Subtotal</p>
                <p className="font-bold">{currencyFormatter.format(priceTotal)}</p>
            </div>
            <div className="flex justify-between mb-11">
                <p>Total</p>
                <p className="font-bold">{currencyFormatter.format(priceTotal)}</p>
            </div>
            <Button label="Proceed to checkout" darkButtonLink className="py-4" onClick={() => console.log("proceed to checkout")} />
        </div>
    );
}

export default Total;