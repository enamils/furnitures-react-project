import * as React from "react";
const ProductItem = React.lazy(() => import("./ProductItem.tsx"));
import {ProductSkeleton} from "../UI/Skeleton.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import {useFeaturedProducts} from "../../hooks/useProducts.ts";
import Button from "../UI/Button.tsx";
import type {Product} from "../../types/productType.ts";

const FeaturedProducts: React.FC = () => {
    const {data: featuredProducts = [], isLoading, error} = useFeaturedProducts();

    return (
        <div className="lg:flex lg:justify-between lg:gap-4 mb-16">
            <div className="flex-2/4 mb-12 lg:mb-0">
                <h2 className="text-3xl text-[color:var(--dark)] mb-2 md:mb-6">Crafted with excellent material.</h2>
                <p className="mb-6">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
                <Button as="link" label="Explore" to="/shop" darkButtonLink />
            </div>

            <div className="w-full">
                {error ? (
                    <ErrorBlock title="An error has occurred" message="Unable to load featured products." />
                ) : (
                    <ul className="grid justify-center sm:grid-cols-3 gap-4">
                        {isLoading ? (
                            [...Array(3)].map((_, i) => (
                                <li key={i}>
                                    <ProductSkeleton />
                                </li>
                            ))
                        ) : (
                            <React.Suspense fallback={
                                <>
                                    {[...Array(3)].map((_, i) => (
                                        <li key={i}>
                                            <ProductSkeleton />
                                        </li>
                                    ))}
                                </>
                            }>
                                {featuredProducts.map((product: Product) => (
                                    <ProductItem key={product.id} product={product} />
                                ))}
                            </React.Suspense>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default FeaturedProducts;
