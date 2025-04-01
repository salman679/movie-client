"use client";

import { motion } from "framer-motion";
import { Film, Mail, Phone, MapPin, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  const stats = [
    {
      icon: <Film className="w-8 h-8 text-[#dc2626]" />,
      value: "1000+",
      label: "Movies",
    },
    {
      icon: <Users className="w-8 h-8 text-[#dc2626]" />,
      value: "50K+",
      label: "Users",
    },
    {
      icon: <Award className="w-8 h-8 text-[#dc2626]" />,
      value: "200+",
      label: "Awards",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#dc2626]" />,
      value: "24/7",
      label: "Support",
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/300?img=1",
    },
    {
      name: "Sarah Williams",
      role: "Head of Content",
      image: "https://i.pravatar.cc/300?img=5",
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "https://i.pravatar.cc/300?img=3",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen pt-36 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                About <span className="text-[#dc2626]">Movie Portal</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Welcome to Movie Portal! We are dedicated to providing a
                seamless experience for movie enthusiasts to explore, add, and
                manage their favorite movies. Our platform is user-friendly and
                aims to bring the joy of movies to everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  className="hover:text-white text-gray-600 border-gray-700 hover:bg-gray-800"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-[#dc2626] to-purple-600 opacity-30 blur-xl"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src="https://i.ibb.co/SB6CJFF/maxresdefault.jpg"
                    alt="Movie Portal Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#dc2626] to-[#991b1b] flex items-center justify-center">
                  <Film className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To create a comprehensive platform for movie lovers to
                  discover, manage, and share their favorite movies. We strive
                  to build a community where cinephiles can connect, discuss,
                  and celebrate the art of filmmaking. Our goal is to make
                  quality cinema accessible to everyone and preserve the
                  cultural heritage of film.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl overflow-hidden group"
              >
                <div className="relative h-80">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-[#dc2626]">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-gray-800 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 md:p-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Contact Us
                </h2>
                <p className="text-gray-300 mb-8">
                  If you have any questions or suggestions, feel free to reach
                  out to us. We&apos;d love to hear from you!
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-[#dc2626] mt-1 mr-3" />
                    <div>
                      <h3 className="text-white font-medium">Email</h3>
                      <a
                        href="mailto:support@movieportal.com"
                        className="text-gray-400 hover:text-[#dc2626] transition-colors"
                      >
                        support@movieportal.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-[#dc2626] mt-1 mr-3" />
                    <div>
                      <h3 className="text-white font-medium">Phone</h3>
                      <p className="text-gray-400">+1 234 567 890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-[#dc2626] mt-1 mr-3" />
                    <div>
                      <h3 className="text-white font-medium">Address</h3>
                      <p className="text-gray-400">123 Movie Lane, Film City</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-8 md:p-12"
              >
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <Button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
