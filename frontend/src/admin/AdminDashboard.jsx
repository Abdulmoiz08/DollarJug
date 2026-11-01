import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/axiosInstance'

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/', { replace: true });
      return;
    }

   
const fetchStats = async () => {
  try {
    setError('');

    const res = await api.get('/api/analytics/sales', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setStats(res.data);

  } catch (error) {
    console.error('Error fetching dashboard analytics:', error);

    // Handle unauthorized user
    if (error.response?.status === 401) {
      navigate('/login', { replace: true });
      return;
    }

    setError(
      error.response?.data?.message ||
      'Unable to connect to the server. Please try again.'
    );

    setStats({
      totalOrders: 0,
      totalProducts: 0,
      totalUsers: 0,
      totalRevenue: 0,
    });
  }
};


    fetchStats();
  }, [user, navigate]);

  const dashboardStats = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders ?? 0,
      description: 'Orders received',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.7a2 2 0 002-1.6L22 7H6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="21" r="1" strokeWidth="1.8" />
          <circle cx="18" cy="21" r="1" strokeWidth="1.8" />
        </svg>
      ),
      iconStyle: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts ?? 0,
      description: 'Products in catalog',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M12 3L3.5 7.5 12 12l8.5-4.5L12 3z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 12L12 16.5l8.5-4.5M3.5 16.5L12 21l8.5-4.5M12 12v9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconStyle: 'bg-yellow-50 text-yellow-700',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers ?? 0,
      description: 'Registered accounts',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8zM20 8v6m3-3h-6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconStyle: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Total Revenue',
      value: `Rs. ${Number(stats?.totalRevenue ?? 0).toLocaleString(
        'en-PK',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,
      description: 'Total recorded revenue',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M12 2v20m5-16H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconStyle: 'bg-orange-50 text-orange-700',
    },
  ];

  const adminActions = [
    {
      title: 'Add Product',
      description: 'Publish a new product to your store.',
      path: '/admin/add-product',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M12 5v14m-7-7h14"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      style: 'bg-emerald-600 text-white hover:bg-emerald-700',
      iconStyle: 'bg-white/15',
    },
    {
      title: 'Manage Products',
      description: 'Review and manage your product catalog.',
      path: '/admin/products',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M4 7h16M4 12h16M4 17h16M7 4v16"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
      style: 'border border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50/50',
      iconStyle: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Manage Orders',
      description: 'Review customer orders and their status.',
      path: '/admin/orders',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M3 7h13v12H3zM16 11h3l3 3v5h-6M7 19a2 2 0 104 0m6 0a2 2 0 104 0"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      style: 'border border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50/50',
      iconStyle: 'bg-yellow-50 text-yellow-700',
    },
    {
      title: 'Users Directory',
      description: 'View and manage registered users.',
      path: '/admin/users',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8zM20 8v6m3-3h-6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      style: 'border border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50/50',
      iconStyle: 'bg-blue-50 text-blue-700',
    },
  ];

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              DollarJug Administration
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              Welcome back,{' '}
              <span className="font-semibold text-gray-800">
                {user.name || 'Admin'}
              </span>
              . Here's an overview of your store.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 sm:self-auto"
          >
            View Store
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M7 17L17 7M7 7h10v10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section>

        {/* Analytics */}
        <section className="mb-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Store Overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Key metrics for your DollarJug store.
              </p>
            </div>

            {stats && (
              <span className="text-xs font-medium text-gray-400">
                Live data from your analytics endpoint
              </span>
            )}
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
            >
              <span className="font-bold">!</span>
              <p>{error}</p>
            </div>
          )}

          {stats ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((stat) => (
                <article
                  key={stat.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>

                      <p className="mt-3 wrap-break-word text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
                    >
                      <div className="h-6 w-6">{stat.icon}</div>
                    </div>
                  </div>

                  <p className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
                    {stat.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <div className="mb-5 h-4 w-28 rounded bg-gray-200" />
                  <div className="h-9 w-36 rounded bg-gray-200" />
                  <div className="mt-5 h-3 w-32 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Administrative Controls */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              Administrative Controls
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your products, orders, and customer accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {adminActions.map((action) => (
              <button
                key={action.path}
                type="button"
                onClick={() => navigate(action.path)}
                className={`group flex min-h-48 flex-col items-start rounded-2xl p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:p-6 ${action.style}`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${action.iconStyle}`}
                >
                  <div className="h-6 w-6">{action.icon}</div>
                </div>

                <span className="text-base font-bold">
                  {action.title}
                </span>

                <span className="mt-2 text-sm leading-6 opacity-75">
                  {action.description}
                </span>

                <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold">
                  Open section
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 12h14m-6-6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-gray-200 py-5 text-center text-xs text-gray-400">
          DollarJug Admin Panel
        </footer>
      </div>
    </main>
  );
};

export default AdminDashboard;