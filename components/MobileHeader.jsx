"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- DATA (edit me) ----------------------------- */
const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const EASE = [0.22, 1, 0.36, 1];

const MobileHeader = () => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /* hide on scroll down, show on scroll up */
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > prev && y > 140 && !open);
    if (y < 120) setActive(null);
  });

  /* scroll-spy */
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

  /* Escape closes menu, page doesn't scroll behind it */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    // wait a tick so body scroll-lock is released before scrolling
    setTimeout(() => {
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", `#${id}`);
      setActive(id);
    }, 50);
  };

  const goTop = (e) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header className="md:hidden fixed inset-x-0 top-0 z-50 px-3 pt-2 pointer-events-none">
      {/* backdrop */}
      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: reduce ? 0 : -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        className="pointer-events-auto relative"
      >
        {/* bar */}
        <div
          className={`relative flex items-center justify-between gap-2 overflow-hidden rounded-full border py-1 pl-1 pr-1.5 transition-all duration-300 ${
            scrolled || open
              ? "border-white/15 bg-black/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
              : "border-[var(--muted)] bg-black/20 backdrop-blur-md"
          }`}
        >
          {/* avatar + name */}
          <a
            href="#top"
            onClick={goTop}
            className="flex min-w-0 items-center gap-2"
            aria-label="Back to top"
          >
            <motion.div
              whileTap={reduce ? undefined : { scale: 0.92, rotate: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent)]"
            >
              <Image
                src="/my2.png"
                alt="Fassam Khan"
                width={45}
                height={45}
                priority
                className="rounded-full object-cover"
              />
              {/* live dot */}
              <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                )}
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-black bg-[var(--accent)]" />
              </span>
            </motion.div>

            <motion.div
              className="min-w-0 leading-tight"
              initial={{ opacity: 0, x: reduce ? 0 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            >
              <p className="truncate text-sm font-medium">M. Fassam Khan</p>
              <p className="truncate text-[11px] font-semibold tracking-wide text-[var(--accent)]">
                Full Stack Developer
              </p>
            </motion.div>
          </a>

          {/* actions */}
          <div className="flex shrink-0 items-center gap-1.5">
            <motion.a
              href="#contact"
              onClick={(e) => goTo(e, "contact")}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
                delay: 0.5,
              }}
              className="relative overflow-hidden rounded-full bg-[var(--accent)] px-3.5 py-2 text-xs font-semibold text-black"
            >
              {/* shimmer */}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 w-6 -skew-x-12 bg-white/50"
                  initial={{ x: "-150%" }}
                  animate={{ x: "600%" }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3.5,
                  }}
                />
              )}
              <span className="relative">Hire me</span>
            </motion.a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-header-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 h-0.5 w-full rounded bg-white"
                  animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute left-0 top-[5px] h-0.5 w-full rounded bg-white"
                  animate={{ opacity: open ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="absolute left-0 h-0.5 w-full rounded bg-white"
                  animate={
                    open ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>
          </div>

          {/* progress */}
          <motion.span
            aria-hidden
            style={{ scaleX: progress, transformOrigin: "left" }}
            className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--accent)]"
          />
        </div>

        {/* dropdown */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-header-menu"
              aria-label="Mobile"
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-3xl border border-white/15 bg-black/85 p-2 backdrop-blur-xl"
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
                        aria-current={isActive ? "true" : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-medium transition-colors active:bg-white/10 ${
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

export default MobileHeader;