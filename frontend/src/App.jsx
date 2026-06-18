import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import FlowTeaser from './components/FlowTeaser';
import Team from './components/Team';
import Contact from './components/Contact';
import CompanyProfile from './components/CompanyProfile';
import Footer from './components/Footer';
import PullToRefresh from './components/PullToRefresh';
import { setupHeroEntrance, setupScrollReveal, setupNavBehaviour, setupMagneticButtons } from './utils/animations';

export default function App() {
  useEffect(() => {
    let cleanups = [];
    const t = setTimeout(() => {
      cleanups = [
        setupHeroEntrance(),
        setupScrollReveal(),
        setupNavBehaviour(),
        setupMagneticButtons(),
      ].filter(Boolean);
    }, 60);
    return () => {
      clearTimeout(t);
      cleanups.forEach((fn) => fn?.());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>ChronoVue: SaaS Product Studio | Brunei</title>
        <meta name="description" content="ChronoVue builds purpose-built SaaS platforms for sectors still running on manual workflows. Our first product, FLOW, replaces paper census sheets, Excel, and WhatsApp with a single real-time hospital bed management dashboard." />
        <link rel="canonical" href="https://chronovue.co" />
      </Helmet>
      <PullToRefresh />
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <FlowTeaser />
        <Team />
        <Contact />
        <CompanyProfile />
      </main>
      <Footer />
    </>
  );
}
