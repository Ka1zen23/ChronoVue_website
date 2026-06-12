import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

// duration is in ms to preserve the existing call-site API
export default function useCountUp(target, active, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: duration / 1000,
      ease: 'power2.out',
      onUpdate: () => setValue(Math.round(obj.val)),
      onComplete: () => setValue(target),
    });
    return () => tween.kill();
  }, [active, target, duration]);

  return value;
}
