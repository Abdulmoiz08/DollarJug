
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../config/axiosInstance';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    
const fetchProducts = async () => {
  setLoading(true);
  setError('');

  try {
    const res = await api.get('/api/products', {
      signal: controller.signal,
    });

    const data = res.data;

    if (!Array.isArray(data)) {
      throw new Error('Invalid product data received from the server.');
    }

    setProducts(data);

  } catch (err) {
    if (controller.signal.aborted) return;

    console.error('Fetch products error:', err);

    setError(
      err.response?.data?.message ||
      err.message ||
      'Something went wrong.'
    );

  } finally {
    if (!controller.signal.aborted) {
      setLoading(false);
    }
  }
};

    fetchProducts();

    return () => controller.abort();
  }, []);

  const filteredProducts = products.filter((product) =>
    (product.name || '').toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Shop Hero */}
      <section className="relative overflow-hidden bg-emerald-700">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-emerald-600/60" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-emerald-400/50 bg-emerald-800/40 px-4 py-2 text-sm font-semibold text-emerald-100">
              Welcome to DollarJug
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find Your Next
              <span className="block text-yellow-300">Great Purchase.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-emerald-50 sm:text-lg">
              Explore our collection, discover products you love, and find
              something perfect for you.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Explore our collection
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              All Products
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              Search our collection to find exactly what you're looking for.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full lg:max-w-md">
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Search products
            </label>

            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16 16 4 4"
                />
              </svg>

              <input
                id="product-search"
                type="search"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered h-12 w-full rounded-xl border-gray-200 bg-white pl-12 pr-12 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:outline-2 focus:outline-emerald-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m18 6-12 12M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && !error && products.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-bold text-gray-900">
                {filteredProducts.length}
              </span>{' '}
              of{' '}
              <span className="font-bold text-gray-900">
                {products.length}
              </span>{' '}
              products
            </p>

            {search.trim() && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Search: "{search.trim()}"
              </span>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="skeleton h-52 w-full rounded-xl bg-gray-200" />
                <div className="skeleton mt-5 h-5 w-3/4 bg-gray-200" />
                <div className="skeleton mt-3 h-4 w-1/2 bg-gray-200" />
                <div className="skeleton mt-5 h-11 w-full rounded-xl bg-gray-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="rounded-3xl border border-red-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-gray-900">
              Couldn't load products
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn mt-6 rounded-xl border-0 bg-emerald-600 px-6 text-white hover:bg-emerald-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16 16 4 4"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-gray-900">
              {search.trim() ? 'No matching products' : 'No products available'}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {search.trim()
                ? `We couldn't find any products matching "${search.trim()}". Try another search.`
                : 'There are no products to display right now. Please check back later.'}
            </p>

            {search.trim() && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="btn mt-6 rounded-xl border-0 bg-emerald-600 px-6 text-white hover:bg-emerald-700"
              >
                Clear Search
              </button>
            )}

            {!search.trim() && (
              <Link
                to="/"
                className="btn mt-6 rounded-xl border-0 bg-emerald-600 px-6 text-white hover:bg-emerald-700"
              >
                Back to Home
              </Link>
            )}
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Shop;
