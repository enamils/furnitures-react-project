import * as React from "react";
import {Outlet} from "react-router-dom";

import MainNavigation from "../components/MainNavigation.tsx";
import Footer from "../components/Footer.tsx";

const RootLayout: React.FC = () => {
  return (
        <>
            <MainNavigation />
            <main role="main">
                <Outlet />
            </main>
            <Footer />
        </>
  );
}

export default RootLayout;