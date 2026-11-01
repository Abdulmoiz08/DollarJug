
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../config/axiosInstance';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingOrders, setUpdatingOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    if (!user?.token) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get('/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          signal: controller.signal,
        });

        const data = res.data;

        setOrders(Array.isArray(data) ? data : []);

      } catch (err) {
        if (controller.signal.aborted) return;

        console.error('Error fetching orders:', err);

        if (err.response?.status === 401) {
          setError('Session expired. Please login again.');
          return;
        }

        setError(
          err.response?.data?.message ||
          err.message ||
          'Failed to load orders.'
        );

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => controller.abort();

  }, [user]);

  // Update order status
  const updateStatus = async (id, status) => {
    if (updatingOrders.includes(id)) return;

    const previousOrder = orders.find(
      (order) => order._id === id
    );

    if (!previousOrder || previousOrder.status === status) return;

    setUpdatingOrders((prev) => [...prev, id]);
    setError('');

    try {
      await api.put(
        `/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );

    } catch (err) {
      console.error('Error updating order:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Unable to update order status.'
      );

      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      }

    } finally {
      setUpdatingOrders((prev) =>
        prev.filter((orderId) => orderId !== id)
      );
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `Rs. ${Number(amount ?? 0).toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Format date
  const formatDate = (date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return '—';

    return parsedDate.toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';

      case 'Shipped':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';

      case 'Pending':
        return 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';

      default:
        return 'bg-gray-100 text-gray-700 ring-gray-500/20';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            DollarJug Administration
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Manage Orders
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                Review customer orders and keep their delivery status up to date.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:self-auto">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    d="M3 7h13v12H3zM16 11h3l3 3v5h-6M7 19a2 2 0 104 0m6 0a2 2 0 104 0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <div>
                <p className="text-xs text-gray-500">Total Orders</p>
                <p className="text-lg font-bold text-gray-900">
                  {loading ? '—' : orders.length}
                </p>
              </div>
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

        {/* Orders Table */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-bold text-gray-900">
              All Orders
            </h2>

            <p className="text-sm text-gray-500">
              Manage each order using its status selector.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="space-y-4 p-5 sm:p-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-4 py-3"
                >
                  <div className="h-10 w-20 rounded-lg bg-gray-200" />
                  <div className="h-4 flex-1 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-9 w-28 rounded-lg bg-gray-100" />
                </div>
              ))}
            </div>

          ) : error && orders.length === 0 ? (
            /* Error State */
            <div className="px-5 py-16 text-center sm:px-6">
              <h3 className="text-lg font-bold text-gray-900">
                Couldn't load orders
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn mt-5 rounded-xl border-0 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Try Again
              </button>
            </div>

          ) : orders.length === 0 ? (
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
                    d="M3 7h18v14H3zM3 7l3-4h12l3 4M9 11h6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                No orders found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Customer orders will appear here when they are available.
              </p>
            </div>

          ) : (
            /* Orders List */
            <div className="overflow-x-auto">
              <table className="w-full min-w-190 text-left">

                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-6">
                      Order ID
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Total
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Order Date
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="transition hover:bg-emerald-50/30"
                    >

                      {/* Order ID */}
                      <td className="whitespace-nowrap px-5 py-5 sm:px-6">
                        <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 font-mono text-xs font-semibold text-gray-700">
                          #{String(order._id).substring(0, 8)}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                            {(order.userId?.name || 'D')
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {order.userId?.name || 'Deleted User'}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              Customer
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <span className="font-bold text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </span>
                      </td>

                      {/* Order Date */}
                      <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <div className="flex flex-col items-start gap-2">

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {order.status || 'Unknown'}
                          </span>

                          <select
                            aria-label={`Update status for order ${String(
                              order._id
                            ).substring(0, 8)}`}
                            value={order.status || 'Pending'}
                            disabled={updatingOrders.includes(order._id)}
                            onChange={(e) =>
                              updateStatus(order._id, e.target.value)
                            }
                            className="w-36 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:cursor-wait disabled:bg-gray-100 disabled:opacity-60"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>

                          {updatingOrders.includes(order._id) && (
                            <span className="text-xs text-emerald-700">
                              Updating status...
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

          {/* Table Footer */}
          {!loading && orders.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:px-6">
              <p className="text-xs text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-700">
                  {orders.length}
                </span>{' '}
                {orders.length === 1 ? 'order' : 'orders'}
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

export default AdminOrders;
