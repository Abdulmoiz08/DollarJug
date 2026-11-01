
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../config/axiosInstance';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Users
  useEffect(() => {
    if (!user?.token) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get('/api/auth/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          signal: controller.signal,
        });

        const data = res.data;

        if (!Array.isArray(data)) {
          throw new Error('Invalid user data received from the server.');
        }

        setUsers(data);

      } catch (err) {
        if (controller.signal.aborted) return;

        console.error('Error fetching users:', err);

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

    fetchUsers();

    return () => controller.abort();

  }, [user?.token]);

  // Format Date
  const formatDate = (date) => {
    if (!date) return '—';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return '—';

    return parsedDate.toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              DollarJug Admin
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              User Directory
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              View and manage registered users on your platform.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75M14 7a4 4 0 0 1 0 8M10 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Total Users
              </p>

              <p className="text-xl font-bold text-gray-900">
                {loading ? '...' : users.length}
              </p>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex flex-col gap-1 border-b border-gray-200 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-gray-900">
              Registered Accounts
            </h2>

            <p className="text-sm text-gray-500">
              User details, account roles and registration dates.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-190 text-left">

              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                    User ID
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Name
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email Address
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Role
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Joined
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {/* Loading Skeleton */}
                {loading &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      {Array.from({ length: 5 }).map((__, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-5 py-5 sm:px-6"
                        >
                          <div className="h-4 animate-pulse rounded-md bg-gray-100" />
                        </td>
                      ))}
                    </tr>
                  ))}

                {/* User Rows */}
                {!loading &&
                  !error &&
                  users.map((u) => (
                    <tr
                      key={u._id}
                      className="transition-colors hover:bg-emerald-50/40"
                    >
                      {/* User ID */}
                      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                        <span
                          title={u._id}
                          className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600"
                        >
                          {u._id?.substring(0, 8) || '—'}...
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                            {u.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>

                          <span className="font-medium text-gray-900">
                            {u.name || 'Unnamed User'}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {u.email || '—'}
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            u.role === 'admin'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              u.role === 'admin'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />

                          {u.role?.toUpperCase() || 'UNKNOWN'}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                        {formatDate(u.createdAt)}
                      </td>
                    </tr>
                  ))}

                {/* Empty State */}
                {!loading && !error && users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-7 w-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.13a9 9 0 0 1 5.5 2.87M15 19.13a9 9 0 0 0-6 0m6 0a5 5 0 1 0-6 0m6 0v.87m-6-.87a9 9 0 0 0-5.5 2.87M9 19.13v.87"
                          />
                        </svg>
                      </div>

                      <h3 className="mt-4 font-semibold text-gray-900">
                        No users found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Registered users will appear here.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {!loading && !error && users.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 sm:px-6">
              <p className="text-sm text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-900">
                  {users.length}
                </span>{' '}
                registered {users.length === 1 ? 'user' : 'users'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
