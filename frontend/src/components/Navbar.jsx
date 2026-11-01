
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-2xl font-black text-emerald-950">
            $
          </span>

          <span className="text-xl font-extrabold tracking-tight text-emerald-950 sm:text-2xl">
            Dollar<span className="text-emerald-600">Jug</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-3">

          <Link
            to="/shop"
            className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 sm:px-3"
          >
            Shop
          </Link>

          <Link
            to="/cart"
            className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 sm:px-3"
          >
            <span className="hidden sm:inline">Cart </span>
            <span className="sm:hidden">Cart </span>
            <span className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-emerald-950">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 sm:block"
              >
                Hi, {user.name}
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="rounded-lg px-2 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:px-3"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="rounded-lg border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-800 hover:text-white sm:px-4"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-900"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
