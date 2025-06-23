import * as React from "react";

export const ProductSkeleton: React.FC = () => {
    return (
        <>
            <div className="animate-pulse bg-gray-200 h-80 w-full rounded mb-5" />
            <div className="animate-pulse bg-gray-200 h-10 w-full rounded" />
        </>
    );
}

export const PostSkeleton: React.FC = () => {
    return (
        <div className="mb-10">
            <div className="animate-pulse bg-gray-200 h-70 w-full rounded mb-5" />
            <div className="animate-pulse bg-gray-200 h-5 w-full rounded mb-5" />
            <div className="animate-pulse bg-gray-200 h-5 w-full rounded" />
        </div>
    )
}

export const ImagePickerSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse bg-gray-200 h-43 w-full rounded" />
    );
}