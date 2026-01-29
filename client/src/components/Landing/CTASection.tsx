import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Ready to Transform Your Queues?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of companies already using QueueKiller to improve their
          operations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => navigate("/company-login")}
            className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold transition-all"
          >
            Company Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
