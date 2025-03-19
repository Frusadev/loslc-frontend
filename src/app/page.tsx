"use client";

import { requestCurrentUser } from "@/requests/authRequests";
import { User } from "@/types/user";
import { useWindowSize } from "@/utils/stores";
import { useEffect, useState } from "react";
import MobileNav from "./components/navigation/mobile/MobileNav";
import Navbar from "./components/navigation/desktop/DesktopNav";
import Dashboard from "./components/dashboards/Dashboard";

export default function Home() {
  let currentUser: User;
  requestCurrentUser().then((user) => {
    currentUser = user;
  });
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
      <div className="flex w-full justify-center">
        <Dashboard />
      </div>
    </div>
  );
}
