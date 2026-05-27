"use client"
import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return <HeroUIProvider>
    {children}
  </HeroUIProvider>;
}

export default Providers;
