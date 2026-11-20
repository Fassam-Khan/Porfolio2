"use client"
import React from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- DATA (edit me) -----------------------------
   Repos come from https://github.com/Fassam-Khan.
   Descriptions are inferred from each repo's structure — rewrite them with
   what you actually built. Add `live` (deployed URL) and `image`
   (screenshot path, e.g. "/projects/daraz2.png") when you have them.
-------------------------------------------------------------------------- */
const projects = [
  {
    title: "Daraz2",
    subtitle: "E-commerce marketplace",
    description:
      "A Daraz-inspired online marketplace built with the Next.js App Router, a data-model layer and a reusable shadcn/ui component library.",
    tags: ["Next.js", "shadcn/ui", "Tailwind CSS"],
    repo: "https://github.com/Fassam-Khan/Daraz2",
    live: "",
    image: "",
    featured: true,
  },
  {
    title: "Ecommerce",
    subtitle: "Full-stack online store",
    description:
      "A full-stack store on the Next.js App Router with server-side data models, shared components and a Tailwind-styled storefront.",
    tags: ["Next.js", "Tailwind CSS", "App Router"],
    repo: "https://github.com/Fassam-Khan/ecommerce-",
    live: "",
    image: "",
  },
  {
    title: "Blogging Website",
    subtitle: "Blog platform",
    description:
      "A React and Vite blogging site with a clean reading experience, configured for one-click deployment on Vercel.",
    tags: ["React", "Vite", "Vercel"],
    repo: "https://github.com/Fassam-Khan/Blogging-website",
    live: "",
    image: "",
  },
  {
    title: "Blog 2",
    subtitle: "Blog front end, second iteration",
    description:
      "A rebuilt blog front end on React and Vite with a leaner structure and Vercel-ready routing.",
    tags: ["React", "Vite", "Vercel"],
    repo: "https://github.com/Fassam-Khan/Blog-2",
    live: "",
    image: "",
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* -------------------------------- ICONS ---------------------------------- */
const ArrowUpRight = ({ className = "" }) => (
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

const GithubIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

/* ------------------------------ PREVIEW ART ------------------------------- */
// Shown when no screenshot is provided: a mini browser window with the name.
const Preview = ({ project, reduce }) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] aspect-[16/10] md:aspect-auto md:h-full md:min-h-[260px]">
    <motion.div
      className="absolute inset-0"
      whileHover={undefined}
      variants={{
        rest: { scale: 1 },
        hover: { scale: reduce ? 1 : 1.06 },
      }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      ) : (
        <div className="relative h-full w-full bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent">
          {/* browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 h-4 w-1/3 rounded-full bg-white/10" />
          </div>
          {/* big name */}
          <div className="absolute inset-0 top-10 flex items-center justify-center px-6">
            <span className="select-none text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/10">
              {project.title}
            </span>
          </div>
          {/* accent glow */}
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[var(--accent)] opacity-20 blur-3xl" />
        </div>
      )}
    </motion.div>
  </div>
);

/* ------------------------------ PROJECT CARD ------------------------------ */
const ProjectCard = ({ project, index, reduce }) => {
  // cursor-following spotlight
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(255,255,255,0.07), transparent 70%)`;

  const handleMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const href = project.live || project.repo;
  const featured = project.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0 : 0.7,
        ease: EASE,
        delay: reduce ? 0 : (index % 2) * 0.1,
      }}
      className={featured ? "md:col-span-2" : ""}
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        onMouseMove={handleMove}
        className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 transition-colors duration-300 hover:border-white/25 ${
          featured ? "md:grid md:grid-cols-2 md:gap-8 md:p-6" : "flex flex-col"
        }`}
      >
        {/* spotlight */}
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* preview */}
        <div className={featured ? "relative" : "relative mb-5"}>
          <Preview project={project} reduce={reduce} />
        </div>

        {/* content */}
        <div
          className={`relative flex flex-col ${
            featured ? "md:justify-center md:py-4" : "flex-1"
          }`}
        >
          <p className="text-sm text-[var(--accent)]">{project.subtitle}</p>

          <h3
            className={`mt-1 font-semibold ${
              featured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
            }`}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded"
            >
              {project.title}
              <motion.span
                variants={{
                  rest: { x: 0, y: 0 },
                  hover: { x: reduce ? 0 : 3, y: reduce ? 0 : -3 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex"
              >
                <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-white/60" />
              </motion.span>
              {/* stretch link over whole card */}
              <span aria-hidden className="absolute inset-0 z-10" />
            </a>
          </h3>

          <p className="mt-3 text-sm md:text-base leading-relaxed text-white/65 max-w-[60ch]">
            {project.description}
          </p>

          {/* tags */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* links */}
          <div className="relative z-20 mt-6 flex flex-wrap items-center gap-5 text-sm">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline underline-offset-4"
              >
                Live site
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              Source code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

/* -------------------------------- SECTION --------------------------------- */
const Work = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
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
        <p className="text-sm text-[var(--accent)]">03 - Work</p>
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
          Things I&apos;ve built.
        </motion.h2>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.repo}
            project={project}
            index={i}
            reduce={reduce}
          />
        ))}
      </div>

      {/* more on GitHub */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.6, delay: 0.1 }}
      >
        <a
          href="https://github.com/Fassam-Khan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 hover:border-[var(--accent)] hover:text-white transition-colors"
        >
          <GithubIcon className="h-4 w-4" />
          See all repositories on GitHub
        </a>
      </motion.div>
    </section>
  );
};

export default Work;