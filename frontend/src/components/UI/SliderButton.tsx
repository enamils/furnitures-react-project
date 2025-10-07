import React from "react";
import classes from "./SliderButton.module.css";

type SliderButtonProps = {
    className?: string,
    rightArrow?: boolean
}


const SliderButton: React.FC<SliderButtonProps>= ({className = "", rightArrow = false, ...rest}) => {
    const cssSliderButton = [
        classes.sliderButton,
        className
    ].filter(Boolean).join(" ");

  return (
      <button className={cssSliderButton} type="button" {...rest}>
          <span className="flex justify-center items-center">
              <span className="block">
                  {rightArrow ? '\u2192' : '\u2190'}
              </span>
          </span>
      </button>
  )
}

export default SliderButton;