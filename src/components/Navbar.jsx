import React from 'react';
import GlareHover from './GlareHover';
import ShinyText from './ShinyText';
import VariableProximity from './VariableProximity';
import { useRef } from 'react';

const Navbar = () => {
  const servicesContainerRef = useRef(null);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 mt-1">
          {/* Logo/Brand */}
          <div className="flex items-center ">
          <VariableProximity
              label="ŞİRORORO"
              fromFontVariationSettings="'wght' 700, 'opsz' 14"
              toFontVariationSettings="'wght' 950, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              href="#home"
              className="text-3xl  font-black text-white  block p-4"
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
              className="text-3xl  font-black text-white  block p-4"
            />



            <VariableProximity
              label="Projects"
               fromFontVariationSettings="'wght' 700, 'opsz' 14"
              toFontVariationSettings="'wght' 950, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              href="#projects"
              className="text-3xl  font-black text-white  block p-4"
            />

            <VariableProximity
              label="Contact"
                    fromFontVariationSettings="'wght' 700, 'opsz' 14"
              toFontVariationSettings="'wght' 950, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              href="#contact"
              className="text-3xl  font-black text-white  block p-4"
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
