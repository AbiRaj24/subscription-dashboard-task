import { Link } from 'react-router-dom';
import { 
  CreditCardIcon, 
  ShieldCheckIcon, 
  ChartBarIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      name: 'Flexible Plans',
      description: 'Choose from a variety of subscription plans that fit your needs and budget.',
      icon: CreditCardIcon,
    },
    {
      name: 'Secure Payments',
      description: 'Your payment information is always safe with our secure payment processing.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Usage Analytics',
      description: 'Track your subscription usage and get insights into your spending patterns.',
      icon: ChartBarIcon,
    },
    {
      name: 'Team Management',
      description: 'Manage multiple users and subscriptions from a single admin dashboard.',
      icon: UserGroupIcon,
    },
  ];

  return (
    <div className="min-h-screen  dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
            Subscription Management
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
            Manage all your subscriptions in one place. Choose the perfect plan, track your usage, and stay in control of your spending.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="btn-blue text-lg px-8 py-3 border-4 rounded-md border-blue-600"
            >
              Get Started
            </Link>
            <Link
              to="/plans"
              className="btn-secondary text-lg px-8 py-3 border-4 rounded-md border-blue-600"
            >
              View Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Powerful features to help you manage your subscriptions effectively
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="card hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of satisfied users managing their subscriptions with ease.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Create your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;