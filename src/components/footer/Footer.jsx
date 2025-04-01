"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="text-[#dc2626] mr-2">Movie</span> Portal
            </h2>
            <p className="text-gray-400">
              Your one-stop destination for exploring, viewing, and managing
              movies with ease.
            </p>

            {/* Newsletter */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold mb-3">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/home"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/all-movies"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Movies
                </a>
              </li>
              <li>
                <a
                  href="/add-movie"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Add Movie
                </a>
              </li>
              <li>
                <a
                  href="/my-favorites"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  My Favorites
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-[#dc2626] mt-0.5" />
                <span className="text-gray-400">support@movieportal.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-[#dc2626] mt-0.5" />
                <span className="text-gray-400">+1 234 567 890</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-[#dc2626] mt-0.5" />
                <span className="text-gray-400">123 Movie Lane, Film City</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <p className="text-gray-400">
              Stay connected with us on social media
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://web.facebook.com/salman.izhar.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-[#dc2626] text-white p-3 rounded-full transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/mdsalmanizhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-[#dc2626] text-white p-3 rounded-full transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/salman-izhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-[#dc2626] text-white p-3 rounded-full transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Movie Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
