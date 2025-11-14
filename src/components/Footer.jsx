import React from 'react';
import GlareHover from './GlareHover';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10   flex flex-col w-full pb-2  ">
      {/* Row 1: Name left, Availability right */}
      <div className="flex justify-between items-end w-full">


      </div>

      {/* Row 2: Left details + socials, Right contact + copyright */}
      <div className="mt-12 flex justify-between items-end w-full">
        {/* Left group */}
        <div className="flex flex-col">
          {/* Social Links */}
          <div className="md:mb-0 flex ">
            <p className="  uppercase text-black flex flex-row gap-4">
              <span className="text-black font-bold">Socials </span>


              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.9}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={900}
                playOnce={false}
              >
                <a 
                  href="https://www.linkedin.com/in/g%C3%B6rkem-kurtulu%C5%9F/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                className=" text-primary underline hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </GlareHover>
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.9}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={900}
                playOnce={false}
              >
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                className=" text-primary underline hover:text-primary transition-colors">
                  Instagram
                </a>
              </GlareHover>
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.9}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={900}
                playOnce={false}
              >
                <a 
                  href="https://github.com/Enissimu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                className=" text-primary underline hover:text-primary transition-colors">
                  Github
                </a>
              </GlareHover>

              {' '}

            </p>
          </div>
        </div>

        {/* Right group */}
        <div className="flex flex-col items-end text-right">
          {/* Contact */}
          <div className="mb-12 md:mb-8">
            <h3 className=" font-bold  uppercase text-black mb-2">
              Contact Me
            </h3>
            <a 
              href="mailto:gorkem.kantar@hotmail.com" 
              className="   text-black hover:text-primary transition-colors"
            >
              <span className="text-black">→ </span>
              <span className="text-primary underline ">gorkem.kantar@hotmail.com</span>
            </a>
            <div className="mt-2 text-sm text-black">
              <a href="tel:+905399484274" className="hover:text-primary transition-colors">
                +90 539 948 42 74
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="md:mt-auto">
            <p className="  uppercase text-black">
              © {currentYear} Görkem Kantar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
