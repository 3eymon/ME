import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

export default function Navbar({
  scrollToSection,
}: {
  scrollToSection: (section: string) => void;
}) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsNavbarVisible(rect.top >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`static z-10 flex w-full flex-row-reverse items-center justify-between py-2 py-8`}
      >
        <ul className="flex items-center gap-10 text-sm sm:text-base">
          <motion.li
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <Link href={"/blog"}>Blog</Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <button onClick={() => scrollToSection("about")}>About</button>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <button onClick={() => scrollToSection("skills")}>Skills</button>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
          >
            <button onClick={() => scrollToSection("projects")}>
              Projects
            </button>
          </motion.li>
        </ul>
        <motion.a
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          href={"https://github.com/seyed-mohsen-mousavi/ME"}
          className="give-star group !rounded-full !p-2 sm:!p-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="size-5 sm:size-6" />
        </motion.a>
      </nav>

      <AnimatePresence>
        {!isNavbarVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Link
              href={"https://github.com/seyed-mohsen-mousavi/ME"}
              className="give-star group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Give a star</span>
              <FaGithub className="group-hover: size-6" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
