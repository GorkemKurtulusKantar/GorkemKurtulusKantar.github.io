

import { useRef } from 'react'
import Background from './components/Background'
import CurveDemo from './components/CurveDemo'
import { ExpandableCardDemo } from './components/ExpandableCardDemo'
import GlareHover from './components/GlareHover'
import Navbar from './components/Navbar'
import Reveal from './components/Reveal'
import Ribbons from './components/Ribbons'
import VariableProximity from './components/VariableProximity'
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
    colors={['#754d45',"#284261","#55a058"]}
    speedMultiplier={0.44}
    maxAge={500}

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
      <section id="about" className="relative z-10 min-h-screen flex items-center justify-start px-4 py-16">
        <Reveal>
        <div className="max-w-4xl ml-8 text-left">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Hakkımızda
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              Yaratıcılık ve teknolojiyi birleştirerek, kullanıcı deneyimini ön planda tutan 
              çözümler geliştiriyoruz. Modern web teknolojileri ile hayallerinizi gerçeğe dönüştürüyoruz.
            </p>
          </div>

        </div>
        </Reveal>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 min-h-screen  flex items-center justify-center md:justify-end px-4 py-16">
        <Reveal className='w-2/3 px-4'>
          <div ref={servicesContainerRef} className="  text-end  max-w-7xl" >
            <VariableProximity
              label="Projects"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 800, 'opsz' 60"
              containerRef={servicesContainerRef}
              radius={100}
              falloff="gaussian"
              className="text-5xl md:text-6xl font-bold text-white mb-16 block"
            />
            <ExpandableCardDemo />
          </div>
        </Reveal>
      </section>


      {/* Curve Editor Section */}
      <section id="curve-editor" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <Reveal>
        <CurveDemo />
        </Reveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <Reveal>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            İletişim
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Projeleriniz hakkında konuşmak ister misiniz? Bizimle iletişime geçin!
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Bize Ulaşın</h3>
              <p className="text-gray-300 mb-4">info@sirororo.com</p>
              <p className="text-gray-300 mb-4">+90 555 123 4567</p>
              <p className="text-gray-300">İstanbul, Türkiye</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Sosyal Medya</h3>
              <div className="flex justify-center space-x-4">
                <GlareHover glareColor="#3e98a3" glareOpacity={0.9}>
                  <button className="text-2xl">📘</button>
                </GlareHover>
                <GlareHover glareColor="#3e98a3" glareOpacity={0.9}>
                  <button className="text-2xl">📷</button>
                </GlareHover>
                <GlareHover glareColor="#3e98a3" glareOpacity={0.9}>
                  <button className="text-2xl">🐦</button>
                </GlareHover>
                <GlareHover glareColor="#3e98a3" glareOpacity={0.9}>
                  <button className="text-2xl">💼</button>
                </GlareHover>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-md py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Şirororo. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default App
