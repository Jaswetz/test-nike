// Nike Animation Utility
// Provides hooks and helpers for scroll-driven, microinteraction, and 3D animation logic
// Uses GSAP and Framer Motion for scroll and microinteractions

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Custom Nike Easing
export const NIKE_EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

// Parallax, fade, scale, stagger hooks
export function useNikeScrollAnimation(ref: React.RefObject<HTMLElement>, options?: { y?: number; scale?: [number, number]; stagger?: number }) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y: options?.y ?? 100, scale: options?.scale?.[0] ?? 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: options?.scale?.[1] ?? 1.05,
        duration: 1,
        ease: NIKE_EASE,
        stagger: options?.stagger ?? 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [ref, options]);
}

// Microinteraction: scale on press
export function useNikeButtonFeedback(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const onDown = () => gsap.to(el, { scale: 0.95, duration: 0.1, ease: NIKE_EASE });
    const onUp = () => gsap.to(el, { scale: 1, duration: 0.2, ease: NIKE_EASE });
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);
    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mouseleave', onUp);
    };
  }, [ref]);
}
