
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        {/* Success Header */}
        <div className="relative overflow-hidden bg-emerald-600 px-6 py-12 text-center sm:px-10 sm:py-14">
          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/15 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-12 w-12 text-white"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 12 4 4L19 6"
              />
            </svg>
          </div>

          <p className="relative mt-6 text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
            DollarJug
          </p>

          <h1 className="relative mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Order Successful!
          </h1>

          <p className="relative mx-auto mt-3 max-w-md text-base leading-7 text-emerald-50 sm:text-lg">
            Thank you for shopping with us. Your order has been placed
            successfully.
          </p>
        </div>

        {/* Success Details */}
        <div className="px-6 py-9 text-center sm:px-10 sm:py-10">
          <div className="mx-auto flex max-w-md items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"
                />
                <circle cx="7.5" cy="18" r="1.5" />
                <circle cx="17.5" cy="18" r="1.5" />
              </svg>
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                What's next?
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We're getting your order ready. You can continue exploring
                DollarJug while we prepare your purchase.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="btn min-h-12 rounded-xl border-0 bg-emerald-600 px-7 text-base font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              Continue Shopping
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/"
              className="btn min-h-12 rounded-xl border border-gray-300 bg-white px-7 text-base font-semibold text-gray-700 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-7 text-xs leading-5 text-gray-400">
            Thank you for choosing DollarJug. We appreciate your order!
          </p>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
