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
              className="flex h-full w-full  flex-col overflow-hidden bg-white/20 dark:bg-neutral-900/30 backdrop-blur-md border border-white/20 dark:border-white/10   rounded-3xl shadow-2xl"            >
 

              <div className="flex-1 overflow-hidden">
                <div className="flex items-start justify-between p-6 text-start">
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      id={dialogLabelId}
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl font-bold text-neutral-800 text-neutral-100 mb-2 "
                    >
                      <span className="text-sm text-neutral-500 text-neutral-400">
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

                <div className="flex-1 px-6 pb-6 overflow-auto text-start">
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


// Project data
const cards = [
  {
    title: "Realtime Chat App",
    description: "WebSocket chat with rooms, typing indicators and persistence.",
    src: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200&auto=format&fit=crop&q=60",
    ctaText: "Live",
    ctaLink: "https://example.com/chat",
    githubLink: "https://github.com/yourname/realtime-chat",
    technologies: ["React", "Vite", "Socket.io", "Express", "Redis"],
    content: () => (
      <p>
        Full‑stack realtime messenger with public/private rooms, presence and message history.
        Optimistic UI and rate‑limited server endpoints.
      </p>
    ),
  },
  {
    title: "3D Product Viewer",
    description: "Configurable 3D viewer using Three.js and GLTF.",
    src: "https://images.unsplash.com/photo-1549921296-3b4a4f7f5f32?w=1200&auto=format&fit=crop&q=60",
    ctaText: "Demo",
    ctaLink: "https://example.com/3d-viewer",
    githubLink: "https://github.com/yourname/3d-product-viewer",
    technologies: ["React", "Three.js", "GLTF", "Tailwind"],
    content: () => (
      <p>
        Variant switching, dynamic materials and orbit controls, tuned with lazy loading
        and GPU instancing for smooth performance.
      </p>
    ),
  },
  {
    title: "Analytics Dashboard",
    description: "Aggregated metrics with charts and role‑based access.",
    src: "https://images.unsplash.com/photo-1551281044-8af2b9b66037?w=1200&auto=format&fit=crop&q=60",
    ctaText: "View",
    ctaLink: "https://example.com/analytics",
    githubLink: "https://github.com/yourname/analytics-dashboard",
    technologies: ["React", "PostgreSQL", "Prisma", "zod"],
    content: () => (
      <p>
        Multi‑tenant analytics with daily rollups, filters and CSV export. Charts are
        virtualized for large datasets.
      </p>
    ),
  },
  {
    title: "E‑commerce API",
    description: "Modular REST API with payments and webhooks.",
    src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&auto=format&fit=crop&q=60",
    ctaText: "Docs",
    ctaLink: "https://example.com/shop-api",
    githubLink: "https://github.com/yourname/ecommerce-api",
    technologies: ["Node.js", "Express", "Stripe", "JWT", "Jest"],
    content: () => (
      <p>
        Products, carts, checkout and Stripe payments. Signed webhooks and idempotent operations.
      </p>
    ),
  },
  {
    title: "Portfolio v2",
    description: "This site: motion effects, ribbons and 3D background.",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=60",
    ctaText: "Source",
    ctaLink: "https://github.com/yourname/portfolio-v2",
    githubLink: "https://github.com/yourname/portfolio-v2",
    technologies: ["React", "Framer Motion", "OGL", "Three.js", "Tailwind"],
    content: () => (
      <p>
        Custom ribbon shader, font‑variation proximity, and a GLTF planet path animation using rAF.
      </p>
    ),
  },
];
