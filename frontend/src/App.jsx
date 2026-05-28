import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Impact from './components/Impact';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { setupScrollReveal, setupNavBehaviour, setupMagneticButtons } from './utils/animations';

export default function App() {
  useEffect(() => {
    // Small delay so all components are in the DOM
    const t = setTimeout(() => {
      setupScrollReveal();
      setupNavBehaviour();
      setupMagneticButtons();
    }, 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Impact />
        <Testimonials />
        <Pricing />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
