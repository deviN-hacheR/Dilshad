"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-serif text-3xl tracking-wider">JOIN THE ED FAMILY</h3>
            <p className="mt-4 text-gray-400">
              Subscribe to receive exclusive updates, early access, and special offers.
            </p>
            <form className="mt-8 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-none border border-gray-700 bg-transparent px-6 py-4 text-white placeholder-gray-500 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-none border border-white bg-white px-8 py-4 font-medium text-black transition-all hover:bg-gold-500 hover:border-gold-500"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <h4 className="font-serif text-2xl tracking-widest">ED CLOTHING</h4>
              <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                Premium luxury fashion for the modern individual. Timeless elegance meets contemporary design.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="mb-6 font-medium tracking-wider text-gold-500">QUICK LINKS</h5>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-gray-400 transition-colors hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-gray-400 transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h5 className="mb-6 font-medium tracking-wider text-gold-500">CUSTOMER SERVICE</h5>
              <ul className="space-y-3">
                <li>
                  <Link href="/track-order" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="mb-6 font-medium tracking-wider text-gold-500">CONTACT US</h5>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">+91 8714987369</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">hello@edclothing.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Mumbai, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">
              © 2024 ED Clothing. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-xs text-gray-500 transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-500 transition-colors hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-gold-500"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
