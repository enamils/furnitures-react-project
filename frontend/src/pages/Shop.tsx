import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import Products from "../components/Products/Products.tsx";

const ShopPage: React.FC = () => {
    return (
        <>
            <Hero
                title="Shop"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
            <PageContent>
                <Products/>
            </PageContent>
        </>
    );
}

export default ShopPage;