import * as React from "react";
import {NavLink} from "react-router-dom";
const Post = React.lazy(() => import("./Post.tsx"));
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

    return (
        <>
            <div className="md:flex md:justify-between mb-12">
                <h2 className="text-3xl text-[color:var(--dark)] mb-2 md:mb-4">Recent Blog</h2>
                <NavLink to="/blog" className="text-[color:var(--dark)] font-semibold underline hover:no-underline block">View All Posts</NavLink>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-5">
                {error ? (
                    <ErrorBlock title="An error has occurred" message="Unable to load latest posts." />
                ) : isLoading ? (
                    [...Array(limit)].map((_, i) => (
                        <PostSkeleton key={i} />
                    ))
                ) : latestPosts.length === 0 ? (
                    <InfoBlock message="No posts available." />
                ) : (
                    <React.Suspense fallback={
                        <>
                            {[...Array(limit)].map((_, i) => (
                                <PostSkeleton key={i} />
                            ))}
                        </>
                    }>
                        {latestPosts.map((post: PostType) => (
                            <Post key={post.id} posts={post} showActions={false} />
                        ))}
                    </React.Suspense>
                )}
            </div>
        </>
    );
}

export default LatestPosts;
