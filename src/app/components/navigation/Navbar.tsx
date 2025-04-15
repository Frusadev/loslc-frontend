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
import { Menu } from "lucide-react";
import MobileLinknav from "./mobile/MobileLinknav";
import { Button, buttonVariants } from "@/components/ui/button";
import { IoLogoDiscord, IoLogoWhatsapp } from "react-icons/io5";

const links = [
  {
    links: [
      {
        name: "WhatsApp",
        href: "https://chat.whatsapp.com/BcapIUdCapFLBsHgdXVfcQ",
        description: "Join our WhatsApp community.",
        icon: <IoLogoWhatsapp color="#25D366" />,
      },
      {
        name: "Discord",
        href: "https://discord.gg/eu7WKAnv",
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
    href: "#contact",
    links: [],
  },
];

export function Navbar() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);
    
    // Handle resize events
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Handle scroll events
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    // Initial scroll check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine navbar style based on scroll position
  const navbarClass = `
    bg-background/50 backdrop-blur-2xl sticky top-0 z-50 w-full
    transition-all duration-200 
    ${isScrolled ? 'border-b border-b-border shadow-sm' : 'border-b border-b-border/30'}
  `;

  return (
    <div className={navbarClass}>
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
        <div className="flex gap-3 items-center">
          <Link
            href={"/"}
            className="text-xl font-extrabold select-none"
          >
            LOSLC
          </Link>
          {windowWidth > 768 ? <Linknav links={links} /> : <></>}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {windowWidth < 768 ? (
            <>
              <ThemeSwitcher />
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="size-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[90%] overflow-y-auto">
                  <DrawerHeader className="border-b pb-3">
                    <DrawerTitle className="text-xl font-bold">Menu</DrawerTitle>
                  </DrawerHeader>
                  <MobileLinknav links={links} />
                  <DrawerFooter className="pt-2 pb-6">
                    <Link
                      href="/login"
                      className={`${buttonVariants({ variant: "default" })} w-full py-6`}
                    >
                      Login / Signup
                    </Link>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </>
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
    </div>
  );
}
