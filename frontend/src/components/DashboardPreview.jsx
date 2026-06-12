import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CommandCentre from '../pages/CommandCentre';

gsap.registerPlugin(ScrollTrigger);

export default function DashboardPreview() {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const setY = gsap.quickSetter(inner, 'y', 'px');

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: () => {
        const rect = container.getBoundingClientRect();
        const scrolledPast = Math.max(0, -rect.top);
        const maxScroll = Math.max(0, inner.scrollHeight - container.clientHeight);
        setY(-Math.min(scrolledPast, maxScroll));
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(inner);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-t-2xl border border-white/[0.08] shadow-2xl shadow-black/50"
      style={{ height: '88vh' }}
    >
      <div ref={innerRef} style={{ willChange: 'transform' }}>
        <CommandCentre embedded />
      </div>
    </div>
  );
}
