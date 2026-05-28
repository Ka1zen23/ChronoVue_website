import { useRef, useEffect } from 'react';
import CommandCentre from '../pages/CommandCentre';

export default function DashboardPreview() {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current || !innerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom <= 0) return;
      const scrolledPast = Math.max(0, -rect.top);
      const maxScroll = Math.max(0, innerRef.current.scrollHeight - containerRef.current.clientHeight);
      innerRef.current.style.transform = `translateY(-${Math.min(scrolledPast, maxScroll)}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
