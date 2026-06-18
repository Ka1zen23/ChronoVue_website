import { ViteReactSSG } from 'vite-react-ssg';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import App from './App';
import FlowPage from './pages/FlowPage';
import './index.css';

export const createRoot = ViteReactSSG(
  {
    routes: [
      {
        element: <HelmetProvider><Outlet /></HelmetProvider>,
        children: [
          { path: '/', element: <App /> },
          { path: '/flow', element: <FlowPage /> },
        ],
      },
    ],
  },
  ({ isClient }) => {
    if (isClient && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(100);
    }
  },
);
