import React from "react";
import { motion, type Variants } from "framer-motion";
import { Links } from "../../types";
import { Tooltip } from "@heroui/react";

type HeroSectionsProps = {
  socialLinks: Links[];
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

function HeroSections({ socialLinks }: HeroSectionsProps) {
  return (
    <section className="w-full font-mod">
      <motion.div
        className="mx-auto flex min-h-[80vh] flex-col justify-center px-6 py-20 "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-12 flex flex-col items-center text-center md:items-start md:text-left"
          variants={itemVariants}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Fullstack Developer · 3eymon
          </p>

          <h1 className="text-4xl font-semibold leading-none sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem]">
            Mohsen <br />
            <span
              className="font-bold text-white"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.35)" }}
            >
              Mousavi
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">
            I’m Mohsen Mousavi, also known as 3eymon — a fullstack developer
            focused on building modern, scalable, and user-friendly web
            applications with React, Next.js, Node.js, TypeScript, and
            PostgreSQL.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <motion.div variants={itemVariants} className="max-w-xl">
            <p className="text-sm leading-7 text-neutral-500 sm:text-base">
              I enjoy crafting clean interfaces, performant backend systems, and
              thoughtful user experiences. My work blends development with UI
              sensibility to create products that are both functional and
              engaging.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-700 px-5 py-2 text-sm tracking-wide text-neutral-200 transition hover:border-neutral-400 hover:text-white"
              >
                View Resume
              </a>
              <Tooltip content="just call me" placement="top">
                <a
                  href="tel:09935071519"
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
                >
                  Contact Me
                </a>
              </Tooltip>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 text-sm text-neutral-400 md:items-end md:text-right"
          >
            <div>
              <span className="text-neutral-500">Nickname:</span> 3eymon
            </div>
            <div>
              <span className="text-neutral-500">Role:</span> Fullstack
              Developer
            </div>
            <div>
              <span className="text-neutral-500">Stack:</span> React, Next.js,
              TypeScript, Node.js, PostgreSQL
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-14 flex items-center justify-center md:justify-start"
        >
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label } : any) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label || href}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="text-neutral-400 transition hover:text-white"
              >
                <Icon className="size-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSections;
