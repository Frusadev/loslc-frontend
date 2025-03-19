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
import { requestLoginLink } from "@/requests/authRequests";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [fetching, setFetching] = useState(false);
  const sendLoginLink = (e: FormEvent<HTMLFormElement>) => {
    if (fetching) {
      toast.error("Request is underway");
    }
    setFetching(true);
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const email = form.get("email") as string;
    requestLoginLink(email)
      .catch((e: AxiosError) => {
        setFetching(false);
        switch (e.response?.status) {
          case 404:
            toast.error("Failed to send login link", {
              description: "User not found",
            });
            break;
          case 500:
            toast.error("Failed to send login link", {
              description: "Internal server error",
            });
            break;
          default:
            toast.error("Failed to send login link", {
              description: "Unknown error",
            });
        }
      })
      .then(() => {
        setFetching(false);
        toast.success("Login link sent", {
          description: "Check your email",
        });
      });
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
            <Input name="email" type="email" required />
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
          <Button type="submit" variant={"default"}>
            Send login link
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
