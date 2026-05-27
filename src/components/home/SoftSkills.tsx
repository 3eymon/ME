import { motion } from "framer-motion";

function SoftSkills() {
  return (
    <div className="flex gap-10">
      <div>
        <h2 className="text-xl font-semibold">Soft Skills</h2>
        <motion.ul
          initial={{ filter: "blur(6px)" }}
          whileInView={{ filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="list-inside list-disc space-y-1 text-base"
        >
          <li>Problem-solving mindset</li>
          <li>Quick and self-directed learner</li>
          <li>Team collaboration</li>
          <li>Attention to detail in design and UX</li>
          <li>Strong communication skills</li>
          <li>Time management and organization</li>
          <li>Continuous learning and adaptability</li>
        </motion.ul>
      </div>

      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold">Other</h2>
        <motion.ul
          initial={{ filter: "blur(6px)" }}
          whileInView={{ filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="list-inside list-disc space-y-1 text-base"
        >
          <li>SEO Basics (especially for Next.js)</li>
          <li>API Integration (e.g., Frankfurter API)</li>
          <li>3D in Web (exploring for personal website)</li>
          <li>English (reading documentation fluently)</li>
          <li>Photoshop (in progress – UI posters, banners)</li>
        </motion.ul>
      </div>
    </div>
  );
}

export default SoftSkills;
