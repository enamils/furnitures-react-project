import * as React from "react";

import MenuLinks from "./MenuLinks.tsx";
import ClientCart from "./ClientCart.tsx";

const MainNavigation: React.FC = () => {
    return (
        <header role="banner">
            <div>
                <nav role="navigation">
                    <MenuLinks />
                    <ClientCart />
                </nav>
            </div>
        </header>
    );
}

export default MainNavigation;