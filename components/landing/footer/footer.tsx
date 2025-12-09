"use client";


import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thanks for subscribing! We'll keep you updated.");
  };



  const socialLinks = [
    { icon: <FaTwitter size={20} />, href: "https://x.com/rohhaan12", label: "Twitter" },
    { icon: <FaLinkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <FaGithub size={20} />, href: "#", label: "GitHub" },
    { icon: <FaEnvelope size={20} />, href: "mailto:contact@getyouplaced.com", label: "Email" },
  ];

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-white mb-4">
              getyouplaced
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering students to land their dream jobs through strategic cold emailing. 
              Automate your outreach and connect with opportunities faster.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1DB954] text-white rounded-lg font-semibold hover:bg-[#1ed760] hover:shadow-lg transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1DB954] transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            {/* <h3 className="text-white font-bold mb-4">Product</h3> */}
            <ul className="space-y-3"></ul>
          </div>

          {/* Resources Links */}
          <div>
            {/* <h3 className="text-white font-bold mb-4">Resources</h3> */}
            <ul className="space-y-3"></ul>
          </div>

          {/* Company Links */}
          <div>
            {/* <h3 className="text-white font-bold mb-4">Company</h3> */}
            <ul className="space-y-3"></ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} GetYouPlaced. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Made with ❤️ for students worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}