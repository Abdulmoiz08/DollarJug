
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition hover:text-emerald-700">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-800">Shopping Cart</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Review your items before proceeding to checkout.
              </p>
            </div>

            {cartItems.length > 0 && (
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l2.4 11.2a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6M10 21h.01M18 21h.01"
                />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              Looks like you haven't added anything yet. Explore DollarJug
              and find something you love.
            </p>

            <Link
              to="/shop"
              className="btn mt-7 min-h-12 rounded-xl border-0 bg-emerald-600 px-7 text-white shadow-md transition hover:bg-emerald-700"
            >
              Continue Shopping
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">

            {/* Cart Items */}
            <section className="space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Cart Items
                </h2>

                <Link
                  to="/shop"
                  className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline"
                >
                  + Add more items
                </Link>
              </div>

              {cartItems.map((item) => (
                <article
                  key={item.productId}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-6">

                    {/* Product Image */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-32">
                      <img
                        src={`http://localhost:5000/${item.imageUrl}`}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="min-w-0">
                        <h3 className="wrap-break-word text-base font-bold text-gray-900 sm:text-lg">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                          Price per item
                        </p>

                        <p className="mt-1 text-lg font-bold text-emerald-700">
                          ₹{Number(item.price).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                        {/* Quantity Controls */}
                        <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white p-1">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item, item.qty - 1)}
                            disabled={item.qty <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-semibold text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            −
                          </button>

                          <span
                            className="min-w-10 text-center text-sm font-bold text-gray-900"
                            aria-live="polite"
                          >
                            {item.qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item, item.qty + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-semibold text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemove(item.productId)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.9 12.1A2 2 0 0116.1 21H7.9a2 2 0 01-2-1.9L5 7m4 4v6m6-6v6M4 7h16M9 7V4h6v3"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-sm text-gray-500">
                      Item subtotal
                    </span>
                    <span className="font-bold text-gray-900">
                      ₹{(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </article>
              ))}

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                <span aria-hidden="true">←</span>
                Continue shopping
              </Link>
            </section>

            {/* Order Summary */}
            <aside className="lg:sticky lg:top-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-xl font-extrabold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">Total items</span>
                    <span className="font-semibold text-gray-900">
                      {totalItems}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-gray-500">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-gray-900">
                        Estimated total
                      </span>
                      <span className="text-xl font-extrabold text-emerald-700">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Final shipping charges and any applicable taxes will
                      depend on your checkout details.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="btn mt-6 min-h-13 w-full rounded-xl border-0 bg-emerald-600 text-base font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-lg"
                >
                  Proceed to Checkout
                  <span aria-hidden="true">→</span>
                </button>

                <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
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

                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      Shopping with confidence
                    </p>
                    <p className="mt-1 text-xs leading-5 text-emerald-800">
                      Review your order details before completing your
                      purchase.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
