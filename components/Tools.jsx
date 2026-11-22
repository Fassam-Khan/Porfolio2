"use client"
import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- DATA (edit me) -----------------------------
   Categories and items follow the reference portfolio. Replace them with
   your own stack.
-------------------------------------------------------------------------- */
const marqueeTop = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Tailwind",
  "OpenAI",
  "Gemini",
  "GitHub Actions",
  "Vite",
  "Firebase"
];

const marqueeBottom = [...marqueeTop].reverse();

const categories = {
  Frontend: [
    "JavaScript",
    "React",
    "Next.js",
    "Vite",
    "Tailwind CSS",
    "Shadcn UI",
    "Material UI",
    "Bootstrap",
    "HTML5",
    "CSS3",
  ],
  Backend: ["Node.js", "Express", "REST APIs", "JWT Auth"],
  Databases: ["MongoDB",  "Firebase"],
  "Cloud & DevOps": [
    "GitHub Actions",
    "Vercel",
    "Netlify",
  ],
  Integrations: [
    "Twilio",
    "Google Maps",
    "Google Sign-In",
    "OpenAI API",
    "Gemini API",
  ],
  Practices: [
    "Code Review",
    "Git Workflows",
    "Core Web Vitals",
    "On-page SEO",
    "JSON-LD",
    "Mentoring",
  ],
};

const EASE = [0.22, 1, 0.36, 1];

/* -------------------------------- MARQUEE --------------------------------
   Seamless infinite scroll driven by useAnimationFrame so it can pause on
   hover and run in either direction.
-------------------------------------------------------------------------- */
const Marquee = ({ items, direction = 1, speed = 40, reduce }) => {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const paused = useRef(false);

  // 2 halves, each holding the list repeated twice → always wider than screen
  const half = [...items, ...items];
  const loop = [...half, ...half];

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current || !trackRef.current) return;
    const w = trackRef.current.scrollWidth / 2;
    if (!w) return;
    let next = x.get() + direction * -1 * speed * (delta / 1000);
    if (next <= -w) next += w;
    if (next > 0) next -= w;
    x.set(next);
  });

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => (paused.current = false)}
    >
      <motion.ul
        ref={trackRef}
        style={{ x }}
        className="flex w-max gap-3 py-1"
      >
        {loop.map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= items.length ? true : undefined}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm md:text-base text-white/80 transition-colors hover:border-[var(--accent)] hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {name}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

/* --------------------------------- TOOLS ---------------------------------- */
const Tools = () => {
  const reduce = useReducedMotion();
  const tabs = Object.keys(categories);
  const [active, setActive] = useState(tabs[0]);

  return (
    <section
      id="skills"
      className="max-w-[1100px] m-auto px-5 md:px-8 py-10 "
    >
      {/* heading */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, x: reduce ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <p className="text-sm text-[var(--accent)]">04 - Toolkit</p>
      </motion.div>

      {/* main title */}
      <div className="overflow-hidden pb-2 mb-10 md:mb-14">
        <motion.h2
          className="md:text-4xl text-3xl font-bold"
          initial={{ y: reduce ? 0 : "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
        >
          Tools I reach for.
        </motion.h2>
      </div>

      {/* marquees (opposite directions) */}
      <motion.div
        className="space-y-3 mb-12 md:mb-16 -mx-5 md:mx-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
      >
        <Marquee items={marqueeTop} direction={1} speed={40} reduce={reduce} />
        <Marquee
          items={marqueeBottom}
          direction={-1}
          speed={32}
          reduce={reduce}
        />
      </motion.div>

      {/* category tabs */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      >
        <div
          role="tablist"
          aria-label="Tool categories"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab)}
                className={`relative shrink-0 rounded-full cursor-pointer px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  isActive ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tools-active-pill"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 32 }
                    }
                    className="absolute inset-0 rounded-full border border-[var(--accent)] bg-white/[0.06]"
                  />
                )}
                <span className="relative">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* active category items */}
        <div className="mt-8 min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              role="tabpanel"
              className="flex flex-wrap gap-3"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: reduce ? 0 : 0.04 },
                },
                exit: { transition: { staggerChildren: 0 } },
              }}
            >
              {categories[active].map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 14, scale: 0.96 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: reduce ? 0 : 0.4, ease: EASE },
                    },
                    exit: { opacity: 0, transition: { duration: 0.12 } },
                  }}
                  whileHover={reduce ? undefined : { y: -3 }}
                  className="rounded-xl cursor-pointer border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm md:text-base text-white/85 hover:border-white/30 transition-colors"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Tools;