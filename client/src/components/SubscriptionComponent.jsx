import React, { useEffect } from 'react';
import axios from 'axios';

const SubscriptionComponent = ({ plan }) => {
    useEffect(() => {
        loadRazorpayScript();
    }, []);

    const loadRazorpayScript = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    };

    const handlePayment = async () => {
        // Create an order from backend
        const { data } = await axios.post('/api/razorpay/create-order', { amount: plan.amount });

        if (!data.success) {
            alert('Error in creating Razorpay order');
            return;
        }

        const options = {
            key: process.env.RAZORPAY_KEY_ID,
            amount: data.order.amount,
            currency: 'INR',
            name: 'Plant Care Subscription',
            description: `Subscribe to ${plan.name}`,
            order_id: data.order.id,
            handler: async function (response) {
                // Verify payment on the backend
                const verifyResponse = await axios.post('/api/razorpay/verify-payment', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                if (verifyResponse.data.success) {
                    alert('Payment Successful! Subscription Activated.');
                } else {
                    alert('Payment verification failed');
                }
            },
            prefill: {
                name: 'Your Name',
                email: 'your.email@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div>
            <button onClick={handlePayment}>
                Proceed to Pay ₹{plan.amount} for {plan.name}
            </button>
        </div>
    );
};

export default SubscriptionComponent;
