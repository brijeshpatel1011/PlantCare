import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SubscriptionComponent = ({ plan }) => {
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const handlePayment = async () => {
    const { data } = await axios.post('http://localhost:8080/api/razorpay/create-order', { amount: plan.amount });

    if (!data) {
      alert('Unable to create order');
      return;
    }

    const token = localStorage.getItem('token');
    let userId;
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded._id;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      name: 'PlantCare Subscription',
      description: `Subscribe to ${plan.name}`,
      order_id: data.id,
      handler: async function (response) {
        const verifyUrl = 'http://localhost:8080/api/razorpay/verify-payment';
        const { data: verifyData } = await axios.post(verifyUrl, {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          userId: userId,
          plan: plan.name,
        });

        if (verifyData.success) {
          alert('Payment successful!');
          navigate("/Supply");
        } else {
          alert('Payment failed! Invalid signature');
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
    <button onClick={handlePayment} className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition duration-300">
      Proceed to Pay ₹{plan.amount} for {plan.name}
    </button>
  );
};

export default SubscriptionComponent;