import { useEffect } from 'react';
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
