
import React from "react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Header */}
        <div className="bg-linear-to-r from-emerald-950 to-emerald-800 px-6 py-8 text-white sm:px-10">
          <span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950">
            Legal Information
          </span>

          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Website Disclaimer
          </h1>

          <p className="mt-3 leading-7 text-emerald-100">
            Important information about using DollarJug and shopping on our
            website.
          </p>
        </div>

        {/* Disclaimer Content */}
        <div className="space-y-8 px-6 py-8 text-sm leading-7 text-gray-600 sm:px-10 sm:py-10">

          <p>
            Welcome to <strong className="text-emerald-800">DollarJug</strong>.
            This disclaimer explains important information regarding our
            website, product listings, payment processing, and external links.
            Please review it before using our services.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-gray-900">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                01
              </span>
              Accuracy of Product Information
            </h2>

            <p>
              We aim to provide accurate product descriptions, images, prices,
              and availability information. However, errors or outdated
              information may occasionally occur. Product appearance may vary
              from its images, and availability may change.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-gray-900">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-800">
                02
              </span>
              Payments and Orders
            </h2>

            <p>
              Payment methods, order confirmation, cancellations, and refunds
              are subject to the options and policies actually provided by
              DollarJug. Please verify your order details and total amount
              before completing a purchase.
            </p>

            <p className="mt-3">
              If a payment gateway is operating in test mode, transactions
              are for testing purposes only. Do not represent test payments
              as completed real purchases.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-gray-900">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                03
              </span>
              External Links
            </h2>

            <p>
              Our website may contain links to third-party websites or
              services. These websites operate independently, and their
              content, availability, and privacy practices are governed by
              their respective providers.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-gray-900">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-800">
                04
              </span>
              Limitation of Information
            </h2>

            <p>
              Website information is provided for general informational
              purposes. We make reasonable efforts to maintain accurate
              information, but we cannot guarantee that every listing or
              website feature will always be error-free or uninterrupted.
            </p>
          </section>

          {/* Notice */}
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
            <h3 className="font-bold text-emerald-950">
              Please Note
            </h3>

            <p className="mt-2 text-gray-700">
              This page provides general information and is not a substitute
              for legal advice. Update it to reflect your actual business
              practices, payment arrangements, and applicable laws before
              launching DollarJug commercially.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500">
              DollarJug · Website Disclaimer
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-950"
            >
              Back to Home →
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Disclaimer;
