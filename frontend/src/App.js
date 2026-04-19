import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
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
  return (
    <div className="relative min-h-screen bg-[#080202] text-white grain">
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <AudioPortfolio />
        <ValueProps />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
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
