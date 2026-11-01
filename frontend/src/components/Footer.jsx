
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className= "mt-auto  bg-emerald-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-2xl font-black text-emerald-950 shadow-lg">
                $
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Dollar<span className="text-yellow-400">Jug</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-emerald-100/75">
              Discover everyday essentials, exciting finds, and
              budget-friendly products. Smart shopping starts here!
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-emerald-900/60 px-4 py-2 text-sm text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Shop smart. Spend wisely.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-emerald-100/75">
              <li>
                <Link
                  to="/"
                  className="transition hover:pl-1 hover:text-yellow-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="transition hover:pl-1 hover:text-yellow-400"
                >
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition hover:pl-1 hover:text-yellow-400"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-bold">
              Customer Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-emerald-100/75">
              <li>
                <Link
                  to="/return"
                  className="transition hover:pl-1 hover:text-yellow-400"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="transition hover:pl-1 hover:text-yellow-400"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition hover:pl-1 hover:text-yellow-400"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold">
              Stay Connected
            </h3>

            <p className="mt-4 text-sm leading-6 text-emerald-100/75">
              Follow DollarJug for updates, new arrivals, and exciting deals.
            </p>

            <div className="mt-5 flex gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-700 bg-emerald-900 text-lg font-bold transition hover:-translate-y-1 hover:border-yellow-400 hover:bg-yellow-400 hover:text-emerald-950"
              >
                f
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-700 bg-emerald-900 text-lg font-bold transition hover:-translate-y-1 hover:border-yellow-400 hover:bg-yellow-400 hover:text-emerald-950"
              >
                ig
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-700 bg-emerald-900 text-lg font-bold transition hover:-translate-y-1 hover:border-yellow-400 hover:bg-yellow-400 hover:text-emerald-950"
              >
                ▶
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-emerald-800 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-emerald-100/70">
            © {currentYear} DollarJug. All rights reserved.
          </p>

          <p className="text-sm text-emerald-100/70">
            Made for smarter shopping{" "}
            <span className="text-yellow-400">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
