import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import SectionContainer from "../layout/Section.tsx";
import Cart from "../components/Cart/Cart.tsx";

const CartPage: React.FC = () => {
    return (
        <>
            <Hero
                title="Cart"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique."/>
            <SectionContainer>
                <Cart />
            </SectionContainer>
        </>
    );
}

export default CartPage;