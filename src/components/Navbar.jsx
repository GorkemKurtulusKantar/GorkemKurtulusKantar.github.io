import React from 'react';
import GradientText from './GradientText';
import ShinyText from './ShinyText';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50  backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            
            <ShinyText text="Şirororo" disabled={false} speed={3} className="text-4xl md:text-6xl text-center " />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
                
          <GradientText 
              className="text-2xl md:text-3xl "
              colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
              animationSpeed={6}
            >
              Şirororo
            </GradientText>
            <GradientText 
              className="text-2xl md:text-3xl "
              colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
              animationSpeed={6}
            >
              Şirororo
            </GradientText>     <GradientText 
              className="text-2xl md:text-3xl "
              colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
              animationSpeed={6}
            >
              Şirororo
            </GradientText>     <GradientText 
              className="text-2xl md:text-3xl "
              colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
              animationSpeed={6}
            >
              Şirororo
            </GradientText>
     
  
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white p-2 rounded-md"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Menüyü aç</span>
              {/* Hamburger icon */}
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
          </div>
        </div>
      </div>

    
      
    </nav>
  );
};

export default Navbar;
