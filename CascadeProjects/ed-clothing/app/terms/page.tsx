"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 tracking-widest">
            TERMS OF SERVICE
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: June 2024
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              By accessing and using ED Clothing's website, you accept and agree to be bound 
              by the terms and provisions of this agreement.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              2. Products and Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We reserve the right to modify, discontinue, or refuse to provide any of our 
              products or services at any time without notice.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              3. Pricing and Payment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              All prices are listed in INR and are subject to change without notice. We accept 
              Cash on Delivery (COD) and Google Pay as payment methods. Payment is due at 
              the time of purchase.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              4. Shipping and Delivery
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We strive to process and ship orders within 2-3 business days. Delivery times 
              vary based on location. We are not responsible for delays caused by shipping carriers.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              5. Returns and Refunds
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We accept returns within 30 days of delivery for unworn items with original tags. 
              Refunds will be processed within 7-10 business days of receiving the returned item.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              6. User Accounts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You are responsible for maintaining the confidentiality of your account information 
              and for all activities that occur under your account.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              7. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              All content on this website, including text, graphics, logos, and images, is the 
              property of ED Clothing and is protected by copyright laws.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              ED Clothing shall not be liable for any indirect, incidental, special, or 
              consequential damages arising from the use of our products or services.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              9. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              These terms shall be governed by and construed in accordance with the laws of India.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              10. Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For any questions regarding these terms and conditions, please contact us at:
              hello@edclothing.com or +91 8714987369
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
