import React from "react";
import Select from "../UI/Select.tsx";
import Input from "../UI/Input.tsx";

const BillingDetails: React.FC = () => {

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
                    required
                />

                <div className="grid md:grid-cols-2 md:gap-4 mb-1">
                    <Input id="firstName" label="First Name" />
                    <Input id="lastName" label="Last Name" />
                </div>

                <Input id="adress" label="Adress" placeholder="Street adress" className="mb-1" />
                <Input id="apartment" label="Adress" placeholder="Apartment, suite, unit etc." className="mb-1" />
                <div className="grid md:grid-cols-2 md:gap-4 mb-1">
                    <Input id="state" label="State / Country" />
                    <Input id="cp" label="Postal / Zip" type="text" pattern="[0-9]{5}"/>
                </div>

                <div className="grid md:grid-cols-2 md:gap-4">
                    <Input id="email" label="Email Adress" type="email" />
                    <Input id="tel" label="Phone" type="tel" />
                </div>

                <div className="mt-12">
                    <label className="text-[color:var(--black)] cursor-pointer block" htmlFor="createAccount">
                        <input type="checkbox" id="createAccount" className="mr-1" />
                        Create an account
                    </label>

                    <label className="text-[color:var(--black)] cursor-pointer block" htmlFor="differentAdress">
                        <input type="checkbox" id="differentAdress" className="mr-1" />
                        Ship To A Different Address?
                    </label>
                </div>

                <Input
                    id="orderNotes"
                    label="Order Notes"
                    textarea
                    placeholder="Write your notes here..."
                    className="mt-2" cols={30} rows={5}
                />
            </div>
        </div>
    );
}

export default BillingDetails;