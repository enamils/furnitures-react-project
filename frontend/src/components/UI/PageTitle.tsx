import * as React from "react";
import type { PageTitleProps } from "../../types/pageTitleType.ts";
import classes from "./PageTitle.module.css";

const PageTitle: React.FC<PageTitleProps> = ({
    title,
    subtitle,
    className = "",
    centered = false,
}) => {
    const titleClasses = [
        classes.pageTitle,
        centered ? classes.centered : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <div className={titleClasses}>
            <h1 className={classes.title}>{title}</h1>
            {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
        </div>
    );
};

export default PageTitle;
