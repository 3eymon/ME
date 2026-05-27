import { Project } from "../../types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLink, BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { FaGitAlt, FaNode, FaReact } from "react-icons/fa";
import { GiArmoredBoomerang } from "react-icons/gi";
import { RiRoadMapLine, RiTailwindCssFill } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";

const projects: Project[] = [
  {
    id: 1,
    name: "App.GoldenCheat",
    link: "https://app.goldencheat.ir/",
    image: "/images/p-golden.jpg",
    technologies: [
      { icon: <SiNextdotjs className="size-5" />, name: "Next.js" },
      { icon: <FaNode className="size-7" />, name: "Node.js" },
      { icon: <RiTailwindCssFill className="size-5" />, name: "Tailwind CSS" },
      { icon: <FaGitAlt className="size-5" />, name: "Git" },
    ],
    description:
      "A complete and complex project with an admin panel, dashboard pages for users, and excellent responsiveness.",
    challenges: `Bilingual site, Google login and registration,
  Modern design of the chat page for ticketing, and handling various user interactions.`,
  },
  {
    id: 2,
    name: "MovieLife",
    link: "https://movielife.ir/",
    image: "/images/p-movielife.jpg",
    technologies: [
      { icon: <SiNextdotjs className="size-5" />, name: "Next.js" },
      { icon: <FaNode className="size-7" />, name: "Node.js" },
      { icon: <BiLogoPostgresql className="size-5" />, name: "PostgreSQL" },
      { icon: <BiLogoTypescript className="size-6" />, name: "TypeScript" },
      { icon: <RiTailwindCssFill className="size-5" />, name: "Tailwind CSS" },
    ],
    description:
      "A dynamic movie site with a modern UI, supporting data fetching and advanced search features.",
    challenges: `Optimizing performance, implementing search and filtering, and integrating movie databases with responsive design.`,
  },
  {
    id: 3,
    name: "IRAN Hotels",
    link: "http://iranhotels.xseyed.ir/",
    image: "/images/p-iranhotels.jpg",
    technologies: [
      { icon: <FaReact className="size-5" />, name: "React" },
      { icon: <RiTailwindCssFill className="size-5" />, name: "Tailwind CSS" },
      { icon: <FaGitAlt className="size-5" />, name: "Git" },
      { icon: <RiRoadMapLine className="size-5" />, name: "Roadmap" },
    ],
    description:
      "A hotel booking platform showcasing various accommodations with a clean and user-friendly interface.",
    challenges: `Implementing hotel filtering, responsive layout, and map integration.`,
  },
  {
    id: 4,
    name: "Rick And Morty",
    link: "https://seyed-mohsen-mousavi.github.io/Rick-Morty/",
    image: "/images/p-rick.jpg",
    technologies: [
      { icon: <FaReact className="size-5" />, name: "React" },
      { icon: <RiTailwindCssFill className="size-5" />, name: "Tailwind CSS" },
      { icon: <FaGitAlt className="size-5" />, name: "Git" },
    ],
    description:
      "A fun project to explore Rick and Morty characters using an open API, featuring character details and filtering.",
    challenges: `Fetching data from the Rick and Morty API and implementing a simple and responsive UI.`,
  },
  {
    id: 5,
    name: "Meh Gap",
    link: "http://mehgap.xseyed.ir/",
    image: "/images/p-meh_gap.avif",
    technologies: [
      { icon: <SiNextdotjs className="size-5" />, name: "Netx.js" },
      { icon: <RiTailwindCssFill className="size-5" />, name: "Tailwind CSS" },
      { icon: <FaGitAlt className="size-5" />, name: "Git" },
    ],
    description:
      "It is a lightweight, fast, and secure messenger with a crystal-clear design and minimal user interface. *open You can see this project on my GitHub",
    challenges: `Upload file audio recorder full dynamic beauti responsive .`,
  },
];

export default function Projects({
  projectsRef,
}: {
  projectsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div ref={projectsRef} id="projects" className="flex flex-col">
      <h2 className="head-text my-10">Projects</h2>
      <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {displayedProjects.map((project: Project, index: number) => (
          <div
            onClick={() => {
              setSelected(project);
              onOpen();
            }}
            key={index}
            className="group relative sm:max-w-96"
          >
            <div
              style={{
                textShadow: "-25px -0px 50px rgba(255, 255, 255, 0.7)",
              }}
              className="font-mod text-lg font-bold text-neutral-100"
            >
              {project.name}
            </div>
            <div>
              <Image
                unoptimized
                src={project.image}
                alt={project.name}
                width={200}
                height={300}
                loading="lazy"
                className="mt-1.5 aspect-video h-52 w-full rounded-2xl object-cover object-top shadow-[-3px_20px_0px_0px_rgb(255,_255,_255)] transition-all duration-500 ease-linear hover:object-bottom group-hover:grayscale-[0.5] sm:w-96"
              />
            </div>
            <div className="absolute -bottom-4 left-3 flex w-full p-3">
              <span className="flex items-center gap-4 rounded-t-xl bg-white px-4 py-1.5 text-black backdrop-blur-md">
                {project.technologies.map((tech, i) => (
                  <span key={i} title={tech?.name}>
                    {tech?.icon}
                  </span>
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
      {projects.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mx-auto flex items-center gap-2 rounded-xl border px-5 py-3 font-mod text-lg font-semibold text-white ring-1 ring-white/15 transition-all ease-in-out hover:ring-4 active:ring-8"
        >
          {showAll ? "Show Less" : "See More"}{" "}
          <GiArmoredBoomerang className="size-6" />
        </button>
      )}
      <Modal
        className="relative w-screen border border-zinc-400/50 backdrop-blur-sm sm:w-auto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <Image
                fill
                unoptimized
                loading="lazy"
                src={selected?.image ? selected?.image : ""}
                alt={selected?.name ? selected?.name : "Project"}
                className="z-0 mt-1.5 w-full rounded-2xl object-cover opacity-50 blur-md brightness-50 transition-all duration-500 ease-linear"
              />
              <ModalHeader className="z-10">
                <h2 className="text-xl font-bold">{selected?.name}</h2>
              </ModalHeader>
              <ModalBody className="z-10">
                <h3 className="font-mod text-lg font-semibold">Description</h3>
                <p>
                  {selected?.description ||
                    "A brief description of the project and its main features."}
                </p>
                <h3 className="z-0 font-mod text-lg font-semibold">
                  Challenges
                </h3>
                <p className="mb-2">
                  {selected?.challenges ||
                    "This project had various technical and design challenges that were overcome."}
                </p>
                <h3 className="font-mod text-lg font-semibold">Technologies</h3>
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  {selected?.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      title={tech.name}
                      className="flex items-center gap-1"
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                {selected?.link && (
                  <Link
                    href={selected?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-10 flex items-center gap-2 rounded-xl border px-4 py-3 font-mod text-sm font-semibold ring-1 ring-white/15 transition-all ease-in-out hover:ring-4 active:ring-8"
                  >
                    Visit Site
                    <BiLink className="size-5" />
                  </Link>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
