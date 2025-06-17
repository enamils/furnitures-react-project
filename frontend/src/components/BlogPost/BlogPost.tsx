import * as React from "react";
import Post from "./Post.tsx";

const BlogPost: React.FC  = () => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default BlogPost