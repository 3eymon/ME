import React from "react";
import { motion } from "framer-motion";
import { Links } from "../../types";

function HeroSections({ socialLinks }: { socialLinks: Links[] }) {
  return (
    <>
      {/* Header */}
      <div className="mx-auto flex w-full items-center justify-center py-28 font-mod sm:py-0 md:pl-20">
        <motion.h1
          className="flex items-center text-2xl font-semibold transition-all ease-linear sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
          initial={{ filter: "blur(20px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          S.MOHSEN
          <motion.span
            className="px-2 text-6xl font-bold md:px-1 md:text-9xl lg:px-0 lg:text-[18rem] 2xl:text-[22rem]"
            style={{ textShadow: "0 0 50px rgba(255, 255, 255, 0.7)" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          >
            7
          </motion.span>
          DEVELOPER
        </motion.h1>
      </div>
      {/* Introduction Section */}
      <div className="flex w-full flex-col items-center justify-between sm:flex-row">
        <motion.div
          className="max-w-sm"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-6 text-xs text-neutral-500 md:text-sm">
            I am a full-stack developer with expertise in modern frameworks like
            React and Next.js. I have extensive experience working with various
            tools and technologies, including TypeScript, Tailwind CSS,
            PostgreSQL, and Node.js. My ability to create engaging and efficient
            user experiences, particularly with UI/UX design principles, allows
            me to develop complex projects effectively and efficiently.
          </p>

          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="m-2 text-sm tracking-widest text-neutral-300 sm:text-base"
          >
            View My Resume(persian)
          </a>
        </motion.div>

        <motion.div
          className="max-w-sm text-right hidden sm:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="m-2 text-sm tracking-widest text-neutral-300 sm:text-base "
          >
            View My Resume(persian)
          </a>
          <p className="mt-6 text-xs text-neutral-500 md:text-sm">
            I am a full-stack developer with expertise in modern frameworks like
            React and Next.js. I have extensive experience working with various
            tools and technologies, including TypeScript, Tailwind CSS.
          </p>
        </motion.div>
      </div>
      {/* Social Links */}
      <motion.div
        className="flex w-full items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-8">
          {socialLinks.map(({ icon: Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon className="size-6" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default HeroSections;
