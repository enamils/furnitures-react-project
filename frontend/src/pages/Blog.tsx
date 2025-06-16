import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";

const BlogPage: React.FC = () => {
    return (
        <>
            <Hero
                title="Blog"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
        </>
    );
}

export default BlogPage;