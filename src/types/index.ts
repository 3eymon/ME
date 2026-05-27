import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

export interface Links {
    icon: IconType;
    href: string;
}
export interface Project {
    id: number;
    name: string;
    link: string;
    image: string;
    technologies: Technology[];
    description: string;
    challenges: string;
}
export interface Technology {
    icon: ReactNode;
    name: string;
}