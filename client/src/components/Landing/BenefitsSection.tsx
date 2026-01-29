import { Clock, Users, TrendingUp, CheckCircle2 } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    "Reduce wait times by up to 70%",
    "Improve customer satisfaction",
    "Increase operational efficiency",
    "Save costs on staffing",
    "Better resource allocation",
    "Data-driven insights",
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              Why Choose QueueKiller?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Avg. Wait Time</div>
                  <div className="text-green-300 text-lg font-bold">
                    ↓ 70% Reduction
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Satisfaction</div>
                  <div className="text-green-300 text-lg font-bold">
                    ↑ 85% Improvement
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Efficiency</div>
                  <div className="text-green-300 text-lg font-bold">
                    ↑ 60% Better
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
