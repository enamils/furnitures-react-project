import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import type {IconDefinition} from "@fortawesome/fontawesome-svg-core";

import classes from "./SpotLightedIcon.module.css";

const SpotLightedIcon: React.FC<{icon: IconDefinition; label: string}> = ({icon, label}) => (
    <a href="#" className={classes.spotLightedIcon} aria-label={label}>
        <FontAwesomeIcon icon={icon} size="1x" aria-hidden="true" />
    </a>
);

export default SpotLightedIcon;