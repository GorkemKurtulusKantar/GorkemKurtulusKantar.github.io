import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { ExpandableCardDemo } from './components/ExpandableCardDemo'
import Navbar from './components/Navbar'
import Reveal from './components/Reveal'
import Ribbons from './components/Ribbons'
import VariableProximity from './components/VariableProximity'
import Experience from './components/Experience'
import About from './components/About'
import Footer from './components/Footer'
import { COLORS } from './constants/colors'
import './index.css'

const FiberContainer = lazy(() =>
  import('./components/canvas/FiberContainer').then((mod) => ({
    default: mod.FiberContainer,
  })),
)

function App() {
  const heroContainerRef = useRef(null);
  const servicesContainerRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const navEntries = performance.getEntriesByType && performance.getEntriesByType('navigation');
    const nav = navEntries && navEntries[0];
    const isReload = nav && nav.type === 'reload';
    if (isReload) {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      setShowScrollHint(y < 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = [
      { id: 'home', title: 'Görkem Kurtuluş Kantar — Portfolio' },
      { id: 'about', title: 'About — Görkem Kurtuluş Kantar' },
      { id: 'projects', title: 'Projects — Görkem Kurtuluş Kantar' },
      { id: 'contact', title: 'Contact — Görkem Kurtuluş Kantar' },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        let topMost = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topMost || entry.intersectionRatio > topMost.intersectionRatio) {
              topMost = entry;
            }
          }
        });
        if (topMost?.target?.id) {
          const match = sections.find((s) => s.id === topMost.target.id);
          if (match) document.title = match.title;
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    // initial
    document.title = sections[0].title;
    return () => observer.disconnect();
  }, []);
  return (
    <div className="relative overflow-hidden ">
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <Suspense fallback={null}>
          <FiberContainer />
        </Suspense>
      </div>

      <Navbar />
      <Ribbons
        baseThickness={5}
        colors={COLORS.ribbonColors}
        speedMultiplier={0.22}
        maxAge={250}
        enableShaderEffect={true}
      />

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-end px-4 pb-18 overflow-hidden">
        <div id="stars" className="pointer-events-none"></div>
        <div id="stars2" className="pointer-events-none"></div>
        <div id="stars3" className="pointer-events-none"></div>

        <Reveal >

          <div ref={heroContainerRef} className="max-w-4xl mx-auto" >

            <div
              id="section05"
              className={`transition-opacity duration-700 ${showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <a href="#about" className='text-4xl'><span></span>Scroll</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 min-h-screen flex items-center justify-start px-12 py-16">
        <Reveal className='flex flex-col lg:flex-row w-full items-center justify-between gap-6 lg:gap-0'>
          <About servicesContainerRef={servicesContainerRef} />
          <Experience />
        </Reveal>
      </section>





      {/* Services Section */}
      <section id="projects" className="relative z-10 min-h-screen  flex items-center justify-center md:justify-end px-12 py-16">
        <Reveal className='w-2/3 px-4'>
          <div ref={servicesContainerRef} className="  text-end " >
            <div >
            <VariableProximity
              label="Projects"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 800, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              className="text-5xl md:text-6xl font-bold text-white mb-16 block p-4"
            />
            </div>
            <div>
            <ExpandableCardDemo />

            </div>

          </div>
        </Reveal>
      </section>



      {/* Curve Editor Section
      <section id="curve-editor" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <Reveal>
          <CurveDemo />
        </Reveal>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-[70vh] flex justify-between items-end px-4 py-2 ">
          <Footer />
      </section>

    </div>
  )
}

export default App
