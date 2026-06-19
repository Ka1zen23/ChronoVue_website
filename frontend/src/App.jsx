import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import FlowTeaser from './components/FlowTeaser';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PullToRefresh from './components/PullToRefresh';
import TopographicLines from './components/TopographicLines';
import { setupHeroEntrance, setupScrollReveal, setupNavBehaviour, setupMagneticButtons } from './utils/animations';

export default function App() {
  return (
    <>
      <Helmet>
        <title>ChronoVue: SaaS Product Studio | Brunei</title>
        <meta name="description" content="ChronoVue builds purpose-built SaaS platforms for sectors still running on manual workflows. Our first product, FLOW, replaces paper census sheets, Excel, and WhatsApp with a single real-time hospital bed management dashboard." />
        <link rel="canonical" href="https://chronovue.co" />
      </Helmet>

      {/* Global topographic background — fixed, behind all content */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1, background: '#F5F4EF' }}>
        <TopographicLines />
      </div>

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
