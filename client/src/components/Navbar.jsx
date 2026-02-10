import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState,useRef,useEffect } from "react";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";
import { authService } from "../services/authService";

import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { isAuthenticated, user, refreshToken } = useSelector(
    (state) => state.auth
  );
  const { isDark } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ mobile menu state
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout(refreshToken);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const menuRef = useRef(null);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <nav  ref={menuRef} className="bg-white py-4 dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <CreditCardIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SUBSCRIBES
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link className="nav-link" to="/dashboard">
                  {/* <HomeIcon className="h-5 w-5" /> */}
                  Dashboard
                </Link>

                <Link className="nav-link" to="/plans">
                  {/* <CreditCardIcon className="h-5 w-5" /> */}
                  Plans
                </Link>

                {user?.role === "admin" && (
                  <Link className="nav-link" to="/admin/subscriptions">
                    <Cog6ToothIcon className="h-5 w-5" />
                    Admin
                  </Link>
                )}

                {/* Theme Toggle */}
                <button
                  onClick={handleToggleTheme}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDark ? (
                    <SunIcon className="h-6 w-6" />
                  ) : (
                    <MoonIcon className="h-6 w-6" />
                  )}
                </button>

                {/* User */}
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700">
                  <UserCircleIcon className="h-5 w-5" />
                  <span>{user?.name}</span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={handleToggleTheme}>
                  {isDark ? (
                    <SunIcon className="h-6 w-6" />
                  ) : (
                    <MoonIcon className="h-6 w-6" />
                  )}
                </button>

                <Link to="/login">Login</Link>
                <Link to="/register" className="btn-blue">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {isAuthenticated ? (
            <>
              <Link className="block nav-link" to="/dashboard">
                Dashboard
              </Link>

              <Link className="block nav-link" to="/plans">
                Plans
              </Link>

              {user?.role === "admin" && (
                <Link className="block nav-link" to="/admin/subscriptions">
                  Admin
                </Link>
              )}

              <button onClick={handleToggleTheme} className="block">
                Toggle Theme
              </button>

              <div className="py-2">{user?.name}</div>

              <button
                onClick={handleLogout}
                className="text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="block" to="/login">
                Login
              </Link>
              <Link className="block" to="/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
