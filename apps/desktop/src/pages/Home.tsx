import { useState, useEffect } from "react";
import {
  Clock,
  Users,
  TrendingUp,
  Settings,
  BarChart3,
  Phone,
  ArrowRight,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const AnimatedCounter = ({
    target,
    suffix = "",
  }: {
    target: number;
    suffix?: string;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [target]);

    return (
      <>
        {count}
        {suffix}
      </>
    );
  };

  const stats = [
    { label: "Active Queues", value: 12, suffix: "", icon: Clock },
    { label: "Team Members", value: 8, suffix: "", icon: Users },
    { label: "Efficiency Gain", value: 45, suffix: "%", icon: TrendingUp },
  ];

  const features = [
    {
      icon: Clock,
      title: "Real-time Queue Management",
      description:
        "Monitor and manage customer queues in real-time with instant updates and notifications.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Track queue metrics, wait times, and customer satisfaction to optimize operations.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Seamless coordination across your team with real-time status updates and assignments.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Settings,
      title: "Easy Configuration",
      description:
        "Customize queue flows, priorities, and rules to match your business needs.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const benefits = [
    "Reduce customer wait times by up to 60%",
    "Improve staff productivity and satisfaction",
    "Gain valuable insights into queue patterns",
    "Seamless integration with existing systems",
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">QueueKiller</div>
          <div className="flex gap-6">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Home
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
            >
              <MessageSquare className="w-5 h-5" />
              Contact
            </Link>
          </div>
        </div>
      </nav>

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
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
      `}</style>

      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-28 relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 animate-fadeInUp">
            Welcome to QueueKiller
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl animate-fadeInUp delay-1">
            Eliminate queues, enhance customer experience, and boost operational
            efficiency with our intelligent queue management system
          </p>
          <div className="flex gap-4 flex-wrap animate-fadeInUp delay-2">
            <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500 hover:scale-105 transform animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mt-3">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </p>
                  </div>
                  <IconComponent className="w-16 h-16 text-blue-500 opacity-10" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage queues efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0">
                      <div
                        className={`flex items-center justify-center h-14 w-14 rounded-lg bg-linear-to-br ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose QueueKiller?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <p className="text-lg text-gray-700 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <p className="text-gray-600 text-lg">
            Start managing your queues in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              emoji: "⚙️",
              title: "Configure Queues",
              desc: "Set up and customize your queue systems",
            },
            {
              emoji: "📊",
              title: "View Analytics",
              desc: "Monitor queue performance and metrics",
            },
            {
              emoji: "👥",
              title: "Manage Team",
              desc: "Coordinate with your team members",
            },
          ].map((action, index) => (
            <button
              key={index}
              className="group bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:scale-105 transform border border-gray-100 hover:border-blue-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {action.emoji}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {action.title}
              </h3>
              <p className="text-gray-600">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses already using QueueKiller to eliminate
            customer wait times
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              Contact Our Team
            </Link>
            <button className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200">
              Schedule Demo
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
