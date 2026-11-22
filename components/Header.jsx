"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- DATA (edit me) -----------------------------
   Each `id` must match an id on its section:
   <section id="about">, "experience", "work", "skills", "contact".
-------------------------------------------------------------------------- */
const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const EASE = [0.22, 1, 0.36, 1];

const Header = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* scroll progress bar + "scrolled" state */
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    if (y < 120) setActive(null);
  });

  /* scroll-spy: highlight the section in the middle of the screen */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 120) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* close mobile menu with Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  const goTop = (e) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", window.location.pathname);
  };

  const highlight = hovered ?? active;

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 pointer-events-none">
      {/* click-away backdrop for mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm md:hidden pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: reduce ? 0 : -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: 0.2 }}
        className="pointer-events-auto relative w-full md:w-fit max-w-[calc(100vw-1.5rem)]"
      >
        {/* pill */}
        <div
          className={`relative flex items-center justify-between md:justify-center gap-2 md:gap-6 overflow-hidden rounded-full border pr-2 md:pr-6 transition-all duration-300 ${
            scrolled
              ? "border-white/15 bg-black/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              : "border-[var(--muted)] bg-black/20 backdrop-blur-md"
          }`}
        >
          {/* avatar */}
          <motion.a
            href="#top"
            onClick={goTop}
            aria-label="Back to top"
            whileHover={reduce ? undefined : { rotate: -6, scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent)]"
          >
            <Image
              src="/my2.png"
              alt="Fassam Khan"
              width={55}
              height={55}
              priority
              className="rounded-full object-cover"
            />
            {/* live status dot */}
            <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              )}
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-black bg-[var(--accent)]" />
            </span>
          </motion.a>

          {/* name (mobile only) */}
          <span className="md:hidden mr-auto pl-1 text-sm font-semibold text-white/90">
            Fassam Khan
          </span>

          {/* desktop nav */}
          <nav className="hidden md:flex" aria-label="Primary">
            <ul
              className="flex items-center gap-1"
              onMouseLeave={() => setHovered(null)}
            >
              {links.map(({ id, label }, i) => {
                const isActive = active === id;
                const isHighlighted = highlight === id;
                return (
                  <motion.li
                    key={id}
                    className="relative"
                    initial={{ opacity: 0, y: reduce ? 0 : -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      ease: EASE,
                      delay: reduce ? 0 : 0.5 + i * 0.07,
                    }}
                    onMouseEnter={() => setHovered(id)}
                  >
                    {isHighlighted && (
                      <motion.span
                        layoutId="header-pill"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 400, damping: 32 }
                        }
                        className="absolute inset-0 rounded-full bg-white/10"
                      />
                    )}
                    <a
                      href={`#${id}`}
                      onClick={(e) => goTo(e, id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block rounded-full px-4 py-2 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                        isHighlighted
                          ? "text-white"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {label}
                      {isActive && (
                        <motion.span
                          layoutId="header-dot"
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 400, damping: 30 }
                          }
                          className="absolute left-1/2 bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)]"
                        />
                      )}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden relative mr-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <span className="relative block h-3.5 w-5">
              <motion.span
                className="absolute left-0 h-0.5 w-full rounded bg-white"
                animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute left-0 top-[6px] h-0.5 w-full rounded bg-white"
                animate={{ opacity: open ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="absolute left-0 h-0.5 w-full rounded bg-white"
                animate={
                  open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }
                }
                transition={{ duration: 0.25 }}
              />
            </span>
          </button>

          {/* scroll progress */}
          <motion.span
            aria-hidden
            style={{ scaleX: progress, transformOrigin: "left" }}
            className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--accent)]"
          />
        </div>

        {/* mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              className="md:hidden absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-3xl border border-white/15 bg-black/80 p-2 backdrop-blur-xl"
              initial={{ opacity: 0, y: reduce ? 0 : -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <ul>
                {links.map(({ id, label }, i) => {
                  const isActive = active === id;
                  return (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, x: reduce ? 0 : -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: EASE,
                        delay: reduce ? 0 : 0.05 + i * 0.05,
                      }}
                    >
                      <a
                        href={`#${id}`}
                        onClick={(e) => goTo(e, id)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-medium transition-colors hover:bg-white/5 ${
                          isActive ? "text-white" : "text-[var(--muted)]"
                        }`}
                      >
                        <span>{label}</span>
                        <span className="flex items-center gap-2 text-xs text-white/30">
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                          )}
                          0{i + 1}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;