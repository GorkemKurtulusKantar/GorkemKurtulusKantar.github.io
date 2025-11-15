import React, { useRef } from 'react';
import VariableProximity from './VariableProximity';

const Footer = () => {

  const containerRef = useRef(null);
  return (
    <footer className="relative z-10 flex flex-col w-full pb-2">
      {/* Row 1: Name left, Availability right */}
      <div className="flex justify-between items-end w-full px-4">


      </div>

      <div className="mt-8 md:mt-12 flex flex-col md:flex-row w-full items-start md:items-end gap-8 md:gap-0 justify-start md:justify-between px-4">
        {/* Left group */}
        <div className="flex flex-col">
          {/* Social Links */}
          <div ref={containerRef} >

            <VariableProximity
              label="G2K"
              fromFontVariationSettings="'wght' 1000, 'opsz' 72"
              toFontVariationSettings="'wght' 2000, 'opsz' 128"
              containerRef={containerRef}
              radius={30}
              falloff="gaussian"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 inline-block align-top leading-tight"
            />
          </div>


          <div className="md:mb-0 flex flex-wrap gap-4 md:gap-6">
            <p className="uppercase flex flex-row flex-wrap gap-4 md:gap-6 text-base sm:text-lg md:text-2xl">
              <span className=" font-extrabold">Socials</span>
              <a 
                href="https://www.linkedin.com/in/g%C3%B6rkem-kurtulu%C5%9F/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline hover:text-black transition-colors font-semibold">
                LinkedIn
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline hover:text-black transition-colors font-semibold">
                Instagram
              </a>
              <a 
                href="https://github.com/Enissimu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline hover:text-black transition-colors font-semibold">
                Github
              </a>
            </p>
          </div>
        </div>

        {/* Right group */}
        <div className="flex flex-col md:items-end md:text-right items-start text-left">
          {/* Contact */}
          <div>
            <h3 className="font-extrabold uppercase  mb-3 text-xl md:text-3xl">
              Contact Me
            </h3>
            <a 
              href="mailto:gorkem.kantar@hotmail.com" 
              className=" hover:text-black transition-colors text-base sm:text-lg md:text-2xl font-semibold break-all"
            >
              <span className="text-primary underline">gorkem.kantar@hotmail.com</span>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
