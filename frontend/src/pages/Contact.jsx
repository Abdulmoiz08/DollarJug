
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError('Please fill in all fields.');
      return;
    }

    // Frontend only: connect this form to a backend endpoint
    // before displaying a message as successfully sent.
    setError('Contact form is not connected yet. Please try again later.');
  };

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-emerald-700 px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-yellow-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-emerald-50">
            We're Here to Help
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Contact <span className="text-yellow-300">DollarJug</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-50 sm:text-base">
            Have a question about an order, a product, or your account?
            Send us a message and let us know how we can help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Contact Information */}
          <div className="space-y-6 lg:col-span-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Get in Touch
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                We'd love to hear from you
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Need assistance? Use the contact form to describe your
                question or concern.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Email Support
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Use the contact form to send us your inquiry.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-700">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Order Assistance
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Include your order details in your message if you need
                    help with a purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <h3 className="font-semibold text-emerald-900">
                Before you contact us
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                Please describe your issue clearly. Avoid sharing passwords,
                payment card details, or other sensitive information.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Send Us a Message
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Fields marked with * are required.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-5 sm:p-8"
              >
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                {success && (
                  <div
                    role="status"
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                  >
                    {success}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Full Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={100}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Email Address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={254}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Subject *
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What can we help you with?"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    maxLength={150}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Your Message *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                    required
                    maxLength={3000}
                    disabled={loading}
                  />

                  <p className="mt-2 text-right text-xs text-gray-400">
                    {formData.message.length}/3000 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? 'Sending Message...' : 'Send Message'}

                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-7-7l7 7-7 7"
                    />
                  </svg>
                </button>

                <p className="text-xs leading-5 text-gray-400">
                  Please do not include passwords or payment card information
                  in your message.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
