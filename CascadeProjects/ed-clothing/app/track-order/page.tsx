"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) {
      toast.error("Please enter your order ID");
      return;
    }

    setLoading(true);
    // Simulate API call - replace with actual Firebase query
    setTimeout(() => {
      // Mock data for demonstration
      setOrderStatus({
        id: orderId,
        status: "shipped",
        estimatedDelivery: "2024-07-15",
        items: [
          { name: "Premium Cotton Shirt", quantity: 2 },
          { name: "Linen Trousers", quantity: 1 },
        ],
        timeline: [
          { status: "Order Placed", date: "2024-07-01", completed: true },
          { status: "Order Confirmed", date: "2024-07-01", completed: true },
          { status: "Packed", date: "2024-07-02", completed: true },
          { status: "Shipped", date: "2024-07-03", completed: true },
          { status: "Delivered", date: "2024-07-15", completed: false },
        ],
      });
      setLoading(false);
      toast.success("Order found!");
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "packed":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-wider text-black dark:text-white mb-4">
            Track Order
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 tracking-widest">
            ORDER STATUS
          </p>
        </motion.div>
      </section>

      {/* Search Section */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleTrack}
            className="flex gap-4"
          >
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Order ID (e.g., ED123456)"
              className="flex-1 px-6 py-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium tracking-widest hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors disabled:opacity-50"
            >
              {loading ? "SEARCHING..." : "TRACK"}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Order Status */}
      {orderStatus && (
        <section className="py-24 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Order Summary */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-2xl text-black dark:text-white mb-2">
                      Order #{orderStatus.id}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Estimated Delivery: {orderStatus.estimatedDelivery}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(orderStatus.status)}
                    <span className="font-medium text-black dark:text-white capitalize">
                      {orderStatus.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h4 className="font-medium mb-4 text-black dark:text-white">Order Items</h4>
                  {orderStatus.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white dark:bg-gray-800 p-8">
                <h3 className="font-serif text-2xl mb-6 text-black dark:text-white">
                  Order Timeline
                </h3>
                <div className="space-y-6">
                  {orderStatus.timeline.map((step: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            step.completed ? "bg-gold-500" : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                        {index < orderStatus.timeline.length - 1 && (
                          <div
                            className={`w-0.5 h-16 ${
                              step.completed ? "bg-gold-500" : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <p className="font-medium text-black dark:text-white">{step.status}</p>
                        <p className="text-sm text-gray-500">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
