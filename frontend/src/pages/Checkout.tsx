import React, { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import BillingDetails from "../components/Checkout/BillingDetails.tsx";
import Order from "../components/Checkout/Order.tsx";
import { useCartState, useCartActions } from "../hooks/useCart.ts";
import { useCreateOrder } from "../hooks/useOrders.ts";
import { validateBillingDetails, hasValidationErrors, type ValidationErrors } from "../utils/validation.ts";
import type { BillingDetailsType, CheckoutOrderType } from "../types/checkoutType.ts";
import ErrorBlock from "../components/UI/ErrorBlock.tsx";

type CheckoutState = {
    errors: ValidationErrors;
    isSubmitting: boolean;
    success: boolean;
};

const initialState: CheckoutState = {
    errors: {},
    isSubmitting: false,
    success: false,
};

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { cart } = useCartState();
    const { clearCart } = useCartActions();
    const createOrderMutation = useCreateOrder();

    const checkoutAction = async (_prevState: CheckoutState, formData: FormData): Promise<CheckoutState> => {
        const billingData: Partial<BillingDetailsType> = {
            country: formData.get('country') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            address: formData.get('address') as string,
            apartment: formData.get('apartment') as string || undefined,
            state: formData.get('state') as string,
            postalCode: formData.get('postalCode') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            createAccount: formData.get('createAccount') === 'on',
            differentAddress: formData.get('differentAddress') === 'on',
            orderNotes: formData.get('orderNotes') as string || undefined,
        };

        const validationErrors = validateBillingDetails(billingData);

        if (hasValidationErrors(validationErrors)) {
            return {
                errors: validationErrors,
                isSubmitting: false,
                success: false,
            };
        }

        if (cart.length === 0) {
            return {
                errors: { general: "Your cart is empty" },
                isSubmitting: false,
                success: false,
            };
        }

        try {
            const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
            const total = subtotal; // no taxes or delivery fees yet

            const orderData: Omit<CheckoutOrderType, 'orderDate'> = {
                billingDetails: billingData as BillingDetailsType,
                cartItems: cart,
                subtotal,
                total,
            };

            const response = await createOrderMutation.mutateAsync(orderData);

            if (response.success) {
                clearCart();
                navigate(`/order-confirmation/${response.orderId}`);

                return {
                    errors: {},
                    isSubmitting: false,
                    success: true,
                };
            } else {
                return {
                    errors: { general: response.message || "Error creating order" },
                    isSubmitting: false,
                    success: false,
                };
            }
        } catch {
            return {
                errors: { general: "An error occurred while submitting the order" },
                isSubmitting: false,
                success: false,
            };
        }
    };

    const [state, formAction, isPending] = useActionState(checkoutAction, initialState);

    return (
        <form action={formAction}>
            {state.errors.general && <ErrorBlock title="Error" message={state.errors.general} />}

            <div className="grid md:grid-cols-2 md:gap-8">
                <BillingDetails errors={state.errors} />
                <Order isPending={isPending} />
            </div>
        </form>
    );
}

export default CheckoutPage;