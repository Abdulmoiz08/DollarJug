import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import api from "../config/axiosInstance";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const res = await api.get(`/api/products/${id}`, {
          signal: controller.signal,
        });

        setProduct(res.data);
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Product fetch error:", error);

        if (error.response?.status === 404) {
          setError("This product could not be found.");
        } else {
          setError(
            error.response?.data?.message ||
              "Unable to load this product. Please try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0 || addingToCart) return;

    setAddingToCart(true);

    try {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          qty: 1,
        }),
      );

      alert("Successfully added to your cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Unable to add this product to your cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-emerald-600" />
          <p className="mt-4 font-medium text-gray-600">
            Loading product details...
          </p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8"
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

          <h1 className="mt-5 text-2xl font-extrabold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error || "This product is currently unavailable."}
          </p>

          <Link
            to="/shop"
            className="btn mt-6 rounded-xl border-0 bg-emerald-600 px-6 text-white hover:bg-emerald-700"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  const inStock = product.stock > 0;
  const price = Number(product.price);
  const validPrice = Number.isFinite(price) && price >= 0;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link to="/" className="transition hover:text-emerald-700">
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link to="/shop" className="transition hover:text-emerald-700">
            Shop
          </Link>

          <span aria-hidden="true">/</span>

          {product.category && (
            <>
              <span className="capitalize">{product.category}</span>
              <span aria-hidden="true">/</span>
            </>
          )}

          <span className="max-w-50 truncate font-medium text-gray-900">
            {product.name}
          </span>
        </nav>

        {/* Product Details */}
        <section className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex min-h-80 items-center justify-center bg-gray-100 p-6 sm:min-h-120 sm:p-10 lg:min-h-150">
            {product.imageUrl ? (
              <img
                src={`http://localhost:5000/${product.imageUrl}`}
                alt={product.name}
                className="h-full max-h-130 w-full object-contain transition duration-300 hover:scale-[1.03]"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-20 w-20"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="text-sm font-medium">No image available</span>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                DollarJug Product
              </span>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  inStock
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    inStock ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 border-b border-gray-100 pb-6">
              <p className="text-sm font-medium text-gray-500">Price</p>

              <p className="mt-1 text-3xl font-extrabold tracking-tight text-emerald-700 sm:text-4xl">
                {validPrice ? `₹${price.toFixed(2)}` : "Price unavailable"}
              </p>
            </div>

            {/* Description */}
            <div className="py-6">
              <h2 className="text-lg font-bold text-gray-900">
                Product Description
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>

            {/* Stock Information */}
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  inStock
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {inStock ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 12 4 4L19 6"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M18 6 6 18"
                    />
                  </svg>
                )}
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  {inStock ? "Available for purchase" : "Currently unavailable"}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {inStock
                    ? `${product.stock} units available`
                    : "This product is currently out of stock."}
                </p>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock || !validPrice || addingToCart}
              className="btn min-h-14 w-full rounded-xl border-0 bg-emerald-600 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-200 hover:bg-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
            >
              {addingToCart ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Adding to Cart...
                </>
              ) : !inStock ? (
                "Out of Stock"
              ) : !validPrice ? (
                "Price Unavailable"
              ) : (
                <>
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
                      d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"
                    />
                    <circle cx="10" cy="21" r="1" />
                    <circle cx="18" cy="21" r="1" />
                  </svg>
                  Add to Shopping Cart
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              Add this item to your cart and continue shopping with DollarJug.
            </p>
          </div>
        </section>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-800"
          >
            <span aria-hidden="true">←</span>
            Continue browsing products
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
