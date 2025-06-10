import * as React from "react";
import Input from "./UI/Input.tsx";
import SubscribeButton from "./UI/SubscribeButton.tsx";
import imgLetterOutline from "../assets/images/envelope-outline.svg"

const Subscribe: React.FC = () => {
    return (
        <div className="w-full lg:w-8/12">
            <div className="mb-10 mt-28 lg:mt-0 lg:mb-20 relative z-2">
                <p className="flex text-lg text-[color:var(--primary)] mb-2 font-medium">
                    <span className="mr-1">
                        <img src={imgLetterOutline} alt="Image"/>
                    </span>
                    Subscribe to Newsletter
                </p>
                <form className="flex flex-wrap gap-4 items-center w-full">
                    <div className="flex-none w-auto">
                        <Input id="test" placeholder="Enter your name" type="text"/>
                    </div>
                    <div className="flex-none w-auto">
                        <Input id="test1" placeholder="Enter your email" type="email"/>
                    </div>
                    <div className="flex-none w-auto">
                        <SubscribeButton/>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Subscribe;