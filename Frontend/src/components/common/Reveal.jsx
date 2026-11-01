import React, { useEffect, useRef, useState } from 'react';

export const Reveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 350, 
  threshold = 0.05,
  direction = 'up', // 'up', 'down', 'left', 'right', 'none'
  once = true,
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (!('IntersectionObserver' in window)) return true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin: '0px 0px -30px 0px' 
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, once, isVisible]);

  const getTransformClasses = () => {
    if (isVisible) {
      return 'opacity-100 translate-y-0 translate-x-0 scale-100';
    }
    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-4';
      case 'down':
        return 'opacity-0 -translate-y-4';
      case 'left':
        return 'opacity-0 translate-x-4';
      case 'right':
        return 'opacity-0 -translate-x-4';
      case 'none':
        return 'opacity-0';
      default:
        return 'opacity-0 translate-y-4';
    }
  };

  // Cap delays so elements don't lag during fast user scrolling
  const effectiveDelay = Math.min(delay, 80);

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${effectiveDelay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionProperty: 'opacity, transform',
        ...style
      }}
      className={`transform-gpu ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
