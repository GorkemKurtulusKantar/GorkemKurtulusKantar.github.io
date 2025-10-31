import VariableProximity from "./VariableProximity"
import AnimatedIcons from "./AnimatedIcons"
import ScrollVelocity from "./ScrollVelocity"
import CurvedLoop from "./CurvedLoop"

const About = ({servicesContainerRef}) => {
    return (
          <div className="max-w-4xl  text-left flex flex-row">
            <div>
              <VariableProximity
                label="Görkem Kurtuluş Kantar"
                fromFontVariationSettings="'wght' 400, 'opsz' 14"
                toFontVariationSettings="'wght' 800, 'opsz' 60"
                containerRef={servicesContainerRef}
                radius={100}
                falloff="gaussian"
                className="text-5xl md:text-6xl font-bold text-white mb-16 block "
              />
              <div className='flex flex-col items-center justify-center gap-4 py-8'>
                <p className="text-xl text-gray-300 leading-relaxed max-w-3xl ">
                  Yaratıcılık ve teknolojiyi birleştirerek, kullanıcı deneyimini ön planda tutan
                  çözümler geliştiriyoruz. Modern web teknolojileri ile hayallerinizi gerçeğe dönüştürüyoruz.
                </p>
              </div>
    
            </div>
            <div className='ml-12'>


                <AnimatedIcons />
              </div>

          </div>
    )
}
export default About