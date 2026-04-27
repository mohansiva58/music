import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// All 5 frame sequences play as ONE continuous global background
import GlobalScrollBackground from "./components/GlobalScrollBackground";

// Content sections — scroll over the global bg
import Hero           from "./components/Hero";
import About          from "./components/About";
import ProcessSection from "./components/ProcessSection";
import MelodyFinder   from "./components/MelodyFinder";
import HowItWorks     from "./components/HowItWorks";
import AudioPortfolio from "./components/AudioPortfolio";
import ValueProps     from "./components/ValueProps";
import Testimonials   from "./components/Testimonials";
import FAQ            from "./components/FAQ";
import FinalCTA       from "./components/FinalCTA";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

/*
 * Layout contract
 * ───────────────────────────────────────────────────────────────────────
 * GlobalScrollBackground renders three fixed layers (z -3 / -2 / -1):
 *   -3  #080202 base  (prevents white flash on load)
 *   -2  canvas        (frame animation, advances with page scroll)
 *   -1  dark overlay  (keepens text readable across all sections)
 *
 * All content sits at z ≥ 0 and is position:relative, scrolling normally.
 * The root wrapper is transparent — the fixed canvas shows through.
 *
 * Sequence mapping (by frame-count weight over total page scroll):
 *   0–25%   herosection-jpg   (240 frames)
 *   25–44%  artistintro-jpg   (176 frames)
 *   44–62%  testinomials-jpg  (176 frames)
 *   62–81%  Mid-pageinterlude (176 frames)
 *   81–100% finalcta          (184 frames)
 * ───────────────────────────────────────────────────────────────────────
 */

const Landing = () => (
  /*
   * Root wrapper:
   *  • NO background-color — lets the fixed canvas show through.
   *  • position:relative + z-index:0 keeps content above the fixed layers.
   *  • "grain" CSS texture is preserved.
   */
  <div
    className="relative min-h-screen text-white grain"
    style={{ position: "relative", zIndex: 0 }}
  >
    {/* Global continuous background — covers entire page scroll */}
    <GlobalScrollBackground overlayOpacity={0.22} />

    {/* ── Content sections (scroll normally over the background) ── */}
    <main>
      <Hero />
      <About />
      <ProcessSection />
      
      <MelodyFinder />
      <HowItWorks />
      <AudioPortfolio />
      <ValueProps />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>

    <FloatingWhatsApp />
  </div>
);

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
