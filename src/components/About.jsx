import VariableProximity from "./VariableProximity";
import AnimatedIcons from "./AnimatedIcons";
import ScrollVelocity from "./ScrollVelocity";
import CurvedLoop from "./CurvedLoop";
import GlareHover from "./GlareHover";

const About = ({ servicesContainerRef }) => {
  return (
    <div className="max-w-4xl text-left flex flex-row">
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
        <div className="flex flex-col items-start justify-center gap-4 py-8">
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl ">
            I&apos;m a full‑stack developer who enjoys building end‑to‑end web
            applications with React, TypeScript, Node.js and Java. I care about
            clean, readable code and user interfaces that feel smooth and
            intuitive.
          </p>
          <p className="text-base text-gray-400 leading-relaxed max-w-3xl ">
            On GitHub I experiment with realtime features, mobile experiences
            and well‑structured APIs. I like taking new technologies, learning
            them quickly, and turning them into practical projects.
          </p>

          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.9}
            glareAngle={-45}
            glareSize={200}
            transitionDuration={900}
            playOnce={false}
          >
            <a
              href="/Gorkem_Kantar_CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-black/30 hover:bg-white/10 transition-colors"
            >
              Download CV
            </a>
          </GlareHover>
        </div>
      </div>
      <div className="ml-12">
        <AnimatedIcons />
      </div>
    </div>
  );
};

export default About;