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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrentUser, useRegisterUser } from "@/queries/authQueries";
import { registerUser, requestCurrentUser } from "@/requests/authRequests";
import { User } from "@/types/user";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [fetching, setFetching] = useState(false);
  const [userDomain, setUserDomain] = useState<string>("Software development"); // or Cybersecurity
  const { isError } = useCurrentUser();
  if (!isError) {
    redirect("/");
  }
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetching(true);
    const form = new FormData(e.target as HTMLFormElement);
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const { isError } = useRegisterUser(username, email);
    if (isError) {
      toast.error("Failed to register");
      setFetching(false);
    } else {
      toast.success("Registered successfully");
      redirect("/login");
    }
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
            <Input disabled={fetching} name="username" type="text" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email:</Label>
            <Input disabled={fetching} name="email" type="email" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password:</Label>
            <Select onValueChange={setUserDomain} defaultValue={userDomain}>
              <SelectTrigger>
                <SelectValue>Choose a role</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software development">Software development</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col items-center justify-center mt-5">
          <Button
            type="button"
            disabled={fetching}
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
