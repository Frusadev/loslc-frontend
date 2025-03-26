"use client";

import { User } from "@/types/user";
import { useWindowSize } from "@/utils/stores";
import { useEffect, useState } from "react";
import Dashboard from "./components/dashboards/Dashboard";
import Linknav from "./components/navigation/Linknav";
import { IoLogoDiscord, IoLogoWhatsapp } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import ThemeSwitcher from "./components/theming/ThemeSwitcher";
import MobileLinknav from "./components/navigation/mobile/MobileLinknav";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, MenuIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import StaffMember, {
  StaffProfile,
} from "./components/people/staff/StaffMember";

const mobileLinks = [
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
    href: "#",
    links: [],
  },
  {
    single: true,
    name: "Contact us",
    href: "#",
    links: [],
  },
  {
    single: true,
    name: "Login / Signup",
    href: "/login",
    links: [],
  },
];

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

const teamMembers: StaffProfile[] = [
  {
    firstName: "Daniel",
    lastName: "AMETSOWOU",
    title: "Founder",
    image: "/staff/dani.png",
    bio: "Daniel is passionate about science and technology. He began programming at 12 and has been building projects and honing his skills ever since.",
  },
  {
    firstName: "Denise",
    lastName: "DEABALO",
    title: "Secretary",
    image: "/staff/den.png",
    bio: "BIO Denise",
  },
  {
    firstName: "Rayane",
    lastName: "TCHABODI",
    title: "Communication lead",
    image: "/staff/ray.jpg",
    bio: "BIO Rayane",
  },
  {
    firstName: "Laureen",
    lastName: "EKON",
    title: "Community Relations Manager",
    image: "/staff/laur.png",
    bio: "BIO Laureen",
  },
  {
    firstName: "Emerick",
    lastName: "MITCHIKPE",
    title: "Community Manager",
    image: "/staff/emer.png",
    bio: "BIO Emerick",
  },
  {
    firstName: "Bayédzè",
    lastName: "COMLAN",
    title: "Community Manager",
    image: "/staff/bay.png",
    bio: "BIO Bayédzè",
  },
  {
    firstName: "Kallern",
    lastName: "",
    title: "Project Security Tester",
    image: "/staff/kall.png",
    bio: "BIO Kallern",
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
export default function Home() {
  return (
    <div className="relative flex-col w-screen h-screen scroll-smooth">
      <Navbar />
      <img
        src="/blobs/blob-yellow.svg"
        alt="blob"
        className="absolute top-30 md:bottom-2 w-4/12 right-2 motion-preset-oscillate motion-duration-2000"
      />
      <img
        src="/blobs/blob-move.svg"
        alt="blob"
        className="absolute right-120 w-4/12 top-20 motion-preset-spin motion-duration-2000"
      />
      <img
        src="/blobs/blob-sky.svg"
        alt="blob"
        className="absolute top-70 w-4/12 left-3"
      />
      <div className="flex w-screen h-8/12 md:h-screen justify-center z-20 md:items-center bg-background/50 backdrop-blur-2xl">
        <div className="w-8/12 flex justify-center">
          <span className="text-4xl md:text-6xl font-extrabold text-foreground motion-preset-slide-up text-center mt-11 md:mt-0">
            A community for{" "}
            <span className="bg-clip-text text-transparent from-primary to-sky-400 bg-gradient-to-r">
              open-source
            </span>{" "}
            enthousiasts and{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-yellow-800 to-yellow-400">
              Linux
            </span>{" "}
            lovers.
          </span>
        </div>
      </div>
      {/* Next section */}
      <div
        className={`flex flex-col items-center md:flex-row w-screen h-auto md:h-screen overflow-y-hidden gap-10 justify-around px-2 md:px-20 py-4`}
      >
        <div className="flex flex-col h-full w-11/12 gap-10 md:gap-0 md:w-1/2 rounded-xl bg-background justify-around p-4">
          <div className="flex flex-col gap-4 text-center">
            <span className="text-2xl md:text-4xl font-bold">
              Building Open-Source as a community
            </span>
            <span className="text-slate-500">
              Open-source thrives on collaboration and shared ownership.
              Contributors create innovative solutions that benefit everyone,
              driving a movement that reshapes technology.
            </span>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <span className="text-2xl md:text-4xl font-bold">
              Grow together
            </span>
            <span className="text-slate-500">
              Growth is stronger when shared. Through mentorship and
              collaboration, we accelerate progress and create an environment
              where everyone can thrive together.
            </span>
          </div>
        </div>
        <div className="flex flex-col h-full gap-10 md:gap-0 w-11/12 md:w-1/2 rounded-xl bg-background p-4 justify-around">
          <div className="flex flex-col gap-4 text-center">
            <span className="text-2xl md:text-4xl font-bold">
              Teach others by sharing your knowledge and expertise
            </span>
            <span className="text-slate-500">
              Knowledge sharing empowers others, fosters innovation, and pushes
              boundaries. It's about making a meaningful impact beyond
              individual learning.
            </span>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <span className="text-2xl md:text-4xl font-bold">
              Thriving Together, Not Just Surviving
            </span>
            <span className="text-slate-500">
              In a strong community, no one struggles alone. We support each
              other, share knowledge, and grow collectively. Progress is faster
              and more fulfilling when we build together.
            </span>
          </div>
        </div>
      </div>
      {/* Staff and Contact section*/}
      <div className="min-h-screen">
        <div className="w-full px-20 mt-10">
          <Separator />
        </div>
        <div id="contact" className="flex flex-col w-screen mt-10 items-center">
          <div className="flex flex-col w-full items-center justify-center md:px-52 gap-4">
            <span className="text-4xl font-bold">Our team</span>
            <span className="text-center text-slate-600 w-10/12 md:w-auto">
              Passionate, skilled, and collaborative, our team brings ideas to
              life and drives innovation forward.
            </span>
          </div>
          <div className="flex flex-col items-center md:grid mt-9 grid-cols-3 gap-y-6 gap-x-6">
            {teamMembers.map((member, index) => {
              return <StaffMember key={index} profile={member} />;
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-screen mt-10 items-center py-4">
        <span className="text-2xl md:text-3xl text-center md:w-9/12 font-bold">
          Join our community and start collaborating today.
        </span>
        <div className="flex items-center justify-between px-11 py-10 gap-x-20">
          <Link href="#">
            <IoLogoWhatsapp size={50} color="#25D366" />
          </Link>
          <Link href="#">
            <IoLogoDiscord size={50} color="#5865F2" />
          </Link>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col w-screen h-1/12 bg-background/50">
        <span className="text-slate-500 text-center">
          © 2025 LOSLC. All rights reserved.
        </span>
      </div>
    </div>
  );
}
