import * as React from "react";
import MainNavigation from "../components/Menu/MainNavigation.tsx";
import PageContent from "../layout/PageContent.tsx";
import ErrorBlock from "../components/UI/ErrorBlock.tsx";
import Footer from "../components/Footer/Footer.tsx";

const ErrorPage: React.FC = () => {
    return (
        <>
            <MainNavigation />
            <PageContent>
                <ErrorBlock title="Not Found" message="Could not find resource or page !" />
            </PageContent>
            <Footer />
        </>
    );
}

export default ErrorPage;