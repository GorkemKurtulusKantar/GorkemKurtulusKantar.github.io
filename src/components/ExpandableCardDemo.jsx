import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/UseOutsideClick";
import VariableProximity from "./VariableProximity";


export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
    };

    // Body scroll kilitleme (modal açıkken)
    const prevOverflow = document.body.style.overflow;
    if (active) document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow || "auto";
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const dialogLabelId = active ? `dialog-title-${id}` : undefined;
  const dialogDescId = active ? `dialog-desc-${id}` : undefined;

  
  
  const containerRef = useRef(null);


  return (
    <div>
      {/* Backdrop */}
      <AnimatePresence>
        {active ? (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
            className="fixed inset-0 z-10 h-full w-full"
            onClick={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>

      {/* Dialog / Expanded card */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white  lg:hidden"
              aria-label="Close dialog"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>


  <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogLabelId}
              aria-describedby={dialogDescId}
              className="flex h-full w-full max-w-[600px] flex-col overflow-hidden bg-black md:h-fit md:max-h-[90%] sm:rounded-3xl shadow-2xl"
            >
 

              <div className="flex-1 overflow-hidden">
                <div className="flex items-start justify-between p-6">
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      id={dialogLabelId}
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2"
                    >
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {active.title}
                      </span>
                    </motion.h3>
                    <motion.p
                      id={dialogDescId}
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 mb-4"
                    >
                      {active.description}
                    </motion.p>
     
                  </div>

                  <div className="flex gap-2 ml-4">
                    {active.demoLink && (
                      <motion.a
                        layoutId={`demo-button-${active.title}-${id}`}
                        href={active.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    )}
                    {active.githubLink && (
                      <motion.a
                        layoutId={`github-button-${active.title}-${id}`}
                        href={active.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full bg-gray-800 hover:bg-gray-900 px-4 py-2 text-sm font-bold text-white transition-colors"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="px-6">
                  <motion.div
                    layoutId={`technologies-${active.title}-${id}`}
                    className="flex flex-wrap gap-2 mb-6"
                  >
                    {active.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>

                <div className="flex-1 px-6 pb-6 overflow-auto">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed
                               [mask:linear-gradient(to_bottom,white_80%,transparent)]
                               [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        ) : null}
      </AnimatePresence>

      {/* List */}
      <ul className="mx-auto w-full max-w-2xl gap-4">
        {cards.map((card) => (
          <li key={`li-${card.title}-${id}`}>
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="flex cursor-pointer flex-col justify-between rounded-xl p-4 md:flex-row md:justify-end"
            >
                <motion.div className="flex flex-col gap-4 md:flex-row "  ref={containerRef}
style={{position: 'relative'}} >
                <VariableProximity
                  label={card.title}  
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={containerRef}
                  radius={100}
                  falloff='gaussian'
                  className="text-2xl "
                />

              </motion.div>

    
            </motion.div>
          </li>
        ))}
      </ul>
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
