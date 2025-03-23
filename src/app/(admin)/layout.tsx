import { ReactNode } from "react";
import { AppSidebar } from "../components/navigation/AppSidebar";
import {
  Calendar,
  ChartBarIncreasing,
  Clipboard,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const sideBarLinks = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <ChartBarIncreasing />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users />,
    },
    {
      title: "Events",
      href: "/admin/events",
      icon: <Calendar />,
    },
    {
      title: "Surveys",
      href: "/admin/surveys",
      icon: <Clipboard />,
    },
  ];
  return (
    <div className="flex h-screen">
      <AppSidebar
        homeIcon={
          <Image
            src={"/logo.png"}
            className="rounded-full"
            alt="Loslc logo"
            width={100}
            height={100}
          />
        }
        title="Admin panel"
        links={sideBarLinks}
      />
      {children}
    </div>
  );
}
