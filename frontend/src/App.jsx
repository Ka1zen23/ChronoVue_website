import { useEffect } from 'react';
import DemoApp from './demo/DemoApp';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Impact from './components/Impact';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { setupScrollReveal, setupNavBehaviour, setupMagneticButtons } from './utils/animations';

export default function App() {
  const isDemo = window.location.pathname.startsWith('/command-centre');

  useEffect(() => {
    if (isDemo) return;
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
  }, [isDemo]);

  if (isDemo) return <DemoApp />;

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
