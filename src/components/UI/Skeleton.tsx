import * as React from "react";

const ProductSkeleton: React.FC = () => {
    return (
        <>
            <div className="animate-pulse bg-gray-200 h-80 w-full rounded mb-5" />
            <div className="animate-pulse bg-gray-200 h-10 w-full rounded" />
        </>
    );
}

export default ProductSkeleton;