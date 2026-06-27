"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart, Heart, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useCartStore } from "@/stores/cart-store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const cartItems = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
            : "bg-white dark:bg-black"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-serif text-3xl font-bold tracking-widest text-black dark:text-white">
                ED
              </span>
              <span className="hidden font-serif text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 sm:block">
                CLOTHING
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-widest transition-colors hover:text-gold-600 ${
                    pathname === link.href
                      ? "text-black dark:text-white font-medium"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/cart"
                className="relative p-2 text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/wishlist"
                className="p-2 text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                <Heart className="h-5 w-5" />
              </Link>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white md:hidden"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-gray-200 dark:border-gray-800 pb-4"
              >
                <div className="pt-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none dark:border-gray-700 dark:focus:border-white"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
            >
              <div className="space-y-4 px-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm tracking-widest transition-colors hover:text-gold-600 ${
                      pathname === link.href
                        ? "text-black dark:text-white font-medium"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  className="block text-sm tracking-widest text-gray-400 transition-colors hover:text-gold-600"
                >
                  Admin
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
