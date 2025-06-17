import * as React from "react";
import postImg from "../../assets/images/post-1.jpg";
import classes from "./Post.module.css";

const Post: React.FC = () => {
    return (
        <div className="mb-5 relative">
            <img className={classes.thumbnail} src={postImg} alt="Image post"/>
            <a href="#" className={`${classes.content} px-4`}>
                <h3 className="font-semibold mb-2">First Time Home Owner Ideas</h3>
                <p>by <span className="font-bold">Kristin Watson</span> on <span className="font-bold">Dec 19, 2021</span></p>
            </a>
        </div>
    );
}

export default Post;