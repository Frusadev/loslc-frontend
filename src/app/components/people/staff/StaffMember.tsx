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
    <Card className="w-full sm:w-[300px] md:w-[350px] min-h-[450px] sm:min-h-[500px] select-none">
      <CardHeader className="flex flex-col justify-center items-center pt-4 pb-2 px-4 sm:pt-6 sm:px-6">
        <img
          src={profile.image}
          alt={profile.lastName + profile.firstName}
          className="rounded-full object-cover w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44"
        />
        <CardTitle className="mt-3 text-center text-base sm:text-lg">
          {profile.firstName + " " + profile.lastName}
        </CardTitle>
        <CardDescription>{profile.title}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="flex justify-center">
          <span className="text-center text-foreground/70 text-sm sm:text-base">{profile.bio}</span>
        </div>
      </CardContent>
      <CardFooter className="h-full px-4 sm:px-6">
        <div className="flex w-full h-full items-end justify-center pb-4">
          <Link
            href={`mailto:${profile.email}`}
            className={`${buttonVariants({ variant: "default", size: "sm" })} sm:${buttonVariants({ variant: "default" })}`}
          >
            Contact {profile.firstName}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
