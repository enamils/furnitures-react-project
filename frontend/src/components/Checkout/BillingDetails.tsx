import React, { useState } from "react";
import Select from "../UI/Select.tsx";
import Input from "../UI/Input.tsx";

const BillingDetails: React.FC = () => {
    const [showAccountInfo, setShowAccountInfo] = useState<boolean>(false);

    const handleCreateAccountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setShowAccountInfo(e.target.checked);
    };

    return (
        <div>
            <h2 className="text-3xl text-[color:var(--dark)] mb-4">Billing Details</h2>
            <div className="bg-[color:var(--white)] p-4 lg:p-12 border-1 border-gray-200">
                <Select
                    id="country"
                    label="Country"
                    className="mb-1"
                    options={[
                        { value: "fr", label: "France" },
                        { value: "be", label: "Belgium" },
                        { value: "ch", label: "Switzerland" },
                        { value: "ca", label: "Canada" },
                        { value: "us", label: "United States" },
                    ]}
                    name="country"
                    required
                />

                <div className="grid md:grid-cols-2 md:gap-4 mb-1">
                    <Input id="firstName" label="First Name" name="firstName" required />
                    <Input id="lastName" label="Last Name" name="lastName" required />
                </div>

                <Input id="adress" label="Adress" placeholder="Street adress" className="mb-1" name="adress" required />
                <Input id="apartment" label="Adress" placeholder="Apartment, suite, unit etc." className="mb-1" name="apartment" />

                <div className="grid md:grid-cols-2 md:gap-4 mb-1">
                    <Input id="state" label="State / Country" name="state" required />
                    <Input id="cp" label="Postal / Zip" type="text" pattern="[0-9]{5}" name="cp" required />
                </div>

                <div className="grid md:grid-cols-2 md:gap-4">
                    <Input id="email" label="Email Adress" type="email" name="email" required />
                    <Input id="tel" label="Phone" type="tel" name="tel" required />
                </div>

                <div className="mt-12">
                    <label className="text-[color:var(--black)] cursor-pointer block" htmlFor="createAccount">
                        <input
                            type="checkbox"
                            id="createAccount"
                            className="mr-1"
                            name="createAccount"
                            onChange={handleCreateAccountChange}
                        />
                        Create an account ?
                    </label>

                    {showAccountInfo && (
                        <p className="mt-4 mb-4 text-sm text-gray-700">
                            Create an account by entering the information below.<br /> If you are a returning customer please login at the top of the page.
                        </p>
                    )}

                    <label className="text-[color:var(--black)] cursor-pointer block" htmlFor="differentAdress">
                        <input type="checkbox" id="differentAdress" className="mr-1" name="differentAdress" />
                        Ship To A Different Address?
                    </label>
                </div>

                <Input
                    id="orderNotes"
                    label="Order Notes"
                    textarea
                    placeholder="Write your notes here..."
                    name="orderNotes"
                    className="mt-2"
                />
            </div>
        </div>
    );
};

export default BillingDetails;
