import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Company Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-gray-800">E-Shop</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Your one-stop shop for all your shopping needs. Quality products, great prices, and excellent service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <NavLink to="/about" className="text-gray-600 hover:text-gray-900">
                About Us
              </NavLink>
              <NavLink to="/contact" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </NavLink>
              <NavLink to="/faq" className="text-gray-600 hover:text-gray-900">
                FAQ
              </NavLink>
            </div>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
            <div className="flex flex-col space-y-2">
              <NavLink to="/privacy-policy" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </NavLink>
              <NavLink to="/terms-and-conditions" className="text-gray-600 hover:text-gray-900">
                Terms & Conditions
              </NavLink>
              <NavLink to="/shipping-policy" className="text-gray-600 hover:text-gray-900">
                Shipping Policy
              </NavLink>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
