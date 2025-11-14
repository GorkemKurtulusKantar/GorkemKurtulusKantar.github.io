import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/UseOutsideClick";
import VariableProximity from "./VariableProximity";
import { Github } from "lucide-react";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();
  

  useEffect(() => {
    function onKeyDown() {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
  
   
    if (typeof window !== "undefined") {
      if (active && typeof active === "object" && window.innerWidth < 1024) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const dialogLabelId = active ? `dialog-title-${id}` : undefined;
  const dialogDescId = active ? `dialog-desc-${id}` : undefined;

  
  
  const containerRef = useRef(null);


  return (
    <div className="py-6">
      {/* Backdrop */}
      <AnimatePresence>
        {active ? (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
            className="absolute inset-0 z-10 h-full w-full max-[1080px]:bg-stone-900/95 rounded-3xl"
            onClick={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>

      {/* Dialog / Expanded card */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[100] flex justify-end pe-[50%] max-[1080px]:pe-0  overflow-visible ">           



            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogLabelId}
              aria-describedby={dialogDescId}
              className="flex h-full w-full flex-col overflow-hidden bg-neutral-900 rounded-3xl shadow-2xl"
            >
 

              <div className="flex-1 overflow-hidden">
                <div className="flex items-start justify-between p-6 text-start">
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      id={dialogLabelId}
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl font-bold text-neutral-50 mb-2"
                    >
                      <span className="text-sm text-neutral-400">
                        {active.title}
                      </span>
                    </motion.h3>
                    <motion.p
                      id={dialogDescId}
                      layoutId={`description-${active.description}-${id}`}
                      className="text-sm text-neutral-300 mb-4"
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
                        className="px-3 py-1 text-xs font-medium   bg-gray-700 text-gray-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>

                <div className="flex-1 px-6 pb-6 overflow-auto text-start">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-neutral-300 leading-relaxed
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
      <ul className=" w-full  ">
        {cards.map((card) => (
          <li key={`li-${card.title}-${id}`}>
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="flex cursor-pointer flex-col justify-between rounded-xl p-4 md:flex-row md:justify-end "
            >
                <motion.div className="flex flex-col md:flex-row "  ref={containerRef}
style={{position: 'relative'}} >
                <VariableProximity
                  label={card.title}  
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={containerRef}
                  radius={100}
                  falloff='gaussian'
                  className="text-3xl my-4s "
                  disabled={!!active}
                />

              </motion.div>

    
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}


// Project data (from https://github.com/Enissimu?tab=repositories)
const cards = [
  {
    title: "Fullstack Blog",
    description:
      "Fullstack blog app with React, Express and MongoDB, deployed with CI/CD.",
    src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=60",
    ctaText: "Source",
    ctaLink: "https://github.com/Enissimu/Fullstack-Blog",
    githubLink: "https://github.com/Enissimu/Fullstack-Blog",
    technologies: ["React", "Express", "MongoDB", "React Query", "CI/CD"],
    content: () => (
      <p>
        Blog platform built with the MERN stack, featuring React Query, routing,
        and automated deployment pipeline.
      </p>
    ),
  },
  {
    title: "Patients Typescript",
    description: "Full‑stack TypeScript application for managing patient data.",
    src: "https://images.unsplash.com/photo-1535916707207-35f97e715e1b?w=1200&auto=format&fit=crop&q=60",
    ctaText: "Source",
    ctaLink: "https://github.com/Enissimu/Patients-Typescript",
    githubLink: "https://github.com/Enissimu/Patients-Typescript",
    technologies: ["TypeScript", "Node.js", "React"],
    content: () => (
      <p>
        End‑to‑end TypeScript project covering backend and frontend, focused on
        typed APIs and patient records.
      </p>
    ),
  },
  {
    title: "Twitter Word Blocker",
    description:
      "Chrome extension that blocks Twitter accounts containing words you choose.",
    src: "https://images.unsplash.com/photo-1517260911058-0fcfd733702f?w=1200&auto=format&fit=crop&q=60",
    ctaText: "Source",
    ctaLink: "https://github.com/Enissimu/TwitterWordBlocker",
    githubLink: "https://github.com/Enissimu/TwitterWordBlocker",
    technologies: ["JavaScript", "Chrome Extension"],
    content: () => (
      <p>
        Browser extension to curate your Twitter timeline by automatically
        blocking accounts whose bios or names contain unwanted words.
      </p>
    ),
  },
  {
    title: "Native Repo App",
    description: "React Native app for browsing GitHub repositories.",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=60",
    ctaText: "Source",
    ctaLink: "https://github.com/Enissimu/Native-Repo-App",
    githubLink: "https://github.com/Enissimu/Native-Repo-App",
    technologies: ["React Native", "Expo", "GitHub API"],
    content: () => (
      <p>
        Mobile client built with React Native and Expo to explore GitHub
        repositories, experiment with list views and API integration.
      </p>
    ),
  },
];
