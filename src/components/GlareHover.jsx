import { useRef } from "react";

const GlareHover = ({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style = {},
}) => {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const containerRef = useRef(null);

  const animateIn = () => {
    const el = containerRef.current;
    if (!el) return;

    const overlay = el.querySelector('.glare-overlay');
    if (!overlay) return;

    overlay.style.transition = "none";
    overlay.style.backgroundPosition = "-100% -100%, 0 0";
    overlay.style.transition = `${transitionDuration}ms ease`;
    overlay.style.backgroundPosition = "100% 100%, 0 0";
  };

  const animateOut = () => {
    const el = containerRef.current;
    if (!el) return;

    const overlay = el.querySelector('.glare-overlay');
    if (!overlay) return;

    if (playOnce) {
      overlay.style.transition = "none";
      overlay.style.backgroundPosition = "-100% -100%, 0 0";
    } else {
      overlay.style.transition = `${transitionDuration}ms ease`;
      overlay.style.backgroundPosition = "-100% -100%, 0 0";
    }
  };

  const containerStyle = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    ...style,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(${glareAngle}deg,
        hsla(0,0%,0%,0) 60%,
        ${rgba} 70%,
        hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <span
      ref={containerRef}
      className={className}
      style={containerStyle}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <span>{children}</span>
      
      <span 
        className="glare-overlay"
        style={overlayStyle}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};

export default GlareHover;
