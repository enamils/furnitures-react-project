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

export const TeamsProfileSkeleton: React.FC = () => {
    return (
        <>
            <div className="animate-pulse bg-gray-200 h-75 w-full rounded mb-12" />
            <div className="animate-pulse bg-gray-200 h-9 w-3/4 rounded mb-4" />
            <div className="animate-pulse bg-gray-200 h-6 w-2/4 rounded mb-6" />
            <div className="animate-pulse bg-gray-200 h-3 w-full rounded mb-1" />
            <div className="animate-pulse bg-gray-200 h-3 w-full rounded mb-1" />
            <div className="animate-pulse bg-gray-200 h-3 w-4/5 rounded mb-4" />
            <div className="animate-pulse bg-gray-200 h-3 w-2/5 rounded" />
        </>
    );
}