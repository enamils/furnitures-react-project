import * as React from "react";

const InfoBlock: React.FC<{message: string}> = ({message}) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-blue-100 border border-blue-300 text-blue-700 rounded-md my-8">
            <svg className="w-8 h-8 mb-2 blue-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
            </svg>
            <span>{message}</span>
        </div>
    );
}

export default InfoBlock;