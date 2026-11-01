
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../config/axiosInstance';

const Register = () => {
  const [name, setName] = useState('');
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
    const res = await api.post('/api/auth/register', {
      name,
      email,
      password,
    });

    alert(
      'Registration Successful! Please check your email for the Welcome OTP.'
    );

    login(res.data);
    navigate('/');

  } catch (error) {
    console.error('Registration error:', error);

    alert(
      error.response?.data?.message ||
      'Unable to connect to the server. Please try again.'
    );

  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:grid-cols-2">

        {/* Left: Brand section */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-emerald-700 p-10 text-white lg:flex xl:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-600/60" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border-40 border-emerald-600/50" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-xl font-black text-emerald-900">
                $
              </span>
              Dollar<span className="text-yellow-300">Jug</span>
            </Link>
          </div>

          <div className="relative z-10 my-12">
            <span className="mb-5 inline-flex rounded-full border border-emerald-400/50 bg-emerald-800/50 px-4 py-2 text-sm font-medium text-emerald-100">
              Your shopping journey starts here
            </span>

            <h1 className="text-4xl font-extrabold leading-tight xl:text-5xl">
              Discover more.
              <br />
              Shop smarter.
              <br />
              <span className="text-yellow-300">Spend wisely.</span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-emerald-100">
              Create your DollarJug account and get ready to explore products
              that fit your needs and budget.
            </p>
          </div>

          <p className="relative z-10 text-sm text-emerald-200">
            Your next great find is just around the corner.
          </p>
        </div>

        {/* Right: Registration form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">

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
                Get started today
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Create account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Join DollarJug and start exploring our collection.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full name
                </label>

                <input
                  id="register-name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>

                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="input input-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:outline-2 focus:outline-emerald-100 disabled:opacity-60"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Choose a strong password to help protect your account.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn h-12 min-h-12 w-full rounded-xl border-0 bg-emerald-600 text-base font-bold text-white shadow-md shadow-emerald-600/20 transition duration-200 hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Already registered?
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-emerald-700 underline-offset-4 transition hover:text-emerald-800 hover:underline"
              >
                Log in
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-gray-400">
              By creating an account, you agree to use DollarJug in accordance
              with its applicable terms and policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
