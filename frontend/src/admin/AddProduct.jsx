import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/axiosInstance';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (!image) {
      setImagePreview('');
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!image) {
    alert('Please select an image');
    return;
  }

  if (loading) return;

  setLoading(true);

  const data = new FormData();
  data.append('name', formData.name);
  data.append('description', formData.description);
  data.append('price', formData.price);
  data.append('category', formData.category);
  data.append('stock', formData.stock);
  data.append('image', image);

  try {
    const res = await api.post('/api/products', data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    alert('Product created successfully!');
    navigate('/shop');

  } catch (error) {
    console.error('Error creating product:', error);

    alert(
      error.response?.data?.message ||
      'Unable to create product. Please try again.'
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            DollarJug Admin
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Add New Product
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Add your product details, set the price and stock, and upload a
            product image to publish it on DollarJug.
          </p>
        </div>

        {/* Product Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Product Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fields marked with * are required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 p-5 sm:p-8 md:grid-cols-2">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Product Name <span className="text-red-500">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Wireless Headphones"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={150}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the product, its features, and what makes it useful..."
                rows={5}
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Write a clear and helpful description for customers.
              </p>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Price (PKR) <span className="text-red-500">*</span>
              </label>

              <div className="flex overflow-hidden rounded-xl border border-gray-300 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
                <span className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-500">
                  Rs.
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Category <span className="text-red-500">*</span>
              </label>

              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g. Electronics"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {/* Stock */}
            <div className="md:col-span-2">
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                placeholder="Enter available quantity"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Enter the number of units currently available.
              </p>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Image <span className="text-red-500">*</span>
              </label>

              <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 p-4 transition hover:border-emerald-400 sm:p-6">
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <img
                      src={imagePreview}
                      alt="Selected product preview"
                      className="h-36 w-36 rounded-xl border border-gray-200 bg-white object-contain p-2"
                    />

                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <p className="break-all text-sm font-semibold text-gray-800">
                        {image.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {(image.size / (1024 * 1024)).toFixed(2)} MB
                      </p>

                      <label
                        htmlFor="image"
                        className="mt-3 inline-flex cursor-pointer items-center rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Change Image
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-5 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.7}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 8.25L12 3.75m0 0L7.5 8.25M12 3.75v12"
                        />
                      </svg>
                    </div>

                    <p className="text-sm font-semibold text-gray-800">
                      Upload your product image
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Choose an image from your device.
                    </p>

                    <label
                      htmlFor="image"
                      className="mt-4 inline-flex cursor-pointer items-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                      Choose Image
                    </label>
                  </div>
                )}

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required={!image}
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="sr-only"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Select an image file. Your existing backend upload process will
                handle the file.
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Uploading & Creating...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Publish Product
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-xs leading-5 text-gray-400">
          DollarJug Admin Panel · Please review product details before
          publishing.
        </p>
      </div>
    </main>
  );
};

export default AddProduct;