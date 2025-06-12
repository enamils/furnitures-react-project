import * as React from "react";
import classes from "./ProductItem.module.css";

import crossImg from "../assets/images/cross.svg";
import {currencyFormatter} from "../utils/formatting.ts";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
};

type ProductItemProps = {
    product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({product}) => {

    return (
        <li>
            <button className={classes.productItem}>
                <img className={`${classes.thumbnail} mb-9`} src={`http://localhost:5000/${product.image}`} alt={product.name} />
                <span className={classes.title}>{product.name}</span>
                <span className={classes.price}>{currencyFormatter.format(product.price)}</span>
                <span className={classes.iconCross}>
                    <img src={crossImg} alt="cross"/>
                </span>
            </button>
        </li>
    );
}

export default ProductItem;