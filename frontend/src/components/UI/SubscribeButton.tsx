import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import classes from "./SubscribeButton.module.css";

const SubscribeButton: React.FC = () => (
    <button className={classes.subscribeButton}>
        <FontAwesomeIcon icon={faPaperPlane} size="lg"/>
    </button>
)

export default SubscribeButton;