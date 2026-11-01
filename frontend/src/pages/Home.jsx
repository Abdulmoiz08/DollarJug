
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import api from "../config/axiosInstance";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products/");

        const data = res.data;

        setProducts(
          Array.isArray(data) ? data.slice(0, 4) : []
        );
      } catch (error) {
        console.error("Products fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-950 via-emerald-800 to-green-600 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-24">

          {/* Hero Content */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-green-100">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Smart Shopping, Better Prices
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Amazing Finds.
              <span className="block text-yellow-300">
                Unbeatable Prices.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-green-50 sm:text-lg">
              Discover everyday essentials, useful accessories, and
              exciting products at prices you'll love. Shop smart with DollarJug!
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-7 py-3.5 font-bold text-emerald-950 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-300"
              >
                Shop Now
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Products
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-green-100">
              <span>✓ Everyday Essentials</span>
              <span>✓ Budget-Friendly Finds</span>
              <span>✓ Easy Shopping</span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl sm:h-80 sm:w-80" />

            <div className="relative w-full rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-100">
                    YOUR SMART SHOP
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">
                    Great Deals!
                  </h2>
                </div>

                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-3xl text-emerald-950">
                  $
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 text-center text-gray-900 transition hover:-translate-y-1">
                  <div className="text-5xl">🎧</div>
                  <p className="mt-3 font-bold">Accessories</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Everyday picks
                  </p>
                </div>

                <div className="rounded-2xl bg-yellow-300 p-5 text-center text-gray-900 transition hover:-translate-y-1">
                  <div className="text-5xl">🛍️</div>
                  <p className="mt-3 font-bold">Best Finds</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Shop your way
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-100 p-5 text-center text-gray-900 transition hover:-translate-y-1">
                  <div className="text-5xl">🏠</div>
                  <p className="mt-3 font-bold">Home Essentials</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Made for daily life
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-5 text-center text-gray-900 transition hover:-translate-y-1">
                  <div className="text-5xl">🎁</div>
                  <p className="mt-3 font-bold">Little Surprises</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Discover more
                  </p>
                </div>
              </div>

              <p className="mt-5 text-center text-sm text-green-50">
                Find something useful. Love what you pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
              Handpicked for you
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-3 text-gray-500">
              Discover useful products at prices you'll love.
            </p>
          </div>

          <Link
            to="/shop"
            className="font-semibold text-emerald-700 transition hover:text-emerald-900"
          >
            View All Products →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="h-56 bg-gray-200" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-10 rounded-lg bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
            <div className="text-4xl">🛍️</div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">
              No products available yet
            </h3>
            <p className="mt-2 text-gray-500">
              Check back soon for exciting new finds.
            </p>
            <Link
              to="/shop"
              className="mt-5 inline-flex rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Explore Shop
            </Link>
          </div>
        )}
      </section>

    </main>
  );
}

export default Home;
