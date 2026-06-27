"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  // This would be connected to Firebase in production
  const wishlistItems: any[] = [];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl tracking-wider mb-4 text-black dark:text-white">
            Wishlist
          </h1>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="h-24 w-24 mx-auto mb-8 text-gray-300 dark:text-gray-700" />
            <h2 className="font-serif text-2xl mb-4 text-black dark:text-white">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save items you love by clicking the heart icon
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium tracking-widest hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors"
            >
              BROWSE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Wishlist items would be rendered here */}
          </div>
        )}
      </div>
    </div>
  );
}
