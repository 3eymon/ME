"use client";
import React, { useRef } from "react";
import {
  RiTelegram2Fill,
  RiTailwindCssFill,
  RiMoneyPoundBoxLine,
} from "react-icons/ri";
import {
  FaGithub,
  FaLinkedinIn,
  FaReact,
  FaNode,
  FaGitAlt,
  FaPython,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiAdobephotoshop,
  SiMongodb,
  SiNestjs,
  SiNginx,
  SiMysql,
  SiExpo,
} from "react-icons/si";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { SiExpress } from "react-icons/si";
import { LiaDocker } from "react-icons/lia";
import { Links } from "@/types";
import SoftSkills from "./SoftSkills";
import dynamic from "next/dynamic";

const Skills = dynamic(() => import("@/components/home/Skills"), {
  ssr: false,
});
import AboutMe from "./AboutMe";
import HeroSections from "./HeroSections";
import Navbar from "../Navbar";
import Link from "next/link";
import Projects from "./Projects";
const skillData = [
  { icon: FaReact, value: 85 },
  { icon: SiNextdotjs, value: 98 },
  { icon: SiNestjs, value: 80 },
  { icon: BiLogoTypescript, value: 100 },
  { icon: BiLogoPostgresql, value: 90 },
  { icon: SiMysql, value: 70 },
  { icon: SiMongodb, value: 100 },
  { icon: FaNode, value: 90 },
  { icon: SiExpress, value: 95 },
  { icon: FaGitAlt, value: 88 },
  { icon: RiTailwindCssFill, value: 100 },
  { icon: LiaDocker, value: 50 },
  { icon: SiNginx, value: 50 },
  { icon: SiExpo, value: 95 },
  { icon: FaPython, value: 20 },
];
const socialLinks: Links[] = [
  { icon: RiTelegram2Fill, href: "https://t.me/XSeyed" },
  { icon: FaGithub, href: "https://github.com/3eymon" },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/seyed-mohsen-840941277/",
  },
];
function HomeClientWrapper() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const scrollToSection = (section: string) => {
    switch (section) {
      case "about":
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "skills":
        skillsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "projects":
        projectsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };
  return (
    <>
      <header>
        <Navbar scrollToSection={scrollToSection} />
      </header>
      <div className="flex flex-col gap-20">
        <HeroSections socialLinks={socialLinks} />
        <hr className="shadow-2xl shadow-white blur-sm" />
        {/* About Me */}
        <AboutMe aboutRef={aboutRef} />
        {/* Skills */}
        <Skills skillsRef={skillsRef} skillData={skillData} />
        <SoftSkills />
        {/* Projects */}
        <Projects projectsRef={projectsRef} />
        <hr className="-mb-5 shadow-2xl shadow-white blur-sm" />
        <footer className="mx-auto mb-10 font-mod sm:!mb-4">
          <span className="tetxt-sm text-neutral-400">
            For more information, call me at:{" "}
          </span>
          <Link href="tel:09935071519">+98-9935071519</Link>
        </footer>
      </div>
    </>
  );
}

export default HomeClientWrapper;
