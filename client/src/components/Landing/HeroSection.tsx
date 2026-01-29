import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useAppSelector } from "../../hooks/reduxHooks";

interface HeroSectionProps {
  onWatchDemo: () => void;
}

const HeroSection = ({ onWatchDemo }: HeroSectionProps) => {
  const { isLoggedIn } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Companies" },
    { number: "2M+", label: "Queues Managed" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-purple-50 pt-32 pb-20">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              ✨ The Future of Queue Management
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Eliminate Queue Chaos
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your customer experience with intelligent queue
            management. Reduce wait times, boost satisfaction, and streamline
            operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/signup")}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            <button
              onClick={onWatchDemo}
              className="group px-8 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
