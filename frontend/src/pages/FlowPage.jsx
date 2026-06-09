import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>FLOW: Real-Time Hospital Bed Management | ChronoVue</title>
        <meta name="description" content="FLOW gives nurse managers and Clinical Site Coordinators a live view of every bed across all wards, replacing paper census sheets, Excel, whiteboards, and WhatsApp. On-premise, desktop-first. Piloting at Brunei's Acute Medical Unit." />
        <link rel="canonical" href="https://chronovue.co/flow" />
      </Helmet>
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
