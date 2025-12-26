import {  Users, Clock, Target, Zap, Shield, ArrowRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';

export default function About() {
  const features = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Eliminate long waiting times and book appointments instantly with our streamlined scheduling system."
    },
    {
      icon: Users,
      title: "Easy Collaboration",
      description: "Connect departments and teams seamlessly for better coordination and communication."
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Quick booking process that takes seconds, not minutes. Get in, book, and move on with your day."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security. Book with confidence."
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Bookings Made" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar/>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About QueueKiller</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              We're on a mission to eliminate waiting times and make scheduling effortless for everyone. Book your appointments in seconds, not hours.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              QueueKiller was built with a simple goal: to make scheduling and appointment booking as simple and efficient as possible. We believe that nobody should waste time standing in queues or navigating complicated booking systems.
            </p>
            <p className="text-gray-600 mb-4">
              Our platform connects organizations with their customers, enabling seamless scheduling across departments and services. Whether it's booking a meeting, scheduling a service, or reserving a spot, we make it happen in seconds.
            </p>
            <p className="text-gray-600">
              We're constantly innovating to improve the booking experience for both businesses and their customers, making every interaction smooth and hassle-free.
            </p>
          </div>
          <div className="bg-indigo-100 rounded-2xl p-8 flex items-center justify-center">
            <Target className="w-64 h-64 text-indigo-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose QueueKiller?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've built a platform that puts user experience first, with powerful features that make scheduling effortless.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already saving time with QueueKiller. Start booking your appointments today.
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Browse Departments
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}