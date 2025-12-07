import { ArrowRight, CheckCircle, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

const Hero = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useAppSelector((s) => s.auth);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16 md:pt-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ddddfa] rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#4746e7]" />
                <span className="text-[#4746e7]">Your Smart Scheduling Solution</span>
              </div>
              
              <h2 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Book Appointments with Ease
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-lg text-[#7e7e7e]">
                Connect with departments across multiple companies and schedule appointments seamlessly. 
                Whether you're booking a consultation or managing availability, we've got you covered.
              </p>
              
              {!isLoggedIn && (<div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('signup')}
                  className="group flex text-white bg-gradient-to-r from-[#4746e7] to-indigo-600 hover:from-[#4746e7]/90 hover:to-indigo-600/90 p-2 rounded-xl items-center justify-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('company-login')}
                  className="border-[#7e7e7e8e] border-1 p-2 rounded-xl"
                >
                  Company Login
                </button>
              </div>)}

              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-muted-foreground">Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-muted-foreground">No credit card</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1686563759042-edc83eafc3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjYWxlbmRhcnxlbnwxfHx8fDE3NjE5MjE3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Business meeting"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active Users</p>
                    <p>10,000+</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
  );
};

export default Hero;
