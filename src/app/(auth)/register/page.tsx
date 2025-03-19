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
import { registerUser } from "@/requests/authRequests";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [fetching, setFetching] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    if (fetching) {
      toast.error("Request is underway");
    };
    setFetching(true);
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    registerUser(username, email)
      .catch((e: AxiosError) => {
        setFetching(false);
        switch (e.response?.status) {
          case 409:
            toast.error("Failed to register", {
              description: "User already exists",
            });
            break;
          case 500:
            toast.error("Failed to register", {
              description: "Internal server error",
            });
            break;
          default:
            toast.error("Failed to register", {
              description: "Unknown error",
            });
        }
      })
      .then(() => {
        setFetching(false);
        toast.success("User registered", {
          description: "Check your email",
        });
      });
  };
  return (
    <Card className="w-full min-h-2/11 sm:w-6/11 md:w-5/11 lg:w-3/11">
      <CardHeader>
        <CardTitle className="w-full text-center">Register</CardTitle>
        <CardDescription className="w-full text-center">
          Enter your email and username
        </CardDescription>
      </CardHeader>
      <form onSubmit={submit}>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username:</Label>
            <Input name="username" type="text" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email:</Label>
            <Input name="email" type="email" required />
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col items-center justify-center mt-5">
          <Button
            type="button"
            variant={"link"}
            onClick={() => {
              redirect("/login");
            }}
            className="text-primary/55"
          >
            Already registered ? Login
          </Button>
          <Button type="submit" variant={"default"}>
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
