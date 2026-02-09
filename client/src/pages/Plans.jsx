import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { planService, subscriptionService } from '../services/authService';
import { CheckIcon } from '@heroicons/react/24/solid';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await planService.getAllPlans();
      setPlans(response.data.plans);
    } catch (err) {
      setError('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    setSubscribing(planId);
    setError('');

    try {
      await subscriptionService.subscribe(planId);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setSubscribing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Select the perfect plan for your needs
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/20 p-4 max-w-2xl mx-auto">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /{plan.duration === 365 ? 'year' : 'month'}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={subscribing === plan.id}
                className="w-full btn-blue"
              >
                {subscribing === plan.id ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;