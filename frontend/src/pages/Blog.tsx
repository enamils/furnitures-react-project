import * as React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import BlogPost from "../components/BlogPost/BlogPost.tsx";
import Slider from "../components/UI/Slider.tsx";
import {testimonialSlides} from "../data/sliderData.ts";

const BlogPage: React.FC = () => {
    const location = useLocation();
    const isNewPostPage = location.pathname.includes('/new-post');
    const isEditPostPage = location.pathname.includes('/edit/');

    const showOutlet = isNewPostPage || isEditPostPage;

    return (
        <>
            <Hero
                newPost
                title="Blog"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
            <PageContent>
                {showOutlet ? <Outlet /> : <BlogPost />}
                <div className="my-30">
                    <Slider slides={testimonialSlides} />
                </div>
            </PageContent>
        </>
    );
}

export default BlogPage;