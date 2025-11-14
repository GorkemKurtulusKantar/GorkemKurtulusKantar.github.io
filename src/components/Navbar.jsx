import React from 'react';
import GlareHover from './GlareHover';
import ShinyText from './ShinyText';
import VariableProximity from './VariableProximity';
import { useRef, useEffect, useState } from 'react';
import { COLORS } from '../constants/colors';

const Navbar = () => {
  const servicesContainerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      let mostVisible = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry;
          }
        }
      });
      if (mostVisible && mostVisible.target && mostVisible.target.id) {
        setActiveSection(mostVisible.target.id);
      }
    }, { threshold: [0.25, 0.5, 0.75] });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  const sectionColors = {
    home: COLORS.ribbonColors[0],
    about: COLORS.ribbonColors[1],
    projects: COLORS.ribbonColors[2],
    contact: COLORS.ribbonColors[0],
  };

  const linkClass = 'text-3xl font-black text-white transition-colors block p-4';
  const linkStyle = (id) => (activeSection === id ? { color: sectionColors[id] } : undefined);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 mt-1">
          {/* Logo/Brand */}
          <div className="flex items-center ">
          <VariableProximity
              label="Görkem Kantar"
              fromFontVariationSettings="'wght' 700, 'opsz' 14"
              toFontVariationSettings="'wght' 950, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              href="#home"
              className={linkClass}
              style={linkStyle('home')}
            />          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex " ref={servicesContainerRef}>
              
              {/* Hakkımızda */}
              <VariableProximity
              label="About"
              fromFontVariationSettings="'wght' 700, 'opsz' 14"
              toFontVariationSettings="'wght' 950, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              href="#about"
              className={linkClass}
              style={linkStyle('about')}
            />



            <VariableProximity
              label="Projects"
               fromFontVariationSettings="'wght' 700, 'opsz' 14"  
              toFontVariationSettings="'wght' 950, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              href="#projects"
              className={linkClass}
              style={linkStyle('projects')}
            />

            <VariableProximity
              label="Contact"
                    fromFontVariationSettings="'wght' 700, 'opsz' 14"
              toFontVariationSettings="'wght' 950, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              href="#contact"
              className={linkClass}
              style={linkStyle('contact')}
            />




            </div>
          </div>

          <div className="md:hidden">
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.9}
              glareAngle={-45}
              glareSize={150}
              transitionDuration={900}
              playOnce={false}
            >
              <button
                type="button"
                className="text-[#b5b5b5a4] p-2 rounded-md"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Menüyü aç</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </GlareHover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
