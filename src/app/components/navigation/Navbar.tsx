"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Linknav from "./Linknav";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ThemeSwitcher from "../theming/ThemeSwitcher";
import { MenuIcon } from "lucide-react";
import MobileLinknav from "./mobile/MobileLinknav";
import { buttonVariants } from "@/components/ui/button";
import { IoLogoDiscord, IoLogoWhatsapp } from "react-icons/io5";

const links = [
  {
    links: [
      {
        name: "WhatsApp",
        href: "#",
        description: "Join our WhatsApp community.",
        icon: <IoLogoWhatsapp color="#25D366" />,
      },
      {
        name: "Discord",
        href: "#",
        description: "Join our Discord server.",
        icon: <IoLogoDiscord color="#5865F2" />,
      },
    ],
    single: false,
    name: "Join us",
  },
  {
    single: true,
    name: "Blog",
    href: "/blog",
    links: [],
  },
  {
    single: true,
    name: "Contact us",
    href: "#",
    links: [],
  },
];

export function Navbar() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    });
  });
  return (
    <div className="bg-background/50 border-b border-b-border border-dashed z-50 backdrop-blur-2xl sticky top-0 flex justify-between w-full h-1/12 px-3 py-1">
      <div className="flex gap-3 items-center">
        <Link
          href={"/"}
          className="text-xl font-extrabold select-none cursor-default"
        >
          LOSLC
        </Link>
        {windowWidth > 768 ? <Linknav links={links} /> : <></>}
      </div>
      <div className="flex items-center">
        {windowWidth < 768 ? (
          <div className="flex gap-3 items-center">
            <ThemeSwitcher />
            <Drawer>
              <DrawerTrigger asChild>
                <MenuIcon />
              </DrawerTrigger>
              <DrawerContent className="min-h-6/12">
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <MobileLinknav links={links} />
                <DrawerFooter>
                  <Link
                    href="/login"
                    className={`${buttonVariants({ variant: "default" })} w-full`}
                  >
                    Login / Signup
                  </Link>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        ) : (
          <>
            <Link
              className={
                buttonVariants({ variant: "link" }) + " text-foreground"
              }
              href={"/login"}
            >
              Login / Signup
            </Link>
            <ThemeSwitcher />
          </>
        )}
      </div>
    </div>
  );
}
