import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faCode,
  faLaptopCode,
  faServer,
  faChartLine,
  faCogs,
  faMobileAlt,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export default function Timeline() {
  const timelineData = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Started learning HTML, CSS, JavaScript, and UI/UX design.",
      icon: faRocket,
    },
    {
      year: "2019",
      title: "Exploring Frameworks",
      description:
        "Learned React.js, Git & GitHub, and started collaborating on projects.",
      icon: faCode,
    },
    {
      year: "2020",
      title: "Real-World Projects",
      description:
        "Started working with Next.js, SSR & SSG, and optimized website performance.",
      icon: faLaptopCode,
    },
    {
      year: "2021",
      title: "Backend Development",
      description:
        "Learned Node.js, Express, PostgreSQL, and built REST APIs with authentication.",
      icon: faServer,
    },
    {
      year: "2022",
      title: "Scaling Up",
      description:
        "Built scalable websites, improved SEO, and worked on freelance projects.",
      icon: faChartLine,
    },
    {
      year: "2023",
      title: "Advanced Development",
      description: "Focused on UI/UX design, SEO optimization, and TypeScript.",
      icon: faCogs,
    },
    {
      year: "2024",
      title: "Current Focus",
      description:
        "Learning React Native for mobile app development, refactoring projects with TypeScript, and working on Sofreh Khaneh & Iran GameNet.",
      icon: faMobileAlt,
    },
    {
      year: "2025",
      title: "Future Goals",
      description:
        "Focus on mastering React Native, contribute to open-source projects, and continue refining backend architecture with TypeScript and PostgreSQL.",
      icon: faGlobe,
    },
  ];

  return (
    <div className="sticky ml-0 md:ml-12 xl:w-2/3">
      <div className="container mx-auto h-full w-full">
        <div className="wrap relative h-full overflow-hidden p-1 sm:p-5 lg:p-10">
          <div
            className="border-2-2 border-yellow-555 absolute h-full border"
            style={{
              right: "50%",
              border: "2px solid #FFF",
              borderRadius: "1%",
            }}
          ></div>
          <div
            className="border-2-2 border-yellow-555 absolute h-full border"
            style={{
              left: "50%",
              border: "2px solid #FFF",
              borderRadius: "1%",
            }}
          ></div>
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`mb-8 flex w-full ${index % 2 === 0 ? "flex-row-reverse" : ""} items-center justify-between`}
            >
              <div className="group/card relative order-1 flex h-full w-5/12 flex-col justify-between px-1 py-4 text-right">
                <div className="z-0">
                  <p className="mb-3 text-xs text-white/90 md:text-sm lg:text-base">
                    {item.year}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="-translate-y-7 rotate-6">
                      <div className="z-0 transform rounded bg-white/10 p-1 px-2 shadow-2xl shadow-white/15 backdrop-blur transition-all duration-500 ease-in-out group-hover/card:scale-110 group-hover/card:bg-white/30 group-hover/card:shadow-xl sm:rounded-lg sm:p-2 md:rounded-2xl md:p-4">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-sm text-white sm:text-lg md:text-2xl lg:text-3xl"
                        />
                      </div>
                    </div>
                    <h4 className="-pl-3 z-10 mb-3 text-sm font-bold sm:text-base md:text-xl lg:text-2xl">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[10px] leading-snug text-gray-50 text-opacity-100 sm:text-xs md:text-sm lg:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Image
          alt="About Seyed Mohsen Mousavi"
          width={350}
          height={150}
          className="mx-auto -mt-20 grayscale"
          src="/images/10259340_4401278.svg"
          loading="lazy"
        />
      </div>
    </div>
  );
}
