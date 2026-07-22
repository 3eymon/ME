import HomeClientWrapper from "@/components/home/HomeClientWrapper";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mohsen Mousavi | Full-Stack Developer",
  description: `I am a highly skilled full-stack developer with expertise in modern frameworks like React and Next.js. 
    With extensive experience in TypeScript, Tailwind CSS, PostgreSQL, and Node.js, I specialize in building scalable and high-performance applications. 
    My deep understanding of UI/UX principles allows me to craft intuitive and visually appealing user experiences. 
    Additionally, I have a strong background in SEO, responsive design, and optimizing web applications for performance and accessibility. 
    Passionate about clean code and best practices, I am always eager to learn and implement the latest technologies to enhance development efficiency.`,
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Node.js",
    "UI/UX Design",
    "SEO Optimization",
    "Web Performance",
    "Frontend Development",
    "Backend Development",
    "Mohsen Mousavi",
    "3eymon",
  ],
  openGraph: {
    title: "Mohsen Mousavi | Full-Stack Developer",
    description: `I specialize in developing modern and scalable web applications using React, Next.js, TypeScript, and more.`,
    url: "https://xmohsen.vercel.app",
    siteName: "Mohsen Mousavi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohsen Mousavi | Full-Stack Developer",
    description: `Experienced full-stack developer skilled in React, Next.js, TypeScript, and backend technologies.`,
  },
  alternates: {
    canonical: "https://xmohsen.vercel.app",
  },
};
export default function Home() {
  return (
    <>
      <HomeClientWrapper />
    </>
  );
}
