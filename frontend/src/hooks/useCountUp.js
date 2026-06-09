import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

export default function useCountUp(target, active, duration = 1800) {
  const [value, setValue] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const proxy = { count: 0 };
    animRef.current = animate(proxy, {
      count: target,
      duration,
      ease: 'outCubic',
      onUpdate: () => setValue(Math.floor(proxy.count)),
      onComplete: () => setValue(target),
    });
    return () => animRef.current?.pause();
  }, [active, target, duration]);

  return value;
}
