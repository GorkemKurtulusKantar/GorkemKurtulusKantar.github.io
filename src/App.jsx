

import Background from './components/Background'
import GlareHover from './components/GlareHover'
import Navbar from './components/Navbar'
import Ribbons from './components/Ribbons'
import SpotlightCard from './components/SpotlightCard'
import './index.css'


function App() {
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
        <div className="text-center max-w-4xl mx-auto">

 
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16 ">
        <div className="max-w-6xl mx-auto text-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Hakkımızda
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Yaratıcılık ve teknolojiyi birleştirerek, kullanıcı deneyimini ön planda tutan 
              çözümler geliştiriyoruz. Modern web teknolojileri ile hayallerinizi gerçeğe dönüştürüyoruz.
            </p>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-16">
            Hizmetlerimiz
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <SpotlightCard>
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-bold text-white mb-4">Web Geliştirme</h3>
              <p className="text-gray-300">
                Modern ve responsive web siteleri geliştiriyoruz. React, Vue.js ve diğer 
                güncel teknolojileri kullanarak performanslı çözümler sunuyoruz.
              </p>
            </SpotlightCard>
            <SpotlightCard>
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-white mb-4">Mobil Uygulama</h3>
              <p className="text-gray-300">
                iOS ve Android platformları için native ve cross-platform mobil 
                uygulamalar geliştiriyoruz.
              </p>
            </SpotlightCard>
            <SpotlightCard>
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-4">UI/UX Tasarım</h3>
              <p className="text-gray-300">
                Kullanıcı deneyimini ön planda tutan, modern ve estetik tasarımlar 
                oluşturuyoruz.
              </p>
            </SpotlightCard>
 



   


          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16 ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-16">
            Projelerimiz
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg hover:bg-white/20 transition-colors">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-4">E-Ticaret Platformu</h3>
              <p className="text-gray-300">
                Modern ve kullanıcı dostu e-ticaret platformu. React ve Node.js ile geliştirildi.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg hover:bg-white/20 transition-colors">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">Dashboard Uygulaması</h3>
              <p className="text-gray-300">
                Veri analizi ve raporlama için gelişmiş dashboard uygulaması.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
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
