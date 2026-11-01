
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/axiosInstance';

const EditProduct = () => {
  const { id } = useParams();
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
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  // Fetch Existing Product
  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setFetching(true);
        setError('');

        const res = await api.get(`/api/products/${id}`, {
          signal: controller.signal,
        });

        const data = res.data;

        setFormData({
          name: data.name ?? '',
          description: data.description ?? '',
          price: data.price ?? '',
          category: data.category ?? '',
          stock: data.stock ?? '',
        });

        // Existing Image Preview
        if (typeof data.image === 'string' && data.image) {
          setImagePreview(data.image);
        } else if (typeof data.imageUrl === 'string' && data.imageUrl) {
          setImagePreview(data.imageUrl);
        }

      } catch (err) {
        if (controller.signal.aborted) return;

        console.error('Error fetching product:', err);

        setError(
          err.response?.data?.message ||
          err.message ||
          'Failed to load product details.'
        );

      } finally {
        if (!controller.signal.aborted) {
          setFetching(false);
        }
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError('Product ID is missing.');
      setFetching(false);
    }

    return () => controller.abort();

  }, [id]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!user?.token) {
      setError('Please log in before updating a product.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = new FormData();

      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('stock', formData.stock);

      // Append image only when a new image is selected
      if (image) {
        data.append('image', image);
      }

      const res = await api.put(
        `/api/products/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log('Product updated:', res.data);

      alert('Product updated successfully!');
      navigate('/admin/products');

    } catch (err) {
      console.error('Error updating product:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.'
      );

    } finally {
      setLoading(false);
    }
  };

  // Common Input Styling
  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-gray-100';

  // Loading State
  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-3 h-4 w-32 rounded bg-gray-200" />
          <div className="mb-8 h-8 w-56 rounded bg-gray-200" />

          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <div className="mb-2 h-4 w-28 rounded bg-gray-200" />
                <div className="h-12 rounded-xl bg-gray-100" />
              </div>
            ))}

            <div className="h-12 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Page Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Products
          </button>

          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            DollarJug Admin
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Edit Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update your product information, pricing and inventory.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-5 py-4 sm:px-8">
            <h2 className="font-semibold text-gray-900">
              Product Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the fields below and save your changes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Product Name */}
            <div>
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
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe your product..."
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
                required
                disabled={loading}
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Price (PKR) <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                    Rs.
                  </span>

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className={`${inputClass} pl-12`}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
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
                  min="0"
                  step="1"
                  placeholder="Available units"
                  value={formData.stock}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  disabled={loading}
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
                placeholder="e.g. Electronics, Fashion"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Image

                <span className="ml-2 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 p-4 sm:p-5">

                {imagePreview && (
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="h-32 w-32 rounded-xl border border-gray-200 bg-white object-contain p-2"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {image
                          ? 'New image selected'
                          : 'Current product image'}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Select another image below to replace it.
                      </p>
                    </div>
                  </div>
                )}

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                  className="block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-emerald-700 disabled:cursor-not-allowed"
                />

                <p className="mt-3 text-xs text-gray-500">
                  Leave unchanged if you don't want to replace the current image.
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                disabled={loading}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                    />
                  </svg>
                )}

                {loading ? 'Updating Product...' : 'Save Changes'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
