import React from 'react';
import GlareHover from './GlareHover';
import ShinyText from './ShinyText';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 mt-1">
          {/* Logo/Brand */}
          <div className="flex items-center ">
            <ShinyText text="Şirororo" disabled={false} speed={3} className="text-2xl md:text-3xl text-center" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              

              {/* Hakkımızda */}
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.9}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={900}
                playOnce={false}
              >
                <a href="#about" className=" text-2xl font-semibold text-[#b5b5b5a4]  transition-colors">
                  Hakkımızda
                </a>
              </GlareHover>

              {/* Hizmetler */}
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.9}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={900}
                playOnce={false}
              >
                <a href="#projects" className=" text-2xl font-semibold text-[#b5b5b5a4]  transition-colors">
                  Projeler
                </a>
              </GlareHover>

              {/* Projeler */}
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.9}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={900}
                playOnce={false}
              >
                <a href="#projects" className=" text-2xl font-semibold text-[#b5b5b5a4]  transition-colors">
                  Deneyimler
                </a>
              </GlareHover>

              {/* İletişim */}
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.9}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={900}
                playOnce={false}
              >
                <a href="#contact" className=" text-2xl font-semibold text-[#b5b5b5a4]  transition-colors">
                  İletişim Sayfası
                </a>
              </GlareHover>

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
