
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../config/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);

  try {
    const res = await api.post('/api/auth/login', {
      email,
      password,
    });

    login(res.data);
    navigate('/');

  } catch (error) {
    console.error('Login error:', error);

    alert(
      error.response?.data?.message ||
      'Login failed. Please check your credentials.'
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:grid-cols-2">

        {/* Left: DollarJug Branding */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-emerald-700 p-10 text-white lg:flex xl:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-600/60" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border-40 border-emerald-600/50" />

          <Link
            to="/"
            className="relative z-10 inline-flex w-fit items-center gap-2 text-2xl font-extrabold tracking-tight"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-xl font-black text-emerald-900">
              $
            </span>
            Dollar<span className="text-yellow-300">Jug</span>
          </Link>

          <div className="relative z-10 my-12">
            <span className="mb-5 inline-flex rounded-full border border-emerald-400/50 bg-emerald-800/50 px-4 py-2 text-sm font-medium text-emerald-100">
              Welcome back to DollarJug
            </span>

            <h1 className="text-4xl font-extrabold leading-tight xl:text-5xl">
              Good to see
              <br />
              you again.
              <br />
              <span className="text-yellow-300">Let's shop!</span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-emerald-100">
              Sign in to access your account and continue exploring products
              on DollarJug.
            </p>
          </div>

          <p className="relative z-10 text-sm text-emerald-200">
            Your next great find is waiting for you.
          </p>
        </section>

        {/* Right: Login Form */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-emerald-700 lg:hidden"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400 text-lg text-emerald-900">
                $
              </span>
              DollarJug
            </Link>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
                Welcome back
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your account details to continue shopping.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>

                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 transition placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 transition placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn min-h-12 w-full rounded-xl border-0 bg-emerald-600 text-base font-bold text-white shadow-md shadow-emerald-600/20 transition duration-200 hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to your account
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                New to DollarJug?
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-emerald-700 underline-offset-4 transition hover:text-emerald-800 hover:underline"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-gray-400">
              Sign in to manage your account and continue your shopping
              journey with DollarJug.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
