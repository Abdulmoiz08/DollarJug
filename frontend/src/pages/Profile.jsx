import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/axiosInstance";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      navigate("/login");
      return;
    }

    const controller = new AbortController();

    const fetchMyOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          signal: controller.signal,
        });

        const data = res.data;

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Fetch orders error:", err);

        if (err.response?.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            err.message ||
            "Something went wrong while loading orders.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMyOrders();

    return () => controller.abort();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";

      case "shipped":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";

      case "cancelled":
        return "bg-red-50 text-red-700 ring-red-600/20";

      case "processing":
      case "pending":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";

      default:
        return "bg-gray-100 text-gray-700 ring-gray-500/20";
    }
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "Date unavailable"
      : parsedDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const formatAmount = (amount) => {
    const value = Number(amount);

    return Number.isFinite(value) ? value.toFixed(2) : "0.00";
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            DollarJug Account
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Manage your account and keep track of your orders.
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* Green Banner */}
          <div className="relative h-28 overflow-hidden bg-emerald-600 sm:h-36">
            <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-emerald-500/60" />

            <div className="absolute left-6 top-6 flex items-center gap-2 sm:left-10 sm:top-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-lg font-black text-emerald-900">
                $
              </span>
              <span className="text-xl font-extrabold tracking-tight text-white">
                DollarJug
              </span>
            </div>
          </div>

          <div className="px-5 pb-6 mt-15 sm:px-10 sm:pb-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="-mt-9 flex items-end gap-4 sm:-mt-11">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-emerald-50 text-3xl font-extrabold text-emerald-700 shadow-sm sm:h-24 sm:w-24">
                  {user.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0 pb-1">
                  <h2 className="wrap-break-word text-xl font-extrabold text-gray-900 sm:text-2xl">
                    {user.name || "User"}
                  </h2>

                  <p className="mt-1 break-all text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="btn min-h-11 w-full rounded-xl border border-red-200 bg-white px-5 font-semibold text-red-600 shadow-none transition hover:border-red-300 hover:bg-red-50 sm:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5m5 5H3"
                  />
                </svg>
                Logout
              </button>
            </div>

            {/* Account Information */}
            <div className="mt-8 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Full Name
                </p>
                <p className="mt-2 wrap-break-word font-semibold text-gray-900">
                  {user.name || "Not provided"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Email Address
                </p>
                <p className="mt-2 break-all font-semibold text-gray-900">
                  {user.email || "Not provided"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Account Type
                </p>

                <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold capitalize text-emerald-800">
                  {user.role || "Customer"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Order History Heading */}
        <section className="mt-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Order History
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View your previous purchases and their status.
              </p>
            </div>

            {!loading && !error && orders.length > 0 && (
              <span className="inline-flex w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"}
              </span>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
              <span className="loading loading-spinner loading-lg text-emerald-600" />
              <p className="mt-4 font-medium text-gray-700">
                Fetching your orders...
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Please wait a moment.
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="rounded-3xl border border-red-100 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
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

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Couldn't load your orders
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn mt-5 rounded-xl border-0 bg-emerald-600 px-6 text-white hover:bg-emerald-700"
              >
                Try Again
              </button>
            </div>
          ) : orders.length === 0 ? (
            /* Empty State */
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:py-16">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-10 w-10"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"
                  />
                  <circle cx="10" cy="21" r="1" />
                  <circle cx="18" cy="21" r="1" />
                </svg>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-gray-900">
                No orders yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                You haven't placed any orders yet. Explore our products and find
                something you love.
              </p>

              <Link
                to="/shop"
                className="btn mt-6 rounded-xl border-0 bg-emerald-600 px-6 font-bold text-white hover:bg-emerald-700"
              >
                Start Shopping
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : (
            /* Order Cards */
            <div className="space-y-4">
              {orders.map((order) => (
                <article
                  key={order._id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:border-emerald-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Order ID
                      </p>

                      <p className="mt-1 break-all font-semibold text-gray-900">
                        {order._id}
                      </p>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Order Date
                          </p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Total Amount
                          </p>
                          <p className="mt-1 text-lg font-extrabold text-emerald-700">
                            ₹{formatAmount(order.totalAmount)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Order Status
                      </p>

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold capitalize ring-1 ring-inset ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {order.status || "Unknown"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-800"
          >
            <span aria-hidden="true">←</span>
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Profile;
