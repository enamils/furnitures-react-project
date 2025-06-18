import * as React from "react";
import Hero from "../components/Hero/Hero.tsx";
import PageContent from "../layout/PageContent.tsx";
import ContactForm from "../components/Form/ContactForm.tsx";

const ContactUsPage: React.FC = () => {
    return (
        <>
            <Hero title="Contact"
                  text="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." />
            <PageContent>
                <ContactForm />
            </PageContent>
        </>
    );
}

export default ContactUsPage;