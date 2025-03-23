"use client";
import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { User } from "@/types/user";
import Navbar from "../navigation/desktop/DesktopNav";
import Linknav from "../navigation/Linknav";
import { useUpcomingEvents } from "@/queries/eventQueries";
import { toast } from "sonner";
import { EventCarousel } from "../events/EventCarousel";

export default function AdminDashboard({ admin }: { admin: User | undefined }) {
  const { data: events, isError: eventsQueryError } = useUpcomingEvents();
  if (eventsQueryError) {
    toast.error("Couldn't get upcoming events");
  }
  return (
    <div className="flex flex-col w-full ">
      <Linknav />
      <div className="pl-7">
        {/* Events */}
        <div>
          <span className="text-2xl font-bold">Upcoming events</span>
          <div>
            {/* Upcoming Events */}
            <EventCarousel upcoming={true} limit={1} offset={0} />
          </div>
        </div>
      </div>
    </div>
  );
}
