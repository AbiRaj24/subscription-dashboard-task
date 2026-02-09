import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { toggleTheme } from '../store/themeSlice';
import { authService } from '../services/authService';
import { 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  CreditCardIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { isAuthenticated, user, refreshToken } = useSelector((state) => state.auth);
  const { isDark } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout(refreshToken);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <CreditCardIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SubsManager
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/plans"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CreditCardIcon className="h-5 w-5" />
                  <span>Plans</span>
                </Link>

                {user?.role === 'admin' && (
                  <Link
                    to="/admin/subscriptions"
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                )}

                <button
                  onClick={handleToggleTheme}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>

                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700">
                  <UserCircleIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleToggleTheme}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>

                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-blue"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;