"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- DATA (edit me) ----------------------------- */
const CV_PATH = "/fassamcv.pdf";

const techChips = [
  { label: "React", pos: "top-6 -left-10", delay: 0, depth: 1.4 },
  { label: "Next.js", pos: "top-1/3 -right-12", delay: 0.6, depth: 1.8 },
  { label: "Node.js", pos: "bottom-16 -left-14", delay: 1.2, depth: 1.2 },
  { label: "MongoDB", pos: "-bottom-1 right-6", delay: 1.8, depth: 1.6 },
];

const EASE = [0.22, 1, 0.36, 1];

/* -------------------------------- ICONS ---------------------------------- */
const ArrowDown = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M12 5v14m0 0 6-6m-6 6-6-6" />
  </svg>
);

const DownloadIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" />
  </svg>
);

/* ----------------------------- HEADLINE LINE ------------------------------ */
// each line slides up from behind a mask
const Line = ({ children, delay, reduce }) => (
  <span className="block overflow-hidden pb-1 md:pb-2">
    <motion.span
      className="block"
      initial={{ y: reduce ? 0 : "115%", rotate: reduce ? 0 : 3 }}
      animate={{ y: 0, rotate: 0 }}
      transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  </span>
);

/* --------------------------------- HERO ----------------------------------- */
const Hero = () => {
  const reduce = useReducedMotion();

  /* mouse parallax (desktop) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  const avatarX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const avatarY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const glowX = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const glowY = useTransform(sy, [-0.5, 0.5], [30, -30]);

  const handleMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const scrollTo = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.8, ease: EASE, delay },
  });

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      className="relative overflow-hidden pt-24 pb-20 md:min-h-[680px] md:pt-32 md:pb-24
        bg-[#0f0715]
        bg-[radial-gradient(circle_at_50%_0%,rgba(188,252,88,0.08),transparent_35%)]
        before:absolute before:inset-0
        before:bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
        before:bg-[size:45px_45px]
        before:[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]
        before:pointer-events-none"
    >
      {/* drifting glow blobs */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#BCFC58] opacity-[0.07] blur-3xl"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#7AEDB0] opacity-[0.07] blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative z-10 m-auto flex max-w-[1100px] flex-col items-center justify-center gap-10 px-4 md:flex-row md:justify-between md:px-8">
        {/* ------------------------------ left ------------------------------ */}
        <div className="md:w-[62%]">
          {/* availability badge */}
          <motion.div
            {...fade(0.1)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BCFC58] opacity-70" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#BCFC58]" />
            </span>
            Available for new opportunities
          </motion.div>

          {/* headline */}
          <h1 className="text-4xl font-bold leading-[1.08] text-gray-300 md:text-[72px]">
            <Line reduce={reduce} delay={0.2}>
              Building fast,
            </Line>
            <Line reduce={reduce} delay={0.32}>
              <motion.span
                className="inline-block bg-gradient-to-r from-[#BCFC58] via-[#7AEDB0] to-[#BCFC58] bg-[length:200%_auto] bg-clip-text text-transparent"
                animate={
                  reduce
                    ? undefined
                    : { backgroundPosition: ["0% 50%", "200% 50%"] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                scalable web
              </motion.span>
            </Line>
            <Line reduce={reduce} delay={0.44}>
              products.
            </Line>
          </h1>

          {/* intro */}
          <motion.p
            {...fade(0.7)}
            className="mt-6 max-w-[58ch] text-sm leading-relaxed text-[var(--muted)] md:text-lg"
          >
            I&apos;m{" "}
            <span className="font-medium text-white">Muhammad Fassam Khan</span>{" "}
            — a Full Stack Developer &amp; Team Lead building MERN and Next.js
            applications across e-commerce, business platforms, and modern web
            experiences.
          </motion.p>

          {/* actions */}
          <motion.div
            {...fade(0.85)}
            className="mt-8 flex flex-wrap items-center gap-3 md:gap-4"
          >
            <motion.a
              href="#work"
              onClick={(e) => scrollTo(e, "work")}
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#BCFC58] to-[#7AEDB0] px-5 py-2.5 text-sm font-semibold text-black md:px-6 md:py-3"
            >
              {/* shine */}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 w-8 -skew-x-12 bg-white/50"
                  initial={{ x: "-200%" }}
                  animate={{ x: "700%" }}
                  transition={{
                    duration: 1.3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              )}
              <span className="relative">View my work</span>
              <ArrowDown className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => scrollTo(e, "contact")}
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="rounded-full border border-[var(--muted)] bg-[#0000008a] px-5 py-2.5 text-sm font-medium transition-colors hover:border-white/60 md:px-6 md:py-3"
            >
              Get in touch
            </motion.a>

            <motion.a
              href={CV_PATH}
              download
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white md:py-3"
            >
              Download CV
              <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </motion.a>
          </motion.div>
        </div>

        {/* ------------------------------ right ----------------------------- */}
        <motion.div
          className="relative hidden w-fit md:block"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 1, ease: EASE, delay: 0.4 }}
        >
          {/* parallax glow */}
          <motion.div
            aria-hidden
            style={{ x: glowX, y: glowY }}
            className="absolute -inset-8 rounded-full bg-gradient-to-r from-[#BCFC58] to-[#7AEDB0] opacity-25 blur-3xl"
          />

          {/* floating avatar */}
          <motion.div
            style={{ x: avatarX, y: avatarY }}
            className="relative w-fit"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-fit"
            >
              {/* spinning gradient ring */}
              <div className="relative overflow-hidden rounded-full p-[3px]">
                <motion.div
                  aria-hidden
                  className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,#BCFC58,#7AEDB0,transparent_40%,#BCFC58)]"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative overflow-hidden rounded-full bg-[#0f0715]">
                  <Image
                    src="/my2.png"
                    width={350}
                    height={350}
                    priority
                    alt="Fassam"
                    className="block aspect-square h-[350px] w-[350px] rounded-full object-cover"
                  />
                </div>
              </div>

              {/* orbiting tech chips */}
              {techChips.map((chip) => (
                <motion.div
                  key={chip.label}
                  className={`absolute ${chip.pos}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                    delay: 1.1 + chip.delay * 0.3,
                  }}
                >
                  <motion.span
                    animate={reduce ? undefined : { y: [0, -8, 0] }}
                    transition={{
                      duration: 2.6 + chip.depth,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: chip.delay,
                    }}
                    className="block rounded-full border border-white/15 bg-[#0f0715]/80 px-3.5 py-1.5 text-xs font-medium text-white/90 shadow-lg backdrop-blur"
                  >
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#BCFC58]" />
                    {chip.label}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        onClick={(e) => scrollTo(e, "about")}
        aria-label="Scroll to About"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/40 transition-colors hover:text-white/80 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        Scroll
        <span className="flex h-8 w-5 justify-center rounded-full border border-white/25 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-[#BCFC58]"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
};

export default Hero;