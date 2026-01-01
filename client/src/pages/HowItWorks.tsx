import { useState } from "react";
import {
  Search,
  MousePointer,
  CheckCircle,
  Bell,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Browse Departments",
      description:
        "Search for the department or service you need. Use filters to find exactly what you're looking for.",
      image: "🏢",
    },
    {
      number: 2,
      icon: MousePointer,
      title: "Choose Your Slot",
      description:
        "Pick a time that works for you from the available slots. See real-time availability.",
      image: "📅",
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Book Instantly",
      description:
        "Confirm your details and book with a single click. Get instant confirmation.",
      image: "✅",
    },
    {
      number: 4,
      icon: Bell,
      title: "Stay Updated",
      description:
        "Receive reminders and updates about your appointment. Never miss a booking.",
      image: "🔔",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Simple & Fast</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Book your appointments in four simple steps. No waiting, no hassle.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setCurrentStep(step.number)}
              className="relative"
            >
              <div
                className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  currentStep === step.number ? "ring-4 ring-blue-500" : ""
                }`}
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-6xl mb-4 text-center">{step.image}</div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-blue-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visual Flow Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            The Complete Journey
          </h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-semibold text-indigo-600 mr-2">
                      STEP {step.number}
                    </span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Why Choose QueueKiller?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Experience the easiest way to manage your appointments
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Book appointments in under 30 seconds
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Always Accurate
              </h3>
              <p className="text-gray-600">Real-time availability updates</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure & Safe
              </h3>
              <p className="text-gray-600">
                Your data is protected at all times
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy users who save time every day with
            QueueKiller
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Browse Departments
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
