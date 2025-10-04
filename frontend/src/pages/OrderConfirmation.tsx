import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Button from '../components/UI/Button';
import PageContent from "../layout/PageContent";
import SuccessBlock from "../components/UI/SuccessBlock.tsx";
import ErrorBlock from "../components/UI/ErrorBlock.tsx";
import {useGetOrder} from '../hooks/useOrders';
import {currencyFormatter, formatDateShort} from '../utils/formatting';
import {OrderConfirmationSkeleton} from "../components/UI/Skeleton.tsx";

const OrderConfirmation: React.FC = () => {
    const {orderId} = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const {data: orderResponse, isLoading, error} = useGetOrder(orderId || null);

    if (isLoading) {
        return (
            <PageContent>
                <div className="grid md:grid-cols-2 gap-8">
                    <OrderConfirmationSkeleton />
                    <OrderConfirmationSkeleton />
                </div>
            </PageContent>
        );
    }

    if (error || !orderResponse?.success) {
        return (
            <div className="flex items-center justify-center">
                <ErrorBlock title="Error" message="Unable to retrieve your order details." />
                <Button
                    label="Retour à l'accueil"
                    className="mt-4"
                    onClick={() => navigate('/')}
                    darkButtonLink
                />
            </div>
        );
    }

    const {order} = orderResponse;

    return (
        <PageContent>
            <div className="text-center mb-8">
                <h1 className="text-3xl text-[color:var(--dark)] mb-10">Thank you for your order !</h1>
                <p className="text-lg">
                    Your order has been successfully confirmed !
                </p>
                <SuccessBlock title="Order number" message={`Order number : ${order.id}`} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-3xl text-[color:var(--dark)] mb-4">Billing Information</h2>
                    <div className="bg-[color:var(--white)] p-4 lg:p-12 border-1 border-gray-200">
                        <div className="space-y-2 text-[color:var(--dark)]">
                            <p><span
                                className="font-bold">Name :</span> {order.billingDetails.firstName} {order.billingDetails.lastName}
                            </p>
                            <p><span className="font-bold">Email :</span> {order.billingDetails.email}</p>
                            <p><span className="font-bold">Phone :</span> {order.billingDetails.phone}</p>
                            <p><span className="font-bold">Country :</span> {order.billingDetails.country}</p>
                            <p><span className="font-bold">Adress :</span> {order.billingDetails.address}</p>
                            {order.billingDetails.apartment && (
                                <p><span className="font-bold">Apartment :</span> {order.billingDetails.apartment}</p>
                            )}
                            <p><span className="font-bold">State / Country :</span> {order.billingDetails.state}</p>
                            <p><span className="font-bold">Postal / Zip :</span> {order.billingDetails.postalCode}</p>
                            {order.billingDetails.orderNotes && (
                                <p><span className="font-bold">Order Notes :</span> {order.billingDetails.orderNotes}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl text-[color:var(--dark)] mb-4">Order Details</h2>
                    <div className="bg-[color:var(--white)] p-4 lg:p-12 border-1 border-gray-200">
                        <div className="space-y-4 text-[color:var(--dark)]">
                            <p><span className="font-bold">Order date :</span> {formatDateShort(order.orderDate)}</p>
                            <p><span className="font-bold">Status :</span> <span className="text-[color:var(--secondary-dark)]">Pending</span></p>

                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold mb-3">Products ordered</h3>
                                <div className="space-y-2">
                                    {order.cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm">Quantity : {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">
                                                {currencyFormatter.format(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 mt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-lg">Subtotal :</p>
                                        <p className="text-lg">{currencyFormatter.format(order.subtotal)}</p>
                                    </div>
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <p>Total :</p>
                                        <p>{currencyFormatter.format(order.total)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <p className="mb-4">
                    You will soon receive a confirmation email with all the details of your order.
                </p>
                <div className="md:flex flex-wrap mt-4 justify-center gap-4">
                    <Button as="link" label="Continue shopping" to="/shop" />
                    <Button label="Return to home" as="link" to="/" darkButtonLink />
                </div>
            </div>
        </PageContent>
    );
};

export default OrderConfirmation;
