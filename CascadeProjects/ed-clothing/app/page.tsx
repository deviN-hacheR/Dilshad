"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely stunning quality. The attention to detail is remarkable.",
      location: "Mumbai",
    },
    {
      name: "Rahul Verma",
      rating: 5,
      comment: "Premium luxury at its finest. Can't wait for the full collection!",
      location: "Delhi",
    },
    {
      name: "Ananya Patel",
      rating: 5,
      comment: "The fabric quality is exceptional. True luxury fashion.",
      location: "Bangalore",
    },
  ];

  const categories = [
    { name: "Men's Collection", image: "/placeholder-men.jpg", comingSoon: true },
    { name: "Women's Collection", image: "/placeholder-women.jpg", comingSoon: true },
    { name: "Accessories", image: "/placeholder-accessories.jpg", comingSoon: true },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black"
        />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-serif text-7xl md:text-9xl font-bold tracking-widest text-black dark:text-white mb-4">
              ED
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl tracking-[0.5em] text-gray-600 dark:text-gray-400 mb-8"
            >
              CLOTHING
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg md:text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-12"
            >
              Timeless Elegance. Modern Luxury.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white dark:bg-white dark:text-black text-sm tracking-widest hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors duration-300"
              >
                EXPLORE COLLECTION
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gray-300 dark:bg-gray-700" />
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-4 bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-8 text-black dark:text-white">
              Our Story
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto mb-8" />
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              ED Clothing was born from a passion for exceptional craftsmanship and timeless design. 
              We believe that true luxury lies in the details – the perfect stitch, the finest fabric, 
              the impeccable fit.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Every piece in our collection is thoughtfully designed to transcend seasons and trends, 
              offering you wardrobe essentials that will remain elegant for years to come.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm tracking-widest text-gold-600 hover:text-gold-700 transition-colors"
            >
              LEARN MORE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4 text-black dark:text-white">
              Featured Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Coming Soon</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="font-serif text-2xl tracking-wider mb-2">{category.name}</h3>
                    {category.comingSoon && (
                      <span className="text-xs tracking-widest text-gold-400">
                        COMING SOON
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-24 px-4 bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4 text-black dark:text-white">
              Follow Us
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Instagram className="h-5 w-5" />
              <span className="text-sm tracking-widest">@EDCLOTHING</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.05 }}
                className="aspect-square bg-gray-200 dark:bg-gray-800 hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4 text-black dark:text-white">
              What Our Customers Say
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  "{review.comment}"
                </p>
                <div>
                  <p className="font-medium text-black dark:text-white">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4">
              Be First to Know
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Subscribe to receive exclusive updates, early access to our collection, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-medium tracking-widest hover:bg-gold-500 transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
