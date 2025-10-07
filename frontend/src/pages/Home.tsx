import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import LatestPosts from "../components/BlogPost/LatestPosts.tsx";
import FeaturedProducts from "../components/Products/FeaturedProducts.tsx";
import PopularProductItem from "../components/Products/PopularProductItem.tsx";

import product1Img from "../assets/images/product-1.png";
import product2Img from "../assets/images/product-2.png";
import product3Img from "../assets/images/product-3.png";

const HomePage: React.FC = () => {
    return (
        <>
            <Hero
                title="Modern Interior Design Studio"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique."/>
            <PageContent>
                <FeaturedProducts />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-30">
                    <PopularProductItem name="Nordic Chair" image={product1Img} />
                    <PopularProductItem name="Kruzo Aero Chair" image={product2Img} />
                    <PopularProductItem name="Ergonomic Chair" image={product3Img} />
                </div>
                <LatestPosts limit={3} />
            </PageContent>
        </>
    );
}

export default HomePage;
