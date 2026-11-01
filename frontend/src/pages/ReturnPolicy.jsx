import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  const policies = [
    {
      title: "1. Eligibility for Returns",
      content:
        "To request a return, please ensure the product meets the return conditions specified by DollarJug. Items should generally be unused, in their original condition, and accompanied by proof of purchase. Eligibility may vary depending on the product category.",
    },
    {
      title: "2. Refund Processing",
      content:
        "Once your returned item is received and inspected, we will notify you about the refund decision. Approved refunds will be processed through the original payment method where supported. Processing times may vary depending on your payment provider.",
    },
    {
      title: "3. Non-Returnable Items",
      content:
        "Some products may not be eligible for return, including personalized items, certain digital products, or items damaged through misuse. Any exclusions will be communicated according to the applicable product and return terms.",
    },
    {
      title: "4. Return Shipping Costs",
      content:
        "Return shipping costs and any applicable charges will depend on the reason for the return and DollarJug's applicable return terms. Please contact our support team before shipping an item back so we can guide you through the process.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-linear-to-r from-emerald-700 to-emerald-500 p-8 text-white shadow-lg sm:p-10">
          <span className="mb-4 inline-block rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-bold text-emerald-950">
            DOLLARJUG CUSTOMER POLICY
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Return & Refund Policy
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50 sm:text-base">
            Your satisfaction matters to us. Please review our return and
            refund guidelines before requesting a return.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            Our Return Policy
          </h2>

          <p className="leading-7 text-gray-600">
            At DollarJug, we want you to shop with confidence. If there is a
            problem with your order, contact our support team to discuss the
            available options. Return eligibility, deadlines, and refund
            conditions depend on the product and the terms applicable to your
            purchase.
          </p>
        </section>

        {/* Policy Sections */}
        <div className="space-y-5">
          {policies.map((policy) => (
            <section
              key={policy.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <h2 className="mb-3 flex items-center gap-3 text-lg font-bold text-emerald-800 sm:text-xl">
                <span className="h-6 w-1.5 rounded-full bg-yellow-400" />
                {policy.title}
              </h2>

              <p className="leading-7 text-gray-600">{policy.content}</p>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <section className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-emerald-900">
            Need Help With a Return?
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            Contact our team before returning an item. We’ll help you
            understand the next steps.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Contact Support
          </Link>
        </section>

        <p className="mt-8 text-center text-sm leading-6 text-gray-500">
          Please confirm that this policy reflects your actual business
          practices before publishing it. Return deadlines, refund timelines,
          shipping charges, and exclusions should match your store's terms and
          applicable consumer-protection requirements.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;