import * as React from "react";
import {NavLink} from "react-router-dom";
import Post from "./Post.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import {PostSkeleton} from "../UI/Skeleton.tsx";
import InfoBlock from "../UI/InfoBlock.tsx";
import {useLatestPosts} from "../../hooks/usePosts.ts";
import type {PostType} from "../../types/postType.ts";

type LatestPostsProps = {
    limit?: number;
}

const LatestPosts: React.FC<LatestPostsProps> = ({ limit = 3 }) => {
    const {data: latestPosts = [], isLoading, error} = useLatestPosts(limit);

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5">
                {[...Array(limit)].map((_, i) => (
                    <PostSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return <ErrorBlock title="An error has occurred" message="Unable to load latest posts." />;
    }

    if (latestPosts.length === 0) {
        return <InfoBlock message="No posts available." />;
    }

    return (
        <>
            <div className="md:flex md:justify-between mb-12">
                <h2 className="text-3xl text-[color:var(--dark)] mb-2 md:mb-4">Recent Blog</h2>
                <NavLink to="/blog" className="text-[color:var(--dark)] font-semibold underline hover:no-underline block">View All Posts</NavLink>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-5">
                {latestPosts.map((post: PostType) => (
                    <Post key={post.id} posts={post} showActions={false} />
                ))}
            </div>
        </>
    );
}

export default LatestPosts;
