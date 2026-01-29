import { Mail, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" },
    { name: "Roadmap", href: "/roadmap" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Community", href: "/community" },
    { name: "Support", href: "/support" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie" },
    { name: "GDPR", href: "/gdpr" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((s) => s.auth);

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                Stay Updated
              </h3>
              <p className="text-indigo-100">
                Get the latest updates on QueueKiller features and best
                practices delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-600"
              />
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Q</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                Queue<span className="text-indigo-600">Killer</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Transform your queue management with intelligent automation and
              real-time analytics.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 bg-gray-200 hover:bg-indigo-600 text-gray-700 hover:text-white rounded-lg flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Get Started</h4>
            <div className="space-y-3">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/signup")}
                    className="w-full flex items-center justify-between px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    Sign Up
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors text-sm font-medium"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/department")}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors text-sm font-medium"
                  >
                    Dashboard
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <p className="text-gray-600 text-sm">
              &copy; 2026 QueueKiller. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 md:justify-end">
              {footerLinks.legal.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Need Help?</h4>
              <p className="text-gray-600 text-sm">
                Our support team is here to assist you 24/7
              </p>
            </div>
            <a
              href="mailto:support@queuekiller.com"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
