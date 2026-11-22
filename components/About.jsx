"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- DATA (edit me) ----------------------------- */
const TITLE = "Frontend Developer | Aspiring Full-Stack Developer";

const focus = ["React.js", "Next.js", "JavaScript", "Tailwind CSS"];
const learning = ["REST APIs", "Firebase", "MongoDB"];

const education = {
  degree: "Inter Computer Science",
  school: "Govt PECHS Education Foundation Science College",
  period: "2024 - 2026",
  note: "I completed my Intermediate in Computer Science with 60% marks.",
};

const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------- CHIP GROUP ------------------------------- */
const ChipGroup = ({ title, items, reduce, delay = 0 }) => (
  <div>
    <motion.p
      className="mb-3 text-xs uppercase tracking-widest text-white/40"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {title}
    </motion.p>
    <motion.ul
      className="flex flex-wrap gap-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : 0.07,
            delayChildren: delay,
          },
        },
      }}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 14, scale: 0.9 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: reduce ? 0 : 0.45, ease: EASE },
            },
          }}
          whileHover={reduce ? undefined : { y: -3 }}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/85 transition-colors hover:border-[var(--accent)]"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  </div>
);

/* ---------------------------- EDUCATION CARD ------------------------------ */
const EducationCard = ({ reduce }) => {
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgba(188,252,88,0.10), transparent 70%)`;

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      initial={{ opacity: 0, x: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--muted)] bg-[#00000041] px-5 py-5 md:px-6 md:py-6 transition-colors hover:border-white/30"
    >
      {/* cursor spotlight */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex flex-col gap-5">
        <p className="text-sm font-semibold text-[var(--accent)]">Education</p>

        {/* timeline row */}
        <div className="relative pl-5">
          <span
            aria-hidden
            className="absolute left-0 top-1.5 flex h-2.5 w-2.5"
          >
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          </span>
          <motion.span
            aria-hidden
            className="absolute left-[4px] top-5 bottom-0 w-px origin-top bg-white/15"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.8, delay: 0.3 }}
          />

          <p className="text-sm font-semibold text-[var(--muted)]">
            {education.degree}
          </p>
          <p className="mt-1 leading-snug">{education.school}</p>
          <span className="mt-3 inline-block rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]">
            {education.period}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {education.note}
        </p>
      </div>
    </motion.div>
  );
};

/* --------------------------------- ABOUT ---------------------------------- */
const About = () => {
  const reduce = useReducedMotion();
  const words = TITLE.split(" ");

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay },
  });

  const Key = ({ children }) => (
    <span className="font-medium text-white">{children}</span>
  );

  return (
    <section
      id="about"
      className="m-auto max-w-[1100px] scroll-mt-24 px-5 py-16 md:px-8 md:py-24 md:flex md:justify-between md:gap-10"
    >
      {/* ------------------------------ left ------------------------------ */}
      <div className="flex flex-col gap-3 md:block md:w-[68%]">
        {/* heading */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: reduce ? 0 : -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        >
          <p className="text-sm text-[var(--accent)]">01 - ABOUT</p>
        </motion.div>

        {/* main title, word by word */}
        <h2 className="flex flex-wrap gap-x-[0.28em] text-3xl font-bold md:text-4xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1">
              <motion.span
                className="inline-block"
                initial={{ y: reduce ? 0 : "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduce ? 0 : 0.7,
                  ease: EASE,
                  delay: reduce ? 0 : i * 0.07,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* mobile image */}
        <motion.div className="mt-4 md:hidden" {...fade(0.1)}>
          <motion.div
            animate={reduce ? undefined : { y: [0, -15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-fit"
          >
            {/* soft glow */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#BCFC58] to-[#7AEDB0] opacity-40 blur-2xl" />

            {/* spinning gradient border */}
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
                  width={300}
                  height={300}
                  alt="Fassam"
                  className="block aspect-square h-[260px] w-[260px] rounded-full object-cover sm:h-[300px] sm:w-[300px]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* description */}
        <motion.p
          className="mt-6 max-w-[62ch] text-sm leading-relaxed text-white/70 md:text-lg"
          {...fade(0.15)}
        >
          I&rsquo;m a Frontend Developer passionate about creating modern,
          responsive, and user-friendly web applications. I specialize in{" "}
          <Key>React.js</Key>, <Key>Next.js</Key>, <Key>JavaScript</Key>,{" "}
          <Key>Tailwind CSS</Key>, and modern UI technologies, while also
          building my knowledge of backend development with APIs, Firebase, and
          MongoDB. I&rsquo;m always learning, building, and improving my skills
          to grow as a Full-Stack Developer.
        </motion.p>

        {/* what I use / learning */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <ChipGroup
            title="What I specialize in"
            items={focus}
            reduce={reduce}
            delay={0.1}
          />
          <ChipGroup
            title="Currently learning"
            items={learning}
            reduce={reduce}
            delay={0.25}
          />
        </div>
      </div>

      {/* ------------------------------ right ----------------------------- */}
      <div className="mt-10 md:mt-4 md:w-[300px] md:shrink-0 md:self-start md:sticky md:top-28">
        <EducationCard reduce={reduce} />
      </div>
    </section>
  );
};

export default About;