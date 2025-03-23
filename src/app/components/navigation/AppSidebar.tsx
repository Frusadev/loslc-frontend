"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { create } from "zustand";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { redirect } from "next/navigation";

// Types
interface SidebarLink {
  title: string;
  href: string;
  icon: ReactNode;
}

interface RetractedStateStore {
  retracted: boolean;
  setRetracted: (retracted: boolean) => void;
}

// Store
const useRetracted = create<RetractedStateStore>((set) => ({
  retracted: true,
  setRetracted: (retracted) => set({ retracted }),
}));

// SidebarButton Component
export function SidebarButton({ title, href, icon }: SidebarLink) {
  const { retracted } = useRetracted();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={"py-3 flex"+ (retracted ? " justify-center" : " justify-start")}>
          <Button className="py-3" variant={"ghost"} onClick={() => redirect(href)}>
            <div className="flex">
              {icon}
              {!retracted && <span className="ml-2">{title}</span>}
            </div>
          </Button>
        </TooltipTrigger>
        {retracted && <TooltipContent side="right">{title}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

// Main AppSidebar Component
export function AppSidebar({
  homeIcon,
  title,
  links,
}: {
  homeIcon: ReactNode;
  title: string;
  links: SidebarLink[];
}) {
  const { retracted, setRetracted } = useRetracted();

  return (
    <div
      className={`transition-all ml-1.5 my-1.5 mr-3 z-50 rounded-xl p-2 bg-background border border-border flex flex-col justify-between ${
        retracted ? "w-24" : "w-52"
      }`}
    >
      {/* Header Section */}
      <div className="relative w-full flex items-center justify-center rounded-xl">
        <Button
          className="absolute right-[-20px] rounded-full w-8 h-8 p-0"
          variant="default"
          onClick={() => setRetracted(!retracted)}
          aria-label={retracted ? "Expand sidebar" : "Collapse sidebar"}
        >
          {retracted ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>

        <Link
          href="/"
          className="flex flex-col items-center justify-center bg-secondary-foreground/20 hover:bg-secondary-foreground/30 rounded-lg transition-all p-4 w-full"
        >
          {homeIcon}
          {!retracted && (
            <span className="mt-2 text-sm font-medium">{title}</span>
          )}
        </Link>
      </div>

      {/* Links Section */}
      <div className="h-full overflow-y-auto py-4">
        <div className="flex flex-col h-9/12 grow">
          {links.map((link, index) => (
            <SidebarButton key={index} {...link} />
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm rounded-lg mt-2">
        {/* Footer content */}
      </div>
    </div>
  );
}
