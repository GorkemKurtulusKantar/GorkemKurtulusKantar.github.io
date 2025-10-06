import { motion } from "motion/react";
import React, { useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/UseOutsideClick";
import VariableProximity from "./VariableProximity";
import { ExternalLink, Github } from "lucide-react";
import Reveal from "./Reveal";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const dialogLabelId = active ? `dialog-title-${id}` : undefined;
  const dialogDescId = active ? `dialog-desc-${id}` : undefined;

  
  
  const containerRef = useRef(null);


  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left: Expanded card panel (in-flow on desktop, overlay on mobile) */}
      {active && (
        <Reveal>
        <div className="lg:contents">
          <div
            className="fixed inset-0 z-40   lg:hidden"
            onClick={() => setActive(null)}
            aria-hidden="true"
          />
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogLabelId}
            aria-describedby={dialogDescId}
            className="fixed inset-x-4 top-6 z-50 mx-auto w-auto max-w-md flex flex-col overflow-hidden bg-white dark:bg-black/90 rounded-2xl shadow-2xl
             border border-black/10 dark:border-white/10 lg:static lg:inset-auto lg:z-auto lg:mx-0 lg:top-auto lg:max-w-none lg:w-[520px] lg:flex-shrink-0 lg:rounded-3xl"
          >
          <div className="flex items-start justify-between p-6">
            <div className="flex-1 min-w-0">
              <h3 id={dialogLabelId} className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {active.title}
              </h3>
              <p id={dialogDescId} className="text-neutral-600 dark:text-neutral-300 mb-4">
                {active.description}
              </p>
            </div>

            <div className="flex gap-2 ml-4">
              {active.demoLink && (
                <a
                  href={active.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {active.githubLink && (
                <a
                  href={active.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-gray-800 hover:bg-gray-900 px-4 py-2 text-sm font-bold text-white transition-colors"
                >
                  <Github size={16} />
                  Code
                </a>
              )}
            </div>
          </div>

          <div className="px-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {active.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-200 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 px-6 pb-6 overflow-auto">
            <div
              className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
            >
              {typeof active.content === "function" ? active.content() : active.content}
            </div>
          </div>
          </div>
        </div>
        </Reveal>
      )}

      {/* Right: List */}
      <div className="flex-1">
        <ul className="w-full gap-4 ">
          {cards.map((card) => (
            <li key={`li-${card.title}-${id}`}>
              <motion.div
                onClick={() => setActive(card)}
                whileHover={{ x: 4 }}
                transition={{ type: "tween", duration: 0.15 }}
                className="flex cursor-pointer flex-col justify-between rounded-xl p-4"
              >
                <motion.div className="flex flex-col gap-4 md:flex-row" ref={containerRef} style={{position: 'relative'}}>
                  <VariableProximity
                    label={card.title}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef}
                    radius={100}
                    falloff='gaussian'
                    className="text-2xl text-white"
                  />
                </motion.div>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
      aria-hidden="true"
      focusable="false"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// Demo data (değiştirebilirsiniz)
const cards = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Lana Del Rey, an iconic American singer-songwriter, is celebrated for her melancholic and cinematic music style.
        Born Elizabeth Woolridge Grant in New York City, she has captivated audiences worldwide with her haunting voice
        and introspective lyrics. <br /> <br />
      </p>
    ),
    technologies: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    description: "Babbu Maan",
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Babu Maan, a legendary Punjabi singer, is renowned for his soulful voice and profound lyrics that resonate deeply
        with his audience. Born in the village of Khant Maanpur in Punjab, India, he has become a cultural icon in the
        Punjabi music industry. <br /> <br />

      </p>
    ),
    technologies: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],

  },
  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Metallica, an iconic American heavy metal band, is renowned for their powerful sound and intense performances that
        resonate deeply with their audience. Formed in Los Angeles, California, they have become a cultural icon in the heavy
        metal music industry. <br /> <br />

      </p>
    ),
    technologies: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Led Zeppelin, a legendary British rock band, is renowned for their innovative sound and profound impact on the music
        industry. Formed in London in 1968, they have become a cultural icon in the rock music world. <br /> <br />

      </p>
    ),
    technologies: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        "Aawarapan", a Bollywood movie starring Emraan Hashmi, is renowned for its intense storyline and powerful
        performances. Directed by Mohit Suri, the film has become a significant work in the Indian film industry. <br /> <br />
 
      </p>
    ),
    technologies: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
  },
];
