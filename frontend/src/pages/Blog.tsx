import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import BlogPost from "../components/BlogPost/BlogPost.tsx";

const BlogPage: React.FC = () => {
    return (
        <>
            <Hero
                title="Blog"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
            <PageContent>
                <BlogPost />
            </PageContent>
        </>
    );
}

export default BlogPage;