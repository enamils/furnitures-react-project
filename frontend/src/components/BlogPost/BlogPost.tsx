import * as React from "react";
import Post from "./Post.tsx";
import {useFetchPost} from "../../hooks/usePosts.ts";
import type {PostType} from "../../types/postType.ts";
import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";

const BlogPost: React.FC = () => {
    const {data: loadedPost = [], isLoading, error} = useFetchPost();

    if (isLoading) {
        return <LoadingIndicator />
    }

    if (error) {
        return <ErrorBlock title="An error occurred" message="Failed to fetch posts." />
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5">
            {loadedPost.map((post: PostType) => (
                <Post key={post.id} posts={post} />
            ))}
        </div>
    );
}

export default BlogPost