export type BillingDetailsType = {
    country: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    state: string;
    postalCode: string;
    email: string;
    phone: string;
    createAccount?: boolean;
    differentAddress?: boolean;
    orderNotes?: string;
};

export type CheckoutOrderType = {
    id?: string;
    billingDetails: BillingDetailsType;
    cartItems: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }>;
    subtotal: number;
    total: number;
    orderDate: string;
    status?: string;
};

export type CheckoutResponseType = {
    success: boolean;
    orderId: string;
    message: string;
    order: CheckoutOrderType;
};
