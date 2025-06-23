import * as React from "react";
import Input from "../UI/Input.tsx";
import Button from "../UI/Button.tsx";

const ContactForm: React.FC = () => {
    return (
        <>
            <form className="lg:max-w-[60rem] mx-auto">
                <div className="grid md:grid-cols-2 md:gap-3 lg:gap-4">
                    <Input id="firstname" label="First name" type="text" />
                    <Input id="lastname" label="Last name" type="text" />
                </div>
                <Input id="email" label="Email adress" type="email" />
                <Input className="mb-12" textarea id="textarea" label="Message" cols={30} rows={5} />
                <Button label="Send message" />
            </form>
        </>
    );
}

export default ContactForm