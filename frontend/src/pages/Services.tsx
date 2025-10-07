import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import FeaturedProducts from "../components/Products/FeaturedProducts.tsx";
import Slider from "../components/UI/Slider.tsx";
import {testimonialSlides} from "../data/sliderData.ts";

const ServicesPage: React.FC = () => {
    return (
        <>
            <Hero
                title="Services"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
            <PageContent>
                <FeaturedProducts />
                <div className="my-30">
                    <Slider slides={testimonialSlides} />
                </div>
            </PageContent>
        </>
    );
}

export default ServicesPage;