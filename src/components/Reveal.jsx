import React, { useEffect, useRef, useState } from 'react';

const Reveal = ({ children, offset = '0px', duration = 600, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { root: null, rootMargin: offset, threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [offset]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isVisible ? 'translateY(0px)' : 'translateY(-20px)',
        opacity: isVisible ? 1 : 0,
        transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
