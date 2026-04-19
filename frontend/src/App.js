import "@/App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroIntro from "./components/HeroIntro";
import Hero from "./components/Hero";
import About from "./components/About";
import VideoBackdrop from "./components/VideoBackdrop";
import MelodyFinder from "./components/MelodyFinder";
import HowItWorks from "./components/HowItWorks";
import AudioPortfolio from "./components/AudioPortfolio";
import ValueProps from "./components/ValueProps";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const Landing = () => {
  const [isEntryDone, setIsEntryDone] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#080202] text-white grain">
      {!isEntryDone ? (
        <HeroIntro onComplete={() => setIsEntryDone(true)} />
      ) : (
        <VideoBackdrop enabled>
          <main>
            <Hero />
            <About />
            <MelodyFinder />
            <HowItWorks />
            <AudioPortfolio />
            <ValueProps />
            <Testimonials />
            <Pricing />
            <FAQ />
            <FinalCTA />
          </main>
          <Footer />
        </VideoBackdrop>
      )}
      <FloatingWhatsApp />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
