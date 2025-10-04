import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import LatestPosts from "../components/BlogPost/LatestPosts.tsx";
import FeaturedProducts from "../components/Products/FeaturedProducts.tsx";

const HomePage: React.FC = () => {
    return (
        <>
            <Hero
                title="Modern Interior Design Studio"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique."/>
            <PageContent>
                <FeaturedProducts />
                <LatestPosts limit={3} />
            </PageContent>
        </>
    );
}

export default HomePage;