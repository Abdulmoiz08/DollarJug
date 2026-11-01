
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../config/axiosInstance';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 

const handlePayment = async () => {
  if (loading) return;

  setLoading(true);

  try {
    const response = await api.post(
      '/api/payments/order',
      {
        items: cartItems.map((item) => ({
          productId: item.productId,
          qty: item.qty,
        })),
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const checkoutUrl = response.data?.url;

    if (!checkoutUrl) {
      throw new Error('Stripe Checkout URL was not returned.');
    }

    // Redirect customer to Stripe Checkout
    window.location.assign(checkoutUrl);

  } catch (error) {
    console.error('Stripe checkout error:', error);

    alert(
      error.response?.data?.message ||
      error.message ||
      'Unable to initialize payment. Please try again.'
    );

    setLoading(false);
  }
};



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first.');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add products before checkout.');
      navigate('/shop');
      return;
    }

    handlePayment();
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 11.2a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Add some products to your DollarJug cart before proceeding to
            checkout.
          </p>

          <Link
            to="/shop"
            className="btn mt-7 min-h-12 rounded-xl border-0 bg-emerald-600 px-7 text-white hover:bg-emerald-700"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition hover:text-emerald-700">
              Home
            </Link>
            <span>/</span>
            <Link to="/cart" className="transition hover:text-emerald-700">
              Cart
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-800">Checkout</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11V7a3 3 0 00-6 0v4m-1 0h14v10H5V11zm7 4v2"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Checkout
              </h1>
              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Complete your shipping details and review your order.
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Layout */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {/* Shipping Form */}
          <section className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
                    />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Enter the address where you want your order delivered.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    value={address.fullName}
                    onChange={handleAddressChange}
                    disabled={loading}
                    className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                  />
                </div>

                {/* Street */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="street"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="House number, street, area"
                    autoComplete="street-address"
                    required
                    value={address.street}
                    onChange={handleAddressChange}
                    disabled={loading}
                    className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                    autoComplete="address-level2"
                    required
                    value={address.city}
                    onChange={handleAddressChange}
                    disabled={loading}
                    className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Postal Code <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    placeholder="Enter postal code"
                    autoComplete="postal-code"
                    required
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    disabled={loading}
                    className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                  />
                </div>

                {/* Country */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Enter your country"
                    autoComplete="country-name"
                    required
                    value={address.country}
                    onChange={handleAddressChange}
                    disabled={loading}
                    className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-yellow-50 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5 h-5 w-5 shrink-0 text-yellow-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 4h.01M10.3 3.9L1.8 18.5A1.7 1.7 0 003.3 21h17.4a1.7 1.7 0 001.5-2.5L13.7 3.9a2 2 0 00-3.4 0z"
                  />
                </svg>

                <p className="text-sm leading-6 text-yellow-900">
                  Please double-check your address before placing the order
                  to help avoid delivery issues.
                </p>
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-emerald-700 px-5 py-5 text-white sm:px-6">
                <h2 className="text-xl font-extrabold">Order Summary</h2>
                <p className="mt-1 text-sm text-emerald-100">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your
                  order
                </p>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                {/* Product List */}
                <div className="max-h-72 space-y-4 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 rounded-xl bg-gray-50">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full rounded-xl object-contain p-1"
                          loading="lazy"
                        />

                        <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-bold text-white">
                          {item.qty}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="wrap-break-word text-sm font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          ₹{Number(item.price).toFixed(2)} each
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-bold text-gray-900">
                        ₹{(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-right text-xs text-gray-500">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-gray-900">
                      Total to Pay
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-700">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Final charges may depend on the shipping and tax rules
                    configured for your order.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn min-h-13 w-full rounded-xl border-0 bg-emerald-600 text-base font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-emerald-400"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay Now
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11V7a3 3 0 00-6 0v4m-1 0h14v10H5V11zm7 4v2"
                    />
                  </svg>
                  <span>Review your details before payment</span>
                </div>

                <Link
                  to="/cart"
                  className="block text-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-900 hover:underline"
                >
                  Return to cart
                </Link>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
