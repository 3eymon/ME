import React, { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Links } from "../../types";
import { Tooltip } from "@heroui/react";
import * as THREE from "three";
import { gsap } from "gsap";

type HeroSectionsProps = { socialLinks: Links[] };

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let W = container.clientWidth;
    let H = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    const icoGeo2 = new THREE.IcosahedronGeometry(2.1, 1);
    const icoMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const ico2 = new THREE.Mesh(icoGeo2, icoMat2);
    scene.add(ico2);

    const dotGroup = new THREE.Group();
    const posAttr = icoGeo.attributes.position;
    const visited = new Set<string>();

    for (let i = 0; i < posAttr.count; i++) {
      const x = parseFloat(posAttr.getX(i).toFixed(4));
      const y = parseFloat(posAttr.getY(i).toFixed(4));
      const z = parseFloat(posAttr.getZ(i).toFixed(4));
      const key = `${x},${y},${z}`;
      if (visited.has(key)) continue;
      visited.add(key);

      const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      dotGroup.add(dot);
    }
    scene.add(dotGroup);

    const RING_COUNT = 120;
    const ringPositions = new Float32Array(RING_COUNT * 3);
    for (let i = 0; i < RING_COUNT; i++) {
      const angle = (i / RING_COUNT) * Math.PI * 2;
      const r = 2.55 + (Math.random() - 0.5) * 0.15;
      ringPositions[i * 3]     = Math.cos(angle) * r;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      ringPositions[i * 3 + 2] = Math.sin(angle) * r;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
    });
    const ring = new THREE.Points(ringGeo, ringMat);
    scene.add(ring);

    // ── GSAP entrance ─────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.4 });

    // scale in from 0
    ico.scale.setScalar(0);
    ico2.scale.setScalar(0);
    dotGroup.scale.setScalar(0);

    tl.to(ico.scale,      { x: 1, y: 1, z: 1, duration: 1.4, ease: "expo.out" });
    tl.to(icoMat,         { opacity: 0.55, duration: 1.4, ease: "power2.out" }, "<");
    tl.to(ico2.scale,     { x: 1, y: 1, z: 1, duration: 1.6, ease: "expo.out" }, "<0.15");
    tl.to(icoMat2,        { opacity: 0.12, duration: 1.6, ease: "power2.out" }, "<");
    tl.to(dotGroup.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "back.out(1.8)" }, "<0.3");
    dotGroup.children.forEach((d: any, i: number) => {
      tl.to(d.material, { opacity: 0.9, duration: 0.6, ease: "power2.out" }, `<${i * 0.012}`);
    });
    tl.to(ringMat, { opacity: 0.35, duration: 1.2, ease: "power2.out" }, "<0.2");

    // ── state ─────────────────────────────────────────────────
    const mouse   = { x: 0, y: 0 };     // -1..1 normalised
    const targetR = { x: 0, y: 0 };     // target rotation
    let   scrollY = 0;
    let   targetScroll = 0;

    const onMouse = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse.x =  ((e.clientX - r.left) / r.width  - 0.5) * 2;
      mouse.y = -((e.clientY - r.top)  / r.height - 0.5) * 2;
    };

    const onScroll = () => { targetScroll = window.scrollY; };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll",   onScroll, { passive: true });

    const clock = new THREE.Clock();
    let animId: number;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      scrollY += (targetScroll - scrollY) * 0.07;
      const scrollNorm = Math.min(scrollY / 600, 1); // 0..1

      // mouse → rotation target
      targetR.x += (mouse.y * 0.8 - targetR.x) * 0.05;
      targetR.y += (mouse.x * 0.8 - targetR.y) * 0.05;

      ico.rotation.x  = targetR.x + t * 0.07;
      ico.rotation.y  = targetR.y + t * 0.12;
      ico2.rotation.x = -targetR.x * 0.6 + t * 0.04;
      ico2.rotation.y =  targetR.y * 0.6 - t * 0.09;
      dotGroup.rotation.copy(ico.rotation);
      ring.rotation.y = t * 0.06;

      const distort = 1 + scrollNorm * 0.6;
      const squeeze = 1 - scrollNorm * 0.3;
      ico.scale.set(squeeze, distort, squeeze);
      ico2.scale.set(squeeze * 1.0, distort * 1.0, squeeze * 1.0);

      const fadeOut = Math.max(0, 1 - scrollNorm * 1.8);
      icoMat.opacity   = 0.55 * fadeOut;
      icoMat2.opacity  = 0.12 * fadeOut;
      ringMat.opacity  = 0.35 * fadeOut;
      dotGroup.children.forEach((d: any) => { d.material.opacity = 0.9 * fadeOut; });

      const pulse = 1 + Math.sin(t * 1.1) * 0.018;
      ico.scale.multiplyScalar(pulse);

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      W = container.clientWidth; H = container.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll",   onScroll);
      window.removeEventListener("resize",   onResize);
      tl.kill();
      renderer.dispose();
      icoGeo.dispose();  icoMat.dispose();
      icoGeo2.dispose(); icoMat2.dispose();
      ringGeo.dispose(); ringMat.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}

function HeroSections({ socialLinks }: HeroSectionsProps) {
  return (
    <section
      className="relative w-full font-mod"
      style={{ minHeight: "100vh", background: "#000" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
        className="hidden md:block"
      >
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, #000 0%, #000 5%, transparent 40%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to bottom, #000 0%, transparent 20%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to top, #000 0%, transparent 20%)",
        }} />
        <ThreeScene />
      </div>

      {/* text */}
      <motion.div
        className="relative flex min-h-screen flex-col justify-center px-8 py-20 md:px-16 lg:px-24"
        style={{ maxWidth: 620, zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants}
          className="mb-5 text-xs uppercase tracking-[0.35em] text-neutral-600"
        >
          Fullstack Developer · 3eymon
        </motion.p>

        <motion.h1 variants={itemVariants}
          className="text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Mohsen
          <br />
          <span className="font-bold text-white"
            style={{ textShadow: "0 0 80px rgba(255,255,255,0.15)" }}
          >
            Mousavi
          </span>
        </motion.h1>

        <motion.p variants={itemVariants}
          className="mt-7 max-w-sm text-sm leading-7 text-neutral-400 sm:text-base"
        >
          Building modern, scalable web apps with React, Next.js,
          Node.js, TypeScript, and PostgreSQL.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
          <a
            href="/Resume.pdf" target="_blank" rel="noopener noreferrer"
            className="rounded-full border border-neutral-800 px-5 py-2 text-sm tracking-wide text-neutral-300 transition hover:border-neutral-500 hover:text-white"
          >
            View Resume
          </a>
          <Tooltip content="just call me" placement="top">
            <a href="tel:09935071519"
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              Contact Me
            </a>
          </Tooltip>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 space-y-2 text-sm text-neutral-500">
          <div><span className="text-neutral-700">nickname —</span> 3eymon</div>
          <div><span className="text-neutral-700">role —</span> Fullstack Developer</div>
          <div><span className="text-neutral-700">stack —</span> React · Next.js · TS · Node · PostgreSQL</div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, href, label }: any) => (
            <motion.a
              key={href} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label || href}
              whileHover={{ y: -3, scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              className="text-neutral-600 transition hover:text-white"
            >
              <Icon className="size-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSections;
