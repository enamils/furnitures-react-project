import * as React from "react";
import Input from "./UI/Input.tsx";

const Subscribe: React.FC = () => {
    return (
        <div className=" w-full">
            <div className="w-full lg:w-8/12">
                <p>Subscribe to Newsletters</p>
                <Input id="test" placeholder="Enter your name" className="w-full" />
            </div>
        </div>
    );
}
export default Subscribe;