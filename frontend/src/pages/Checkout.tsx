import React from "react";
import BillingDetails from "../components/Checkout/BillingDetails.tsx";
import Order from "../components/Checkout/Order.tsx";

const CheckoutPage: React.FC = () => {

    return (
        <form>
            <div className="grid md:grid-cols-2 md:gap-4">
                <BillingDetails />
                <Order />
            </div>
        </form>
    );
}

export default CheckoutPage;