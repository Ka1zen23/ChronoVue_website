import { StrictMode } from 'react';
import { gsap } from 'gsap';
import './index.css';
import App from './App.jsx';

if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(100);
}

export const createApp = () => {
  return {
    App: () => (
      <StrictMode>
        <App />
      </StrictMode>
    ),
  };
};