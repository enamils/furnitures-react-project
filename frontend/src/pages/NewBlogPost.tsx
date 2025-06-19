import * as React from "react";
import PostForm from "../components/BlogPost/PostForm.tsx";

const NewBlogPostPage: React.FC = () => {
    return (
        <>
            <h2 className="text-3xl text-[color:var(--dark)] mb-10">Add new Post</h2>
            <PostForm />
        </>
    );
}

export default NewBlogPostPage;