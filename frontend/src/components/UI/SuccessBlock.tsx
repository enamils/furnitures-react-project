import * as React from "react";
import type {SuccessType} from "../../types/successType.ts";

const SuccessBlock: React.FC<SuccessType> = ({title, message}) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-green-100 border border-green-300 text-green-700 rounded-md my-8">
            <svg className="w-8 h-8 mb-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
            </svg>
            <span className="text-4xl mb-3">{title}</span>
            <span>{message}</span>
        </div>
    );
}

export default SuccessBlock;
