import * as React from "react";
import toast from 'react-hot-toast';
import classes from "./ProductItem.module.css";

import crossImg from "../../assets/images/cross.svg";
import {currencyFormatter} from "../../utils/formatting.ts";
import { useCart } from "../../hooks/useCart.ts";
import type {Product} from "../../type/productType.ts";

type ProductItemProps = {
    product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({product}) => {
    const { addToCart } = useCart();

    const addToCartHandler = () => {
        addToCart({ ...product, quantity: 1 });
        toast.success(`${product.name} add to cart!`);
    }

    return (
        <li>
            <button className={classes.productItem} onClick={addToCartHandler}>
                <img className={`${classes.thumbnail} mb-9`} src={`http://localhost:5000/${product.image}`} alt={product.name} loading="lazy" />
                <span className={classes.title}>{product.name}</span>
                <span className={classes.price}>{currencyFormatter.format(product.price)}</span>
                <span>Add to Cart</span>
                <span className={classes.iconCross}>
                    <img src={crossImg} alt="cross" loading="lazy"/>
                </span>
            </button>
        </li>
    );
}

export default ProductItem;