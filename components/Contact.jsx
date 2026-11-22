"use client"
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- DATA (edit me) ----------------------------- */
const CONTACT = {
  name: "Fassam Khan",
  email: "muhammadfassam4@gmail.com",
  cv: "/fassamcv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Fassam-Khan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/fassamkhan/" },
  ],
};

const EASE = [0.22, 1, 0.36, 1];

/* -------------------------------- ICONS ---------------------------------- */
const Arrow = ({ className = "" }) => (
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
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Download = ({ className = "" }) => (
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

const CopyIcon = ({ className = "" }) => (
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
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="m5 12 5 5 9-10" />
  </svg>
);

/* ------------------------------ LINE REVEAL ------------------------------- */
const Line = ({ children, delay = 0, reduce, className = "" }) => (
  <span className="block overflow-hidden pb-2">
    <motion.span
      className={`block ${className}`}
      initial={{ y: reduce ? 0 : "110%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  </span>
);

/* -------------------------------- SECTION --------------------------------- */
const Contact = () => {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked: the mailto link still works
    }
  };

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay },
  });

  return (
    <section
      id="contact"
      className="relative max-w-[1100px] m-auto px-5 md:px-8 py-10  overflow-hidden"
    >
      {/* soft accent glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] md:h-[520px] md:w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.08] blur-3xl"
        animate={
          reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.06, 0.11, 0.06] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">
        {/* heading */}
        <motion.div className="mb-4" {...fade()}>
          <p className="text-sm text-[var(--accent)]">05 - Contact</p>
        </motion.div>

        {/* main title */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
          <Line reduce={reduce}>Let&apos;s build</Line>
          <Line reduce={reduce} delay={0.12} className="text-[var(--accent)]">
            something great.
          </Line>
        </h2>

        <motion.p
          className="mt-6 max-w-[52ch] text-base md:text-lg leading-relaxed text-white/65"
          {...fade(0.25)}
        >
          Have a role, a project or an idea in mind? Tell me what you need and
          when you need it, and I&apos;ll get back to you with next steps.
        </motion.p>

        {/* email + copy */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          {...fade(0.35)}
        >
          <a
            href={`mailto:${CONTACT.email}`}
            className="group relative text-xl sm:text-2xl md:text-3xl font-semibold break-all"
          >
            {CONTACT.email}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />
          </a>

          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="relative  inline-flex cursor-pointer h-10 min-w-10 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/15 px-3 text-sm text-white/70 transition-colors hover:border-[var(--accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1.5 text-[var(--accent)]"
                >
                  <CheckIcon className="h-4 w-4" />
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <CopyIcon className="h-4 w-4" />
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* actions */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          {...fade(0.45)}
        >
          <motion.a
            href={`mailto:${CONTACT.email}`}
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm md:text-base font-semibold text-black"
          >
            Let&apos;s talk
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          <motion.a
            href={CONTACT.cv}
            download
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm md:text-base text-white/85 transition-colors hover:border-white/40"
          >
            Download CV
            <Download className="h-4 w-4" />
          </motion.a>
        </motion.div>

        {/* socials */}
        <motion.ul
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6"
          {...fade(0.55)}
        >
          {CONTACT.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm md:text-base text-white/60 transition-colors hover:text-white"
              >
                {s.label}
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </motion.ul>

        {/* footer line */}
        <motion.p className="mt-10 text-xs text-white/35" {...fade(0.6)}>
          © {new Date().getFullYear()} {CONTACT.name} · Built with Next.js ·
          Motion · Tailwind
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;