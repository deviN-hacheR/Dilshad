"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="font-serif text-9xl font-bold text-black dark:text-white mb-4">
          404
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
          Page not found
        </p>
        <p className="text-gray-500 dark:text-gray-500 mb-12 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium tracking-widest hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors"
          >
            <Home className="h-5 w-5" />
            HOME
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-4 border border-gray-300 dark:border-gray-700 text-black dark:text-white font-medium tracking-widest hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            GO BACK
          </button>
        </div>
      </motion.div>
    </div>
  );
}
