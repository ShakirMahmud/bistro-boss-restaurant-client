import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaCreditCard, FaMoneyCheckAlt, FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import useCart from './../../../hooks/useCart';
import axios from 'axios';

const CheckoutForm = ( ) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecrete, setClientSecrete] = useState('');
    const axiosSecure = useAxiosSecure();
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, isLoading] = useCart();
    
    useEffect(() => {
        if (cart && cart.length > 0) {
            const price = cart.reduce((sum, item) => sum + item.price, 0);
            setTotalPrice(price);
        } else {
            setTotalPrice(0);
        }
    }, [cart]);

    useEffect(() => {
        axiosSecure.post('/payment', {
            price: totalPrice
        })
        .then(response => {
            console.log(response.data.clientSecret);
            setClientSecrete(response.data.clientSecret);
        })
        .catch(error => {
            console.error('Payment Error:', error);
        });
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });



        if (error) {
            console.log('[error]', error);
            setError(error.message);
            setProcessing(false);
        } else {
            setError(null);
            console.log('[PaymentMethod]', paymentMethod);
            
            // Here you would typically call your backend to confirm payment
            try {
                // Example backend call
                // const response = await axiosSecure.post('/payments', {
                //     price,
                //     transactionId: paymentMethod.id
                // });

                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    text: `Transaction ID: ${paymentMethod.id}`
                });

                setTransactionId(paymentMethod.id);
                setProcessing(false);
            } catch (err) {
                console.error('Payment Error:', err);
                setProcessing(false);
            }
        }
    };

    // if (isLoading) {
    //     return (
    //         <div className="text-center">
    //             <FaSpinner className="loading loading-spinner" />
    //         </div>
    //     );
    // }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center justify-center mb-6">
                <FaMoneyCheckAlt className="text-4xl text-[#BB8506] mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Secure Checkout</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Details
                    </label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FaCreditCard className="text-[#BB8506] mr-2" />
                        <span className="text-gray-700">Total Amount:</span>
                        <span className="font-bold ml-2 text-[#BB8506]">${totalPrice}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!stripe || processing || !clientSecrete || error}
                    className="w-full bg-[#BB8506] text-white py-3 rounded-lg 
                    hover:bg-[#9c6e05] transition duration-300 
                    flex items-center justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? (
                        <>
                            <span className="loading loading-spinner mr-2"></span>
                            Processing Payment...
                        </>
                    ) : (
                        'Pay Now'
                    )}
                </button>

                {transactionId && (
                    <div className="mt-4 text-center">
                        <p className="text-green-600">
                            Transaction Completed: 
                            <span className="font-bold ml-2">{transactionId}</span>
                        </p>
                    </div>
                )}
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>💡 Secure payment powered by Stripe</p>
                <p>Your payment information is encrypted and secure</p>
            </div>
        </div>
    );
};

export default CheckoutForm;