import * as React from "react";
import classes from "./Post.module.css";
import type {PostType} from "../../types/postType.ts";
import {formatDate} from "../../utils/formatting.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import EditButton from "./EditButton.tsx";

type PostProps = {
    posts: PostType;
    onDelete?: (id: string) => void;
    showActions?: boolean;
}

const Post: React.FC<PostProps> = ({posts,onDelete,showActions = true}) => {
    const { user } = useAuth();
    const isOwner = user?.id === posts.user_id;

    return (
        <div className="mb-5 relative">
            <img className={classes.thumbnail} src={posts.image} alt={posts.title} loading="lazy"/>
            {isOwner && showActions && onDelete && (
                <>
                    <EditButton postId={posts.id} />
                    <button
                        onClick={() => onDelete(posts.id)}
                        className={classes.delete}
                        aria-label="delete post"
                    >
                        &times;
                        <span className="sr-only sm:not-sr-only">Delete post</span>
                    </button>
                </>
            )}

            <a href="#" className={`${classes.content} px-4`}>
                <h3 className="font-semibold mb-2">{posts.title}</h3>
                <p>by <span className="font-bold">{posts.author}</span> on&nbsp;
                    <span className="font-bold">{formatDate(posts.date)}</span>
                </p>
            </a>
        </div>
    );
}

export default Post;