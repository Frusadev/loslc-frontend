"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/navigation/desktop/DesktopNav";
import { useCurrentUser } from "@/queries/authQueries";
import { redirect } from "next/navigation";

export default function Home() {
  const { isError, data: currentUser } = useCurrentUser();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    if (isError) {
      redirect("/login");
    }
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    });
  }, []);
  if (windowWidth < 400) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Window is too small
      </div>
    );
  }
  return (
    <div className="relative flex-col w-screen h-screen">
      <Navbar />
      <div className="flex w-full justify-center"></div>
      hi {currentUser?.username}
    </div>
  );
}
