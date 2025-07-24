import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { NavLink} from "react-router-dom";
import classes from "./Post.module.css";

type EditButtonProps = {
    postId: string;
};

const EditButton: React.FC<EditButtonProps> = ({ postId }) => {
    return (
        <NavLink
            to={`/blog/edit/${postId}`}
            className={classes.edit}
            title="Update"
        >
            <FontAwesomeIcon icon={faPencil} />
        </NavLink>
    );
};

export default EditButton;