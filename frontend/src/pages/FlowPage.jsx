import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import FlowHero from '../components/FlowHero';
import FlowSnippets from '../components/FlowSnippets';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import Impact from '../components/Impact';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { setupScrollReveal, setupNavBehaviour, setupMagneticButtons } from '../utils/animations';

export default function FlowPage() {
  useEffect(() => {
    let cleanupReveal, cleanupNav;
    const t = setTimeout(() => {
      cleanupReveal = setupScrollReveal();
      cleanupNav = setupNavBehaviour();
      setupMagneticButtons();
    }, 60);
    return () => {
      clearTimeout(t);
      cleanupReveal?.();
      cleanupNav?.();
    };
  }, []);

  return (
    <>
      <Navbar flow />
      <main>
        <FlowHero />
        <FlowSnippets />
        <Features />
        <Testimonials />
        <HowItWorks />
        <Impact />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
