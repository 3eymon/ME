import { RefObject } from "react";
import Timeline from "../TimeLine";
import { motion } from "framer-motion";
import Link from "next/link";

function AboutMe({ aboutRef }: { aboutRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={aboutRef} id="about">
      <h2 className="head-text my-10">About ME</h2>
      <section>
        <div className="py-8 text-white">
          <div className="mx-auto my-12 flex flex-col items-start xl:my-24 xl:flex-row">
            <div className="sticky mt-2 flex w-full flex-col xl:top-36 xl:mt-12 xl:w-1/3">
              <div className="flex w-full flex-col items-start justify-center">
                <h1 className="tracking-loose py-2 font-mod text-3xl font-bold md:text-4xl">
                  *Actions speak louder than words
                </h1>
                <h2 className="mb-2 text-xl leading-relaxed sm:text-2xl md:leading-snug">
                  Full-stack Developer & UI/UX Designer
                </h2>
                <p className="mb-4 text-sm text-gray-50 md:text-base">
                  I specialize in creating seamless digital experiences by
                  combining modern UI designs with robust backend solutions.
                  Explore my portfolio to see how I bring creativity and
                  technology together.
                </p>
                <Link
                  href={"/#projects"}
                  className="magnet flex items-center gap-2 rounded-xl border px-5 py-3 font-mod text-lg font-semibold text-white ring-1 ring-white/15 transition-all ease-in-out hover:ring-4 active:ring-8"
                >
                  View My Work
                </Link>
              </div>
            </div>
            <Timeline />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5 text-sm text-neutral-400 md:flex-row md:text-lg">
        <motion.p
          initial={{ filter: "blur(6px)" }}
          whileInView={{ filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl"
          viewport={{ once: true }}
        >
          a{" "}
          <span className="font-semibold text-neutral-200">
            full-stack developer
          </span>{" "}
          passionate about{" "}
          <span className="font-semibold text-neutral-200">
            modern UI design
          </span>{" "}
          and{" "}
          <span className="font-semibold text-neutral-200">
            backend optimization
          </span>
          , dedicated to crafting{" "}
          <span className="font-semibold text-neutral-200">
            smooth user experiences
          </span>{" "}
          that just feel right.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(6px)" }}
          whileInView={{ filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          I am passionate about exploring new{" "}
          <span className="font-semibold text-neutral-200">technologies</span>,
          enhancing{" "}
          <span className="font-semibold text-neutral-200">SEO strategies</span>
          , and improving{" "}
          <span className="font-semibold text-neutral-200">
            user interactions
          </span>
          . My work is fueled by{" "}
          <span className="font-semibold text-neutral-200">creativity</span>,{" "}
          <span className="font-semibold text-neutral-200">
            problem-solving
          </span>
          , and a strong dedication to{" "}
          <span className="font-semibold text-neutral-200">
            continuous learning
          </span>
          . Currently, I am working on{" "}
          <span className="font-semibold text-neutral-200">Sofreh Khaneh</span>,
          a Persian movie and poetry platform where I combine my technical
          skills with{" "}
          <span className="font-semibold text-neutral-200">
            artistic vision
          </span>{" "}
          to create{" "}
          <span className="font-semibold text-neutral-200">
            meaningful digital experiences
          </span>
          .
        </motion.p>
      </section>
    </div>
  );
}

export default AboutMe;
