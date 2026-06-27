"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 tracking-widest">
            YOUR PRIVACY MATTERS
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
              1. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We collect information you provide directly to us, including when you create an account, 
              make a purchase, or contact us. This may include your name, email address, phone number, 
              shipping address, and payment information.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We use the information we collect to process your orders, provide customer service, 
              send you promotional communications (with your consent), improve our services, 
              and comply with legal obligations.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              3. Information Sharing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We do not sell your personal information. We may share your information with 
              third-party service providers who assist us in operating our business, such as 
              payment processors, shipping companies, and analytics providers.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              4. Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We implement appropriate security measures to protect your personal information 
              from unauthorized access, alteration, or destruction. However, no method of 
              transmission over the internet is completely secure.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              5. Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You have the right to access, correct, or delete your personal information. 
              You may also opt out of marketing communications at any time.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              6. Cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We use cookies and similar technologies to improve your experience, analyze 
              traffic, and personalize content. You can control cookie settings through your browser.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We may update this privacy policy from time to time. We will notify you of any 
              changes by posting the new policy on this page.
            </p>

            <h2 className="font-serif text-3xl mb-4 text-black dark:text-white">
              8. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about this privacy policy, please contact us at:
              hello@edclothing.com or +91 8714987369
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
