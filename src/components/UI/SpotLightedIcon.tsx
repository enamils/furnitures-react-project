import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import type {IconDefinition} from "@fortawesome/fontawesome-svg-core";

import classes from "./SpotLightedIcon.module.css";

type SpotLightedIconProps = {
    icon: IconDefinition;
};

const SpotLightedIcon: React.FC<SpotLightedIconProps> = ({icon}) => (
    <a href="#" className={classes.spotLightedIcon}>
        <FontAwesomeIcon icon={icon} size="1x"/>
    </a>
);

export default SpotLightedIcon;