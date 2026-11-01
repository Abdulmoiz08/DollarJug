
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../config/axiosInstance';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Fetch Products
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

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

        console.error('Error fetching products:', err);

        setError(
          err.response?.data?.message ||
          err.message ||
          'Unable to load products. Please try again.'
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

  // Delete Product
  const handleDelete = async (id) => {
    if (!user?.token || deletingId) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this product? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError('');

      await api.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

    } catch (err) {
      console.error('Error deleting product:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Unable to delete product. Please try again.'
      );

    } finally {
      setDeletingId(null);
    }
  };

  // Format Price
  const formatPrice = (price) =>
    `Rs. ${Number(price ?? 0).toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            DollarJug Administration
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Manage Products
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Manage your product catalog, review prices, monitor stock, and
                keep your DollarJug store up to date.
              </p>
            </div>

            <Link
              to="/admin/add-product"
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 sm:self-auto"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 5v14m-7-7h14"
                  strokeLinecap="round"
                />
              </svg>
              Add Product
            </Link>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Total Products */}
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M12 3L3.5 7.5 12 12l8.5-4.5L12 3zM3.5 12L12 16.5l8.5-4.5M3.5 16.5L12 21l8.5-4.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Products
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {loading ? '—' : products.length}
              </p>
            </div>
          </div>

          {/* Total Stock */}
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-700">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M4 5h16v14H4zM8 9h8M8 13h5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Stock Units
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {loading
                  ? '—'
                  : products
                      .reduce(
                        (total, product) =>
                          total + (Number(product.stock) || 0),
                        0
                      )
                      .toLocaleString('en-PK')}
              </p>
            </div>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <svg
              className="mt-0.5 h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                d="M12 8v4m0 4h.01"
                strokeLinecap="round"
              />
            </svg>

            <p>{error}</p>
          </div>
        )}

        {/* Products Table */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-bold text-gray-900">
              Product Inventory
            </h2>

            <p className="text-sm text-gray-500">
              View product details and manage catalog actions.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="space-y-4 p-5 sm:p-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-4 py-3"
                >
                  <div className="h-10 w-20 rounded-lg bg-gray-200" />
                  <div className="h-4 flex-1 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-100" />
                  <div className="h-8 w-20 rounded-lg bg-gray-100" />
                </div>
              ))}
            </div>

          ) : error && products.length === 0 ? (
            /* Error State */
            <div className="px-5 py-16 text-center sm:px-6">
              <h3 className="text-lg font-bold text-gray-900">
                Couldn't load products
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
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

          ) : products.length === 0 ? (
            /* Empty State */
            <div className="px-5 py-16 text-center sm:px-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    d="M12 3L3.5 7.5 12 12l8.5-4.5L12 3zM3.5 12L12 16.5l8.5-4.5M3.5 16.5L12 21l8.5-4.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                No products found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Your product catalog is empty. Add your first product to get
                started.
              </p>

              <Link
                to="/admin/add-product"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <span>+</span>
                Add First Product
              </Link>
            </div>

          ) : (
            /* Products List */
            <div className="overflow-x-auto">
              <table className="w-full min-w-212.5 text-left">

                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-6">
                      Product ID
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Product Name
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Price
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Category
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Stock
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => {
                    const isDeleting = deletingId === product._id;
                    const stock = Number(product.stock) || 0;

                    return (
                      <tr
                        key={product._id}
                        className="transition hover:bg-emerald-50/30"
                      >

                        {/* Product ID */}
                        <td className="whitespace-nowrap px-5 py-5 sm:px-6">
                          <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 font-mono text-xs font-semibold text-gray-700">
                            #{String(product._id).substring(0, 8)}
                          </span>
                        </td>

                        {/* Product Name */}
                        <td className="max-w-xs px-5 py-5">
                          <p className="truncate font-semibold text-gray-900">
                            {product.name || 'Unnamed Product'}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            DollarJug Catalog
                          </p>
                        </td>

                        {/* Price */}
                        <td className="whitespace-nowrap px-5 py-5">
                          <span className="font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-5">
                          <span className="inline-flex max-w-40 truncate rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {product.category || 'Uncategorized'}
                          </span>
                        </td>

                        {/* Stock */}
                        <td className="whitespace-nowrap px-5 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              stock === 0
                                ? 'bg-red-50 text-red-700'
                                : stock <= 5
                                  ? 'bg-yellow-50 text-yellow-800'
                                  : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />

                            {stock === 0
                              ? 'Out of stock'
                              : stock <= 5
                                ? `${stock} left`
                                : stock.toLocaleString('en-PK')}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="whitespace-nowrap px-5 py-5">
                          <div className="flex items-center gap-2">

                            {/* Edit Button */}
                            <Link
                              to={`/admin/edit-product/${product._id}`}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                            >
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4 11.5-11.5z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>

                              Edit
                            </Link>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDelete(product._id)}
                              disabled={Boolean(deletingId)}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isDeleting ? (
                                <>
                                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                                  Deleting
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                  >
                                    <path
                                      d="M3 6h18M8 6V4h8v2m3 0l-1 14H6L5 6m4 4v6m6-6v6"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>

                                  Delete
                                </>
                              )}
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          )}

          {/* Table Footer */}
          {!loading && products.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:px-6">
              <p className="text-xs text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-700">
                  {products.length}
                </span>{' '}
                {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
          )}

        </section>

        {/* Footer */}
        <footer className="mt-8 border-t border-gray-200 py-5 text-center text-xs text-gray-400">
          DollarJug Admin Panel
        </footer>

      </div>
    </main>
  );
};

export default AdminProducts;
