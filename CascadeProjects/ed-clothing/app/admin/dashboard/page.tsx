"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  LogOut,
  Menu,
  X,
  Settings,
  Bell,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: "Total Orders", value: "1,234", icon: ShoppingCart, change: "+12%" },
    { label: "Total Revenue", value: "₹4.5L", icon: DollarSign, change: "+18%" },
    { label: "Total Products", value: "89", icon: Package, change: "+5%" },
    { label: "Total Customers", value: "567", icon: Users, change: "+23%" },
  ];

  const recentOrders = [
    { id: "ED123456", customer: "John Doe", amount: "₹2,499", status: "shipped" },
    { id: "ED123457", customer: "Jane Smith", amount: "₹1,899", status: "pending" },
    { id: "ED123458", customer: "Bob Johnson", amount: "₹3,299", status: "delivered" },
    { id: "ED123459", customer: "Alice Brown", amount: "₹999", status: "packed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <h1 className="font-serif text-xl tracking-wider text-black dark:text-white">ED ADMIN</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:block`}
        >
          <div className="p-6">
            <h1 className="font-serif text-2xl tracking-wider text-black dark:text-white mb-8">
              ED ADMIN
            </h1>

            <nav className="space-y-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-3 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-lg"
              >
                <TrendingUp className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
              </Link>
              <Link
                href="/admin/customers"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Users className="h-5 w-5" />
                Customers
              </Link>
              <Link
                href="/admin/coupons"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                Coupons
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-8 w-full"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="font-serif text-3xl text-black dark:text-white mb-2">
                Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, Admin
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-black p-6 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="h-6 w-6 text-gold-500" />
                    <span className="text-sm text-green-500">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-black dark:text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-serif text-xl text-black dark:text-white">
                  Recent Orders
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-black dark:text-white">{order.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-black dark:text-white">{order.amount}</p>
                      <p className="text-sm capitalize text-gray-600 dark:text-gray-400">
                        {order.status}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
