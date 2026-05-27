"use client"
import { CircularProgress } from "@heroui/react";
import React, { RefObject } from "react";
interface Skill {
  icon: React.ElementType;
  value: number;
}
function Skills({
  skillsRef,
  skillData,
}: {
  skillsRef: RefObject<HTMLDivElement | null>;
  skillData: Skill[];
}) {
  return (
    <div ref={skillsRef} id="skills">
      <h2 className="head-text my-10">Skills</h2>
      <div className="grid grid-cols-2 place-items-center gap-20 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
        {skillData.map(({ icon: Icon, value }, index) => (
          <div className="head-text relative" key={index}>
            <Icon className="absolute left-1/2 top-[44px] size-14 -translate-x-1/2" />
            <CircularProgress
              aria-label={`مهارت با  ${value} درصد`}
              classNames={{
                svg: "size-36 drop-shadow-md text-white",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value:
                  "text-2xl md:text-3xl font-semibold text-neutral-200 relative",
              }}
              showValueLabel={true}
              strokeWidth={4}
              value={value}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
