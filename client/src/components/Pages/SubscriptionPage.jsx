import React, { useState } from 'react';
import SubscriptionComponent from '../SubscriptionComponent';
import backImg from "./../../assests/subscriptionBack.jpg"

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

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

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div 
      className="p-6 text-center"
      style={{
        backgroundImage: `url(${backImg})`,
        backgroundSize: 'cover', // Adjust background size
        backgroundPosition: 'center', // Center the background image
        minHeight: '100vh', // Ensure it covers the full viewport height
      }}
    >
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
    </div>
  );
};

export default SubscriptionPage;
