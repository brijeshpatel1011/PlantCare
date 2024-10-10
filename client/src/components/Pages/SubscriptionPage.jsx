import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionComponent from '../SubscriptionComponent';
import backImg from './../../assests/subscriptionBack.jpg';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      amount: 299,
      duration: '3 months',
      features: [
        '1 user access',
        '20GB Cloud storage',
        'Integration help',
      ],
    },
    {
      id: 2,
      name: 'Standard Plan',
      amount: 499,
      duration: '6 months',
      features: [
        '2 team members',
        '50GB Cloud storage',
        'Integration help',
      ],
    },
    {
      id: 3,
      name: 'Premium Plan',
      amount: 999,
      duration: '12 months',
      features: [
        '5 team members',
        '100GB Cloud storage',
        'Integration help',
      ],
    },
  ];

  const fetchSubscription = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await axios.get('http://localhost:8080/api/users/me', {
          headers: {
            'x-auth-token': token
          }
        });
        setSubscription(data.subscription);

        // Redirect if the user already has an active subscription
        if (data.subscription) {
          navigate('/Supply'); // Redirect to Supply.jsx
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or better loading UI
  }

  return (
    <div 
      className="p-6 text-center"
      style={{
        backgroundImage: `url(${backImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {!subscription ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-black">Subscription Plans</h1>
          <div className="flex justify-center gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md p-6 w-80">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold mb-4">₹{plan.amount} / {plan.duration}</p>
                <ul className="list-disc list-inside mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">✓ {feature}</li>
                  ))}
                </ul>
                <button
                  className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition duration-300"
                  onClick={() => handleChoosePlan(plan)}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
          <div className='mt-6'>
            {selectedPlan && <SubscriptionComponent plan={selectedPlan} />}
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-8 text-black">You already have an active subscription!</h1>
          <p className="text-xl text-gray-700">You are subscribed to the {subscription.plan}.</p>
          <p className="text-lg text-gray-600">Your subscription is valid until {new Date(subscription.endDate).toLocaleDateString()}.</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
