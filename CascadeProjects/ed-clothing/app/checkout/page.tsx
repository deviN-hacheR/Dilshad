"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";
import { useState } from "react";
import { CreditCard, Smartphone, MapPin, User, Phone, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { formatPrice, generateOrderId } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "gpay">("cod");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || 
        !formData.city || !formData.state || !formData.pincode) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Simulate order creation - replace with Firebase
    const orderId = generateOrderId();
    
    setTimeout(() => {
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/track-order?orderId=${orderId}`);
      setLoading(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black py-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl mb-4 text-black dark:text-white">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add items to your cart before checkout
          </p>
        </div>
      </div>
    );
  }

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
            Checkout
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-gray-900 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-gold-500" />
                <h2 className="font-serif text-2xl text-black dark:text-white">Shipping Address</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                      placeholder="+91 8714987369"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                    placeholder="123 Street, Area"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-900 p-8"
            >
              <h2 className="font-serif text-2xl mb-6 text-black dark:text-white">Payment Method</h2>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-4 border-2 flex items-center gap-4 transition-colors ${
                    paymentMethod === "cod"
                      ? "border-black dark:border-white bg-black/5 dark:bg-white/5"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <CreditCard className="h-6 w-6" />
                  <div className="text-left">
                    <p className="font-medium text-black dark:text-white">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("gpay")}
                  className={`w-full p-4 border-2 flex items-center gap-4 transition-colors ${
                    paymentMethod === "gpay"
                      ? "border-black dark:border-white bg-black/5 dark:bg-white/5"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <Smartphone className="h-6 w-6" />
                  <div className="text-left">
                    <p className="font-medium text-black dark:text-white">Google Pay</p>
                    <p className="text-sm text-gray-500">Pay securely with GPay</p>
                  </div>
                </button>
              </div>

              {paymentMethod === "gpay" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Scan the QR code to pay
                  </p>
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <p className="text-gray-500 dark:text-gray-400">GPay QR Placeholder</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    UPI ID: 8714987369@upi
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 dark:bg-gray-900 p-8 sticky top-24"
            >
              <h2 className="font-serif text-2xl mb-6 text-black dark:text-white">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-black dark:text-white text-sm">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.size} × {item.quantity}
                      </p>
                      <p className="text-sm text-black dark:text-white mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="flex justify-between font-medium text-black dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium tracking-widest hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : "PLACE ORDER"}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
