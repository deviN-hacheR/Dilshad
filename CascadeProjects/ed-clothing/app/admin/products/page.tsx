"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
    // Load products from Firebase (mock data for now)
    setProducts([
      { id: "1", name: "Premium Cotton Shirt", price: 2499, stock: 50, category: "Men" },
      { id: "2", name: "Linen Trousers", price: 1899, stock: 30, category: "Men" },
      { id: "3", name: "Silk Blouse", price: 3299, stock: 25, category: "Women" },
    ]);
  }, [router]);

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-black dark:text-white mb-2">
              Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your product inventory
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Back
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:bg-gold-500 dark:hover:bg-gold-500 transition-colors">
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                  Category
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-black dark:text-white">{product.name}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
