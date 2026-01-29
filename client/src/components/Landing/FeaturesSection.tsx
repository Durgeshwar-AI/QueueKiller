import {
  Clock,
  Users,
  Zap,
  BarChart3,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

interface Feature {
  icon: typeof Clock;
  title: string;
  description: string;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: Clock,
      title: "Smart Queue Management",
      description:
        "Real-time queue tracking with predictive wait times powered by AI",
    },
    {
      icon: Users,
      title: "Multi-Department Support",
      description:
        "Manage multiple departments and queues from a single dashboard",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description:
        "Get real-time alerts when it's your turn with push notifications",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Gain insights with detailed reports and performance metrics",
    },
    {
      icon: TrendingUp,
      title: "Peak Hour Optimization",
      description: "Automatic scheduling to balance load during peak hours",
    },
    {
      icon: MessageSquare,
      title: "In-App Communication",
      description: "Direct messaging with staff and real-time status updates",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage queues efficiently and keep customers
            happy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-gray-50 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
