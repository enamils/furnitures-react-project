import * as React from "react";
import classes from "./Post.module.css";
import type {PostType} from "../../types/postType.ts";
import {formatDate} from "../../utils/formatting.ts";

type PostProps = {
    posts: PostType;
}

const API_URL = import.meta.env.VITE_FURNITURES_URL;

const Post: React.FC<PostProps> = ({posts}) => {
    return (
        <div className="mb-5 relative">
            <img className={classes.thumbnail} src={`${API_URL}/${posts.image}`} alt={posts.title} loading="lazy"/>
            <a href="#" className={`${classes.content} px-4`}>
                <h3 className="font-semibold mb-2">{posts.title}</h3>
                <p>by <span className="font-bold">
                    {posts.author}
                    </span> on <span className="font-bold">{formatDate(posts.date)}</span>
                </p>
            </a>
        </div>
    );
}

export default Post;