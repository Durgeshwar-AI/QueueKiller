import { useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import HeroSection from "../components/Landing/HeroSection";
import FeaturesSection from "../components/Landing/FeaturesSection";
import BenefitsSection from "../components/Landing/BenefitsSection";
import CTASection from "../components/Landing/CTASection";
import VideoModal from "../components/Landing/VideoModal";

const Landing = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <Navbar />
      <HeroSection onWatchDemo={() => setIsVideoOpen(true)} />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
};

export default Landing;
