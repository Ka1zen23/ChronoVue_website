import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import FlowTeaser from './components/FlowTeaser';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
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
