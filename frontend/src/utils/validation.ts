import type { BillingDetailsType } from '../types/checkoutType';

export type ValidationErrors = {
    [key: string]: string;
};

export const validateBillingDetails = (data: Partial<BillingDetailsType>): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Validation of required fields
    if (!data.country || data.country.trim() === '') {
        errors.country = 'Country is required';
    }

    if (!data.firstName || data.firstName.trim() === '') {
        errors.firstName = 'First name is required';
    }

    if (!data.lastName || data.lastName.trim() === '') {
        errors.lastName = 'Name is required';
    }

    if (!data.address || data.address.trim() === '') {
        errors.address = 'Address is required';
    }

    if (!data.state || data.state.trim() === '') {
        errors.state = 'State/Region is required';
    }

    if (!data.postalCode || data.postalCode.trim() === '') {
        errors.postalCode = 'Postal code is required';
    } else if (!/^[0-9]{5}$/.test(data.postalCode)) {
        errors.postalCode = 'The postal code must contain 5 digits';
    }

    if (!data.email || data.email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Email is not valid';
    }

    if (!data.phone || data.phone.trim() === '') {
        errors.phone = 'Phone is required';
    }

    return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
    return Object.keys(errors).length > 0;
};
