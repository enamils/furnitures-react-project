import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import SectionContainer from "../layout/Section.tsx";
import Products from "../components/Products/Products.tsx";

const ShopPage: React.FC = () => {
    return (
        <>
            <Hero
                title="Shop"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
            <SectionContainer>
                <Products/>
            </SectionContainer>
        </>
    );
}

export default ShopPage;