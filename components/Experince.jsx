"use client"
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- DATA (edit me) ----------------------------- */
const experiences = [
  {
    role: "Data Entry",
    company: "Mehran Bottles Limited",
    location: "Karachi, Pakistan",
    period: "Sep 2026 — Present",
    points: [
        "Performed accurate data entry and maintained digital records.",
        "Used Microsoft Excel for entering, organizing, and updating data.",
        "Managed sales data and entered daily transactions into the sales system.",
        "Maintained customer and product information with attention to accuracy.",
        "Used Gatepass and basic computer tools for record management and daily tasks."
    ],
  },
  {
    role: "Wordpress Doveloper",
    company: "Techlinks Services",
    location: "Karachi, Pakistan",
    period: "Dec 2025 — Jan 2026",
    points: [
        "Developed and customized WordPress websites based on project requirements.",
        "Customized themes, layouts, pages, and website components using WordPress.",
        "Managed and updated website content, products, images, and categories.",
        "Worked with Elementor, WooCommerce, and WordPress plugins to add functionality."
    ],
  },

];

/* ------------------------------- ANIMATION -------------------------------- */
const EASE = [0.22, 1, 0.36, 1];

const makeVariants = (reduce) => ({
  item: {
    hidden: { opacity: 0, x: reduce ? 0 : -24 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduce ? 0 : 0.7,
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  },
  point: {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: EASE },
    },
  },
  dot: {
    hidden: { scale: 0 },
    show: {
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 18 },
    },
  },
});

/* ------------------------------- COMPONENT -------------------------------- */
const Experience = () => {
  const reduce = useReducedMotion();
  const v = makeVariants(reduce);

  // Scroll-linked timeline line
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="max-w-[1100px] m-auto px-5 md:px-8 py-16 md:py-24"
    >
      {/* heading */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, x: reduce ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <p className="text-sm text-[var(--accent)]">02 - Experience</p>
      </motion.div>

      {/* main title — slides up from behind a mask */}
      <div className="overflow-hidden pb-2 mb-12 md:mb-16">
        <motion.h2
          className="md:text-4xl text-3xl font-bold"
          initial={{ y: reduce ? 0 : "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
        >
          Where I&apos;ve shipped.
        </motion.h2>
      </div>

      {/* timeline */}
      <div ref={timelineRef} className="relative">
        {/* track */}
        <div
          aria-hidden
          className="absolute top-2 bottom-0 left-[7px] md:left-[204px] w-px bg-white/10"
        />
        {/* progress line (fills while scrolling) */}
        <motion.div
          aria-hidden
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute top-2 bottom-0 left-[7px] md:left-[204px] w-px bg-[var(--accent)]"
        />

        <ol className="space-y-12 md:space-y-16">
          {experiences.map((exp) => (
            <motion.li
              key={`${exp.company}-${exp.period}`}
              variants={v.item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="relative pl-9 md:pl-0 md:grid md:grid-cols-[180px_1fr] md:gap-x-12"
            >
              {/* dot */}
              <motion.span
                variants={v.dot}
                aria-hidden
                className="absolute top-[5px] left-[7px] md:left-[204px] -translate-x-1/2 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[#07070a]"
              />

              {/* date column */}
              <div className="mb-2 md:mb-0 md:text-right md:pt-0.5">
                <p className="text-sm text-white/50">{exp.period}</p>
              </div>

              {/* content */}
              <motion.div
                whileHover={reduce ? undefined : { x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold">
                  {exp.role}
                </h3>
                <p className="mt-1 text-sm md:text-base text-[var(--accent)]">
                  {exp.company}
                  <span className="text-white/40"> · {exp.location}</span>
                </p>

                <ul className="mt-5 space-y-3">
                  {exp.points.map((point, i) => (
                    <motion.li
                      key={i}
                      variants={v.point}
                      className="relative pl-5 text-sm md:text-base leading-relaxed text-white/70 max-w-[68ch]"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-[var(--accent)]"
                      />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;