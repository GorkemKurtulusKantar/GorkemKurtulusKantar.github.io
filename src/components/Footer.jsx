import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#FDF7F4] min-h-screen flex flex-col px-8 md:px-16 py-16">
      <div className="flex-1 flex flex-col md:flex-row justify-between">
        {/* Left Column */}
        <div className="flex flex-col justify-between mb-12 md:mb-0">
          {/* Main Title */}
          <div className="mb-12 md:mb-0">
            <h1 className="font-montserrat font-bold text-5xl md:text-6xl lg:text-7xl text-[#6A6AFF] uppercase tracking-tight">
              Görkem Kantar
            </h1>
          </div>

          {/* Work Schedule */}
          <div className="mb-12 md:mb-8">
            <div className="mb-4">
              <h3 className="font-inter font-bold text-sm uppercase text-black mb-1">
                Work Days
              </h3>
              <p className="font-inter text-sm uppercase text-black">
                Tuesday-Friday
              </p>
            </div>
            <div>
              <h3 className="font-inter font-bold text-sm uppercase text-black mb-1">
                Teaching
              </h3>
              <p className="font-inter text-sm uppercase text-black">
                Monday
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:mb-0">
            <p className="font-inter text-sm uppercase text-black">
              <span className="text-black">Socials </span>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A6AFF] underline hover:text-[#4A4AFF] transition-colors"
              >
                Github
              </a>
              {' '}
              <a 
                href="https://codepen.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A6AFF] underline hover:text-[#4A4AFF] transition-colors"
              >
                Codepen
              </a>
              {' '}
              <a 
                href="https://bsky.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A6AFF] underline hover:text-[#4A4AFF] transition-colors"
              >
                Bluesky
              </a>
              {' '}
              <a 
                href="https://mastodon.social" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A6AFF] underline hover:text-[#4A4AFF] transition-colors"
              >
                Mastodon
              </a>
              {' '}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A6AFF] underline hover:text-[#4A4AFF] transition-colors"
              >
                Instagram
              </a>
              {' '}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A6AFF] underline hover:text-[#4A4AFF] transition-colors"
              >
                LinkedIn
              </a>
              {' '}
              <a 
                href="/rss" 
                className="text-[#6A6AFF] underline hover:text-[#4A4AFF] transition-colors"
              >
                RSS
              </a>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between items-end text-right">
          {/* Availability */}
          <div className="mb-12 md:mb-8">
            <p className="font-inter font-bold text-sm uppercase text-black">
              Available January 2026
            </p>
          </div>

          {/* Contact */}
          <div className="mb-12 md:mb-8">
            <h3 className="font-inter font-bold text-sm uppercase text-black mb-2">
              Have a project in mind?
            </h3>
            <a 
              href="mailto:info@gorkemkantar.com" 
              className="font-inter text-sm uppercase text-black hover:text-[#6A6AFF] transition-colors"
            >
              <span className="text-black">→ </span>
              <span className="text-[#6A6AFF] underline">info@gorkemkantar.com</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="md:mt-auto">
            <p className="font-inter text-xs uppercase text-black">
              © {currentYear} Görkem Kantar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
