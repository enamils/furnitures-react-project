import * as React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import BlogPost from "../components/BlogPost/BlogPost.tsx";

const BlogPage: React.FC = () => {
    const location = useLocation();
    const isNewPostPage = location.pathname.includes('/new-post');

    return (
        <>
            <Hero
                newPost
                title="Blog"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
            <PageContent>
                {isNewPostPage ? <Outlet /> : <BlogPost />}
            </PageContent>
        </>
    );
}

export default BlogPage;