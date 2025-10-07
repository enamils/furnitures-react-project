import React from "react";
import type {SlideType} from "../../types/slideType.ts";

const SliderItem: React.FC<SlideType> = ({ content, image, name, position }) => {
    return (
        <div className="text-center">
            <div className="mb-6">
                <blockquote className="text-lg italic mb-11 leading-8">
                    <p className="mb-4">"{content}"</p>
                </blockquote>
                <div className="flex flex-col items-center">
                    <div className="mb-4">
                        <img
                            src={image}
                            alt={name}
                            loading="lazy"
                            className="max-w-16 h-16 rounded-full object-cover"
                        />
                    </div>
                    <h3 className="font-bold mb-1 text-[color:var(--dark)] text-sm">{name}</h3>
                    <p>{position}</p>
                </div>
            </div>
        </div>
    );
};

export default SliderItem;
