"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Clock, Mail, Bell } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    // Here you would save to Firebase
    setSubscribed(true);
    toast.success("You're on the list! We'll notify you when we launch.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-wider text-black dark:text-white mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 tracking-widest">
            IS ARRIVING SOON
          </p>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Clock className="h-12 w-12 mx-auto mb-6 text-gold-500" />
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4">
              Launch Countdown
            </h2>
            <p className="text-gray-400">
              Be the first to experience luxury fashion redefined
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINUTES", value: timeLeft.minutes },
              { label: "SECONDS", value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gray-900 border border-gray-800 p-6 md:p-8">
                  <span className="font-serif text-4xl md:text-6xl font-bold text-gold-500">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-sm tracking-widest text-gray-400">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Subscription Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-900/20 border border-green-800 p-8 text-center"
              >
                <Bell className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-serif text-2xl mb-2">You're Subscribed!</h3>
                <p className="text-gray-400">
                  We'll notify you as soon as our collection launches.
                </p>
              </motion.div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 p-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Mail className="h-6 w-6 text-gold-500" />
                  <h3 className="font-serif text-2xl">Get Notified</h3>
                </div>
                <p className="text-gray-400 text-center mb-6">
                  Subscribe to receive an exclusive launch notification and early access to our collection.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gold-500 text-black font-medium tracking-widest hover:bg-gold-600 transition-colors"
                  >
                    NOTIFY ME
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
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
              What to Expect
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Crafted with the finest materials and exceptional attention to detail.",
              },
              {
                title: "Timeless Design",
                description: "Pieces that transcend seasons and trends, designed to last.",
              },
              {
                title: "Limited Edition",
                description: "Exclusive collections with limited availability for true luxury.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="font-serif text-2xl mb-4 text-black dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
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
              Coming Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400">A glimpse of what's to come</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Men's Formal",
              "Women's Elegant",
              "Casual Luxury",
              "Accessories",
            ].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <span className="relative text-white font-serif text-xl tracking-wider">
                  {category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
