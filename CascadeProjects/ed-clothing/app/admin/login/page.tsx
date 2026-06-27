"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication - replace with Firebase Auth
    if (email === "admin@edclothing.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      toast.success("Login successful");
      router.push("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-black p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl tracking-wider text-black dark:text-white mb-2">
              ED CLOTHING
            </h1>
            <p className="text-sm text-gray-500 tracking-widest">ADMIN PORTAL</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                  placeholder="admin@edclothing.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium tracking-widest hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors disabled:opacity-50"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Demo: admin@edclothing.com / admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
