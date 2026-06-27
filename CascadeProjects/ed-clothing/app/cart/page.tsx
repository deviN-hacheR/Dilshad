"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";
import { Trash2, Plus, Minus, ShoppingBag, Gift } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(subtotal * 0.1);
      toast.success("Coupon applied! 10% discount");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const handleRemove = (productId: string, size: string, color: string) => {
    removeItem(productId, size, color);
    toast.success("Item removed from cart");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black py-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ShoppingBag className="h-24 w-24 mx-auto mb-8 text-gray-300 dark:text-gray-700" />
            <h1 className="font-serif text-4xl mb-4 text-black dark:text-white">Your Cart is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add some luxury items to your cart
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium tracking-widest hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors"
            >
              BROWSE COLLECTION
            </Link>
          </motion.div>
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
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={`${item.productId}-${item.size}-${item.color}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-6 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-32 h-40 bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-serif text-xl mb-2 text-black dark:text-white">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="font-medium text-black dark:text-white mb-4">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-700">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                        }
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 text-black dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                        }
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.productId, item.size, item.color)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
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

              <div className="space-y-4 mb-6">
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
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex justify-between font-medium text-black dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-sm hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Try: WELCOME10</p>
              </div>

              <Link
                href="/checkout"
                className="block w-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium tracking-widest text-center hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors mb-4"
              >
                PROCEED TO CHECKOUT
              </Link>

              <button
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
                className="block w-full px-8 py-4 border border-gray-300 dark:border-gray-700 text-black dark:text-white font-medium tracking-widest hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                CLEAR CART
              </button>

              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                <Gift className="h-4 w-4" />
                <span>Free shipping on orders above ₹2,000</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
