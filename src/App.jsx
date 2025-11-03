

import { useRef } from 'react'
import Background from './components/Background'
import CurveDemo from './components/CurveDemo'
import { ExpandableCardDemo } from './components/ExpandableCardDemo'
import Navbar from './components/Navbar'
import Reveal from './components/Reveal'
import Ribbons from './components/Ribbons'
import VariableProximity from './components/VariableProximity'
import Experience from './components/Experience'
import About from './components/About'
import Footer from './components/Footer'
import './index.css'

function App() {
  const heroContainerRef = useRef(null);
  const servicesContainerRef = useRef(null);

  return (
    <div className="relative overflow-hidden ">
      <Background />

      <Navbar />
      <Ribbons
        baseThickness={5}
        colors={['#754d45', "#284261", "#55a058"]}
        speedMultiplier={0.22}
        maxAge={250}
        enableShaderEffect={true}
      />

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8 mt-16">
        <Reveal>
          <div ref={heroContainerRef} className="text-center max-w-4xl mx-auto" style={{ position: 'relative' }}>
        
          </div>
        </Reveal>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 min-h-screen flex items-center justify-start px-12 py-16">
        <Reveal className='flex flex-col lg:flex-row w-full items-center justify-between'>
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
