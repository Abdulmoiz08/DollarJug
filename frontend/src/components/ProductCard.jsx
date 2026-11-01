
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-xl">

      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-4"
      >
        <img
          src={`http://localhost:5000/${product.imageUrl}`}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-emerald-950">
          Great Find
        </span>
      </Link>

      {/* Product Information */}
      <div className="p-5">
        <h3 className="line-clamp-2 min-h-12 text-base font-bold text-gray-900 transition group-hover:text-emerald-700">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="mt-1 text-xl font-extrabold text-emerald-800">
              Rs. {product.price}
            </p>
          </div>

          <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
            Best Value
          </span>
        </div>

        {/* View Details */}
        <Link
          to={`/product/${product._id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          View Details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
