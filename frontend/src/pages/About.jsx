
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-linear-to-br from-emerald-950 via-emerald-800 to-green-600 px-5 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-yellow-300">
            Welcome to DollarJug
          </span>

          <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
            About <span className="text-yellow-300">DollarJug</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg">
            Your destination for useful everyday products, exciting finds,
            and budget-friendly shopping. We believe great shopping should
            be simple, convenient, and affordable.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-7 py-3.5 font-bold text-emerald-950 transition hover:-translate-y-1 hover:bg-yellow-300"
          >
            Explore Our Shop →
          </Link>
        </div>
      </section>

      {/* About Content */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              Smart Shopping Starts Here
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              DollarJug is an online shopping platform designed to help
              customers discover practical products at budget-friendly prices.
              From everyday essentials to interesting accessories, our goal
              is to make finding useful products easier.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We aim to provide a convenient shopping experience with clear
              product information, a simple ordering process, and helpful
              customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="text-4xl">🛍️</span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Everyday Finds
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Discover products for your everyday needs.
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:mt-8">
              <span className="text-4xl">💰</span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Budget-Friendly
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Find options that fit your budget.
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="text-4xl">📦</span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Easy Ordering
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Browse products and place orders conveniently.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:mt-8">
              <span className="text-4xl">🤝</span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Customer First
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We aim to make your shopping experience better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-emerald-950 px-6 py-12 text-center text-white sm:px-12 sm:py-14">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Find Your Next Favorite?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-100/80">
            Explore our collection and discover something useful today.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-xl bg-yellow-400 px-7 py-3.5 font-bold text-emerald-950 transition hover:bg-yellow-300"
          >
            Start Shopping
          </Link>
        </div>
      </section>

    </main>
  );
};

export default About;
