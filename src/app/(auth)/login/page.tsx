"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser, useRequestLoginLink } from "@/queries/authQueries";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [fetching, setFetching] = useState(false);
  const { isError: isErrorFetchingCurrentUser } = useCurrentUser();

  if (!isErrorFetchingCurrentUser) {
    redirect("/");
  }

  const sendLoginLink = (e: FormEvent<HTMLFormElement>) => {
    setFetching(true);
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const email = form.get("email") as string;
    const { isError } = useRequestLoginLink(email);
    if (isError) {
      toast.error("Failed to send login link");
      setFetching(false);
    } else {
      toast.success("Login link send check your email.");
    }
  };
  return (
    <Card className="w-full min-h-2/11 sm:w-6/11 md:w-5/11 lg:w-3/11">
      <CardHeader>
        <CardTitle className="w-full text-center">Login</CardTitle>
        <CardDescription className="w-full text-center">
          Enter your email to get a login link.
        </CardDescription>
      </CardHeader>
      <form onSubmit={sendLoginLink}>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email:</Label>
            <Input disabled={fetching} name="email" type="email" required />
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col items-center justify-center mt-5">
          <Button
            type="button"
            variant={"link"}
            onClick={() => {
              redirect("/register");
            }}
            className="text-primary/55"
          >
            Not yet registered ? Register
          </Button>
          <Button disabled={fetching} type="submit" variant={"default"}>
            Send login link
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
