"use client";
import AdminDashboard from "@/app/components/dashboards/AdminDashboard";
import { useCurrentUser } from "@/queries/authQueries";
import { notFound, redirect } from "next/navigation";

export default function AdminPage() {
  const { data: currentUser, isError, isLoading } = useCurrentUser();
  if (isError) {
    redirect("/login");
  }
  if (currentUser?.accountType !== "admin" && !isLoading) {
    notFound()
  }
  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center text-xl font-bold motion-preset-fade">
          Loading...
        </div>
      ) : (
        <AdminDashboard admin={currentUser} />
      )}
    </>
  );
}
