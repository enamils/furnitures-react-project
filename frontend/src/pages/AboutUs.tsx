import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import Teams from "../components/Teams/Teams.tsx";

const AboutUsPage: React.FC = () => {
    return (
        <>
            <Hero
                title="About Us"
                text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
            <PageContent>
                <Teams />
            </PageContent>
        </>
    );
}

export default AboutUsPage;