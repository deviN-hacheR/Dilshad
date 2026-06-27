"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save to Firebase
    setSubmitted(true);
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappNumber = "8714987369";
  const contactNumber = "8714987369";

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
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 tracking-widest">
            GET IN TOUCH
          </p>
        </motion.div>
      </section>

      {/* Contact Info */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Phone",
                value: contactNumber,
                link: `tel:${contactNumber}`,
              },
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Email",
                value: "hello@edclothing.com",
                link: "mailto:hello@edclothing.com",
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "Location",
                value: "Mumbai, India",
                link: "#",
              },
            ].map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-gold-500 mb-4 flex justify-center">{item.icon}</div>
                <h3 className="font-serif text-xl mb-2 text-black dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
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
              Send Us a Message
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto" />
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-8 text-center"
            >
              <p className="text-green-600 dark:text-green-400 text-lg">
                Thank you for your message! We'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors resize-none"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium tracking-widest hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors"
              >
                SEND MESSAGE
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* WhatsApp Button */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="font-serif text-2xl mb-4 text-black dark:text-white">
              Chat with us on WhatsApp
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get instant support and answers to your questions
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-medium tracking-widest hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              CHAT ON WHATSAPP
            </a>
          </motion.div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 dark:bg-gray-900 p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Clock className="h-6 w-6 text-gold-500" />
              <h3 className="font-serif text-2xl text-black dark:text-white">Business Hours</h3>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>10:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mb-4 text-black dark:text-white">
              Find Us
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto" />
          </motion.div>
          <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Google Maps Placeholder</p>
          </div>
        </div>
      </section>
    </div>
  );
}
