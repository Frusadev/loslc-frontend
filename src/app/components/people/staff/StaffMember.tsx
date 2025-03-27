import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export interface StaffProfile {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  image: string;
  bio: string;
}

export default function StaffMember({ profile }: { profile: StaffProfile }) {
  return (
    <Card className="w-10/12 h-[500px] md:w-[350px] select-none">
      <CardHeader className="flex flex-col justify-center items-center">
        <img
          src={profile.image}
          alt={profile.lastName + profile.firstName}
          className="rounded-full object-cover w-44 h-44"
        />
        <CardTitle>{profile.firstName + " " + profile.lastName}</CardTitle>
        <CardDescription>{profile.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <span className="text-center text-foreground/70">{profile.bio}</span>
        </div>
      </CardContent>
      <CardFooter className="h-full">
        <div className="flex w-full h-full items-end justify-center">
          <Link
            href={`mailto:${profile.email}`}
            className={`${buttonVariants({ variant: "default" })}`}
          >
            Contact {profile.firstName}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
