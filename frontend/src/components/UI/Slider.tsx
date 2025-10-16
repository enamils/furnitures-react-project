import React, { useState, useEffect } from "react";
import SliderItem from "./SliderItem";
import SliderButton from "./SliderButton";
import type {SlideType} from "../../types/slideType";

type SliderProps = {
    slides: SlideType[];
};

const Slider: React.FC<SliderProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    // Auto slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev: number) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToPrevious = () => {
        setCurrentSlide((prev: number) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <h2 className="text-3xl text-[color:var(--dark)] mb-6 text-center">Testimonials</h2>
            <div className="relative w-full">
                <div className="hidden md:block">
                    <SliderButton
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                    />
                    <SliderButton
                        rightArrow
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                    />
                </div>

                <div className="relative overflow-hidden max-w-4xl mx-auto">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <SliderItem
                                    content={slide.content}
                                    image={slide.image}
                                    name={slide.name}
                                    position={slide.position}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-4 relative z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="w-11 h-11 rounded-full transition-colors cursor-pointer flex items-center justify-center"
                            aria-label={`Go to slide ${index + 1}`}>
                            <span
                                className={`w-2 h-2 rounded-full ${
                                    index === currentSlide
                                        ? 'bg-[color:var(--primary)]'
                                        : 'bg-[color:var(--gray-lighter)] hover:bg-[color:var(--primary)]'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Slider;
