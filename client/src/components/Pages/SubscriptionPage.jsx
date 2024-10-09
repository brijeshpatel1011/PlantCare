import React, { useState } from 'react';
import SubscriptionComponent from '../components/SubscriptionComponent';

const SubscriptionPage = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        { id: 1, name: 'Basic Plan', amount: 100 },
        { id: 2, name: 'Standard Plan', amount: 200 },
        { id: 3, name: 'Premium Plan', amount: 300 },
    ];

    const handleChoosePlan = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div>
            <h1>Choose Your Subscription Plan</h1>
            <div className="plans">
                {plans.map((plan) => (
                    <div key={plan.id} className="plan-card">
                        <h3>{plan.name}</h3>
                        <p>Price: ₹{plan.amount}</p>
                        <button onClick={() => handleChoosePlan(plan)}>
                            Choose {plan.name}
                        </button>
                    </div>
                ))}
            </div>

            {selectedPlan && (
                <div className="payment-section">
                    <h2>You chose: {selectedPlan.name}</h2>
                    <SubscriptionComponent plan={selectedPlan} />
                </div>
            )}
        </div>
    );
};

export default SubscriptionPage;
