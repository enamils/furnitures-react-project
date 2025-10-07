import React from "react";
import classes from "./PopularProductItem.module.css";
import {NavLink} from "react-router-dom";

type ImageProps = {
    image: string;
    name: string;
}

const PopularProductItem: React.FC<ImageProps> = ({image, name}) => {
  return (
      <div className={classes.popularProductItem}>
          <div className={classes.thumbnail}>
            <img src={image} loading="lazy" alt={name}/>
          </div>
          <div className="pt-3">
              <h3 className="font-bold mb-1 text-[color:var(--dark)]">{name}</h3>
              <p className="mb-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <NavLink to="#" className="text-[color:var(--dark)]">Read More</NavLink>
          </div>
      </div>
  );
}

export default PopularProductItem;