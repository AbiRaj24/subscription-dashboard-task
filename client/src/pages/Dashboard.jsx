import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { subscriptionService } from "../services/authService";
import {
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await subscriptionService.getMySubscription();
      setSubscription(response.data.subscription);
    } catch (err) {
      console.error("Failed to load subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm("Are you sure you want to cancel your subscription?")) {
      return;
    }

    setCancelling(true);
    try {
      await subscriptionService.cancelSubscription();
      await fetchSubscription();
    } catch (err) {
      alert("Failed to cancel subscription");
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your subscription and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Subscription Status Card */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Subscription Status
            </h2>

            {subscription ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {subscription.plan_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      ${subscription.price} /{" "}
                      {subscription.duration === 365 ? "year" : "month"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {subscription.status === "active" ? (
                      <span className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-600 ring-1 ring-green-500/20 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircleIcon className="h-5 w-5 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-600 ring-1 ring-red-500/20 dark:bg-red-900/20 dark:text-red-400">
                        <XCircleIcon className="h-5 w-5 mr-1" />
                        {subscription.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <CalendarIcon className="h-6 w-6 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Start Date
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatDate(subscription.start_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CalendarIcon className="h-6 w-6 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        End Date
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatDate(subscription.end_date)}
                      </p>
                    </div>
                  </div>
                </div>

                {subscription.status === "active" && (
                  <div className="bg-blue-500/5 ring-1 ring-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>{getDaysRemaining(subscription.end_date)}</strong>{" "}
                      days remaining in your subscription
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Plan Features
                  </h4>
                  <ul className="space-y-2">
                    {JSON.parse(subscription.features).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 leading-relaxed"
                      >
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {subscription.status === "active" && (
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleCancelSubscription}
                      disabled={cancelling}
                      className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium shadow-sm hover:bg-red-700 hover:shadow-md transition-all disabled:opacity-50"
                    >
                      {cancelling ? "Cancelling..." : "Cancel Subscription"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <CreditCardIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Active Subscription
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You don't have an active subscription yet
                </p>
                <Link to="/plans" className="btn-blue inline-block">
                  Browse Plans
                </Link>
              </div>
            )}
          </div>

          {/* Account Info Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-8">

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Account Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                <p className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                  {user?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Email
                </p>
                <p className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                  {user?.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
