import * as React from "react";
import {Outlet, ScrollRestoration} from "react-router-dom";

import MainNavigation from "../components/Menu/MainNavigation.tsx";
import Footer from "../components/Footer/Footer.tsx";

const RootLayout: React.FC = () => {
  return (
        <>
            <MainNavigation />
            <main role="main">
                <Outlet />
            </main>
            <Footer />
            <ScrollRestoration />
        </>
  );
}

export default RootLayout;