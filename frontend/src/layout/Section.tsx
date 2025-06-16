import * as React from "react";
import type {ReactNode} from "react";

const SectionContainer: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <section className="py-28 px-0">
            <div className="px-10">
                <div className="container max-w-screen-xl mx-auto">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default SectionContainer;