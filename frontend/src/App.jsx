import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import FlowTeaser from './components/FlowTeaser';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FlowPage from './pages/FlowPage';
import PullToRefresh from './components/PullToRefresh';
import { setupScrollReveal, setupNavBehaviour, setupMagneticButtons } from './utils/animations';

export default function App() {
  const isFlow = window.location.pathname.startsWith('/flow');

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
  }, [isFlow]);

  if (isFlow) return (
    <>
      <PullToRefresh />
      <FlowPage />
    </>
  );

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
      </main>
      <Footer />
    </>
  );
}
