import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  AlertCircle,
  Home as HomeIcon,
  MessageCircle,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setLoading(false);
      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      details: "support@queuekiller.com",
      description: "We'll respond within 24 hours",
      link: "mailto:support@queuekiller.com",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Monday to Friday, 9 AM - 6 PM EST",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Tech Street, Tech City, TC 12345",
      description: "Open for office hours by appointment",
      link: "https://maps.google.com",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "Fast Response",
      description: "We aim to respond within 24 hours",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Your data is encrypted and protected",
    },
    {
      icon: MessageCircle,
      title: "Support",
      description: "Dedicated support team ready to help",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-soft {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out forwards;
        }
        
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        
        .group:hover .group-hover\:translate-x-1 {
          transform: translateX(4px);
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-800 transition"
          >
            QueueKiller
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
            >
              <HomeIcon className="w-5 h-5" />
              Home
            </Link>
            <a
              href="#contact-form"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fadeInUp">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl animate-fadeInUp delay-1">
            Have questions about QueueKiller? We're here to help. Reach out and
            let's start a conversation about how we can support your success.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {method.details}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {method.description}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-linear-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-100 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div
          id="contact-form"
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto border border-gray-100 animate-fadeInUp delay-2"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Send us a Message
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>

          {submitted && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-slideInDown">
              <Check className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">
                  Thank you for reaching out!
                </p>
                <p className="text-green-700 text-sm mt-1">
                  We've received your message and will get back to you within
                  24 hours.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <div className="mt-2 text-red-600 text-sm flex items-center gap-1 animate-slideInDown">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <div className="mt-2 text-red-600 text-sm flex items-center gap-1 animate-slideInDown">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <div className="mt-2 text-red-600 text-sm flex items-center gap-1 animate-slideInDown">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </div>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Message
                </label>
                <span className="text-xs text-gray-500 font-medium">
                  {formData.message.length}/500
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Tell us how we can help..."
                maxLength={500}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <div className="mt-2 text-red-600 text-sm flex items-center gap-1 animate-slideInDown">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Minimum 10 characters required
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || submitted}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 duration-200"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : submitted ? (
                <>
                  <Check className="w-5 h-5" />
                  Message Sent
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-2xl mx-auto animate-fadeInUp delay-3">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              {
                q: "How quickly will I hear back?",
                a: "We typically respond within 24 hours during business days.",
              },
              {
                q: "What's the best way to contact you?",
                a: "Email is usually best for detailed inquiries. For urgent matters, call us directly.",
              },
              {
                q: "Do you offer phone support?",
                a: "Yes, we're available Monday to Friday, 9 AM - 6 PM EST. Call +1 (555) 123-4567.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition cursor-pointer"
              >
                <summary className="font-semibold text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;