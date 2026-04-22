import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import ProcessSection from "./components/ProcessSection";
import VideoBackdrop from "./components/VideoBackdrop";
import MelodyFinder from "./components/MelodyFinder";
import HowItWorks from "./components/HowItWorks";
import AudioPortfolio from "./components/AudioPortfolio";
import ValueProps from "./components/ValueProps";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-[#080202] text-white grain">
      <VideoBackdrop 
        enabled 
        useSplitVideo={true}
        srcPart1="/hero_part_1.mp4"
        srcPart2="/hero_part_2.mp4"
        srcPart3="/hero_part_3.mp4"
      >
        <main>
          <Hero />
          <ProcessSection />
          <About />
          <MelodyFinder />
          <HowItWorks />
          <AudioPortfolio />
          <ValueProps />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </main>
        {/* <Footer /> */}
      </VideoBackdrop>
      <FloatingWhatsApp />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
