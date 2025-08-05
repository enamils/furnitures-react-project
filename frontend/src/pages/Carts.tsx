import * as React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import Cart from "../components/Cart/Cart.tsx";

const CartPage: React.FC = () => {
    const location = useLocation();
    const isCheckoutPage = location.pathname.includes('checkout');

    return (
        <>
            <Hero
                title="Cart"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique."/>
            <PageContent>
                {isCheckoutPage ? <Outlet /> : <Cart />}
            </PageContent>
        </>
    );
}

export default CartPage;