"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "When will your collection launch?",
      answer: "Our first collection is launching in approximately one month. Subscribe to our newsletter to be the first to know when we go live.",
    },
    {
      question: "What sizes do you offer?",
      answer: "We will offer a comprehensive size range from XS to XXL for both men and women. Detailed size guides will be available on each product page.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn items with original tags. Returns are free for defective items, while customer-initiated returns may have a small processing fee.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide. International shipping rates and delivery times vary by location. Free shipping is available on orders above a certain value.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive an email with tracking information. You can also track your order using our Order Tracking page with your order ID.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Cash on Delivery (COD) and Google Pay. More payment options including credit/debit cards and UPI will be added soon.",
    },
    {
      question: "How do I care for my ED Clothing items?",
      answer: "Each product comes with specific care instructions. Generally, we recommend dry cleaning for formal wear and gentle machine wash for casual items. Always follow the care label.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, premium gift wrapping is available at checkout. You can also add a personalized message for that special touch.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 24 hours of placement. After that, please contact our customer service for assistance.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us via email at hello@edclothing.com, phone at +91 8714987369, or WhatsApp for instant support. Our team is available Monday-Saturday 10 AM - 7 PM.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
            FAQ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 tracking-widest">
            FREQUENTLY ASKED QUESTIONS
          </p>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4 text-black dark:text-white">
              Common Questions
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto" />
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border border-gray-200 dark:border-gray-800"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <span className="font-medium text-black dark:text-white pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-5 text-gray-600 dark:text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-400 mb-8">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-black font-medium tracking-widest hover:bg-gold-500 transition-colors"
            >
              CONTACT US
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
