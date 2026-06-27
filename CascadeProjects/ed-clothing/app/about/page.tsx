"use client";

import { motion } from "framer-motion";
import { Target, Award, Heart, Gem } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Gem className="h-8 w-8" />,
      title: "Quality",
      description: "We never compromise on quality. Every piece is crafted with the finest materials and exceptional attention to detail.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Our commitment to excellence drives everything we do, from design to delivery.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion",
      description: "Fashion is our passion. We pour our heart into creating pieces that inspire confidence and elegance.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Innovation",
      description: "We blend timeless design with modern innovation to create fashion that stands out.",
    },
  ];

  const milestones = [
    { year: "2024", title: "Brand Launch", description: "ED Clothing was founded with a vision to redefine luxury fashion." },
    { year: "2024", title: "First Collection", description: "Our debut collection launches, featuring premium men's and women's wear." },
    { year: "2025", title: "Expansion", description: "Expanding our reach with new categories and international shipping." },
  ];

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
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 tracking-widest">
            OUR STORY
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4 text-black dark:text-white">
              Our Story
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            <p>
              ED Clothing was born from a simple yet powerful belief: that true luxury lies in the details. 
              Founded in 2024, our brand represents a commitment to exceptional craftsmanship, timeless design, 
              and the finest materials.
            </p>
            <p>
              We believe that fashion should be more than just clothing—it should be an expression of individuality, 
              a statement of quality, and a celebration of style. Every piece in our collection is thoughtfully 
              designed to transcend seasons and trends.
            </p>
            <p>
              Our journey began with a vision to create a brand that offers premium luxury at accessible prices, 
              without compromising on quality or design. Today, we continue to honor that vision with every 
              collection we create.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
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
              Our Values
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-white dark:bg-gray-800 shadow-sm"
              >
                <div className="text-gold-500 mb-6 flex justify-center">{value.icon}</div>
                <h3 className="font-serif text-2xl mb-4 text-black dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-8">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              To redefine luxury fashion by creating exceptional pieces that inspire confidence, 
              celebrate individuality, and stand the test of time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4 text-black dark:text-white">
              Our Journey
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto" />
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <span className="font-serif text-3xl text-gold-500">{milestone.year}</span>
                </div>
                <div className="border-l-2 border-gold-500 pl-8 pb-8">
                  <h3 className="font-serif text-2xl mb-2 text-black dark:text-white">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
