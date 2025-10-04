import React, { useState } from "react";
import Select from "../UI/Select.tsx";
import Input from "../UI/Input.tsx";
import type { ValidationErrors } from "../../utils/validation.ts";

interface BillingDetailsProps {
    errors: ValidationErrors;
}

const BillingDetails: React.FC<BillingDetailsProps> = ({ errors }) => {
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
                        { value: "FRANCE", label: "France" },
                        { value: "BELGIUM", label: "Belgium" },
                        { value: "SWITZERLAND", label: "Switzerland" },
                        { value: "CANADA", label: "Canada" },
                        { value: "USA", label: "United States" },
                    ]}
                    name="country"
                    required
                    error={errors.country}
                />

                <div className="grid md:grid-cols-2 md:gap-4 mb-1">
                    <Input
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        required
                        error={errors.firstName}
                    />
                    <Input
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        required
                        error={errors.lastName}
                    />
                </div>

                <Input
                    id="address"
                    label="Address"
                    placeholder="Street address"
                    className="mb-1"
                    name="address"
                    required
                    error={errors.address}
                />
                <Input
                    id="apartment"
                    label="Apartment"
                    placeholder="Apartment, suite, unit etc."
                    className="mb-1"
                    name="apartment"
                />

                <div className="grid md:grid-cols-2 md:gap-4 mb-1">
                    <Input
                        id="state"
                        label="State / Country"
                        name="state"
                        required
                        error={errors.state}
                    />
                    <Input
                        id="postalCode"
                        label="Postal / Zip"
                        type="text"
                        pattern="[0-9]{5}"
                        name="postalCode"
                        required
                        error={errors.postalCode}
                    />
                </div>

                <div className="grid md:grid-cols-2 md:gap-4">
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        name="email"
                        required
                        error={errors.email}
                    />
                    <Input
                        id="phone"
                        label="Phone"
                        type="tel"
                        name="phone"
                        required
                        error={errors.phone}
                    />
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
