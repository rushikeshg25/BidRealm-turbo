"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const SignUp = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // Redirect or handle successful signup
        window.location.href = "/dashboard";
      } else {
        // Handle errors
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-muted dark:bg-background'>
      <div className='w-full max-w-md p-6 space-y-4 bg-background dark:bg-muted rounded-lg shadow-lg'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-primary dark:text-primary-foreground'>
            Sign Up
          </h1>
          <p className='text-muted-foreground'>
            Create your account to get started.
          </p>
        </div>
        <form className='space-y-4'>
          <div>
            <Label htmlFor='username' className='text-muted-foreground'>
              Username
            </Label>
            <Input
              id='username'
              type='text'
              placeholder='Enter your username'
              className='w-full px-4 py-2 bg-muted dark:bg-card dark:text-primary-foreground rounded-md'
            />
          </div>
          <div>
            <Label htmlFor='email' className='text-muted-foreground'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 bg-muted dark:bg-card dark:text-primary-foreground rounded-md'
            />
          </div>
          <div>
            <Label htmlFor='password' className='text-muted-foreground'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='Enter your password'
              className='w-full px-4 py-2 bg-muted dark:bg-card dark:text-primary-foreground rounded-md'
            />
          </div>
          <div>
            <Label htmlFor='confirm-password' className='text-muted-foreground'>
              Confirm Password
            </Label>
            <Input
              id='confirm-password'
              type='password'
              placeholder='Confirm your password'
              className='w-full px-4 py-2 bg-muted dark:bg-card dark:text-primary-foreground rounded-md'
            />
          </div>
          <Button
            type='submit'
            className='w-full px-4 py-2 font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-muted'
          >
            Sign Up
          </Button>
        </form>
        <div className='text-center text-muted-foreground'>
          Already have an account?{" "}
          <Link
            href='#'
            className='text-primary dark:text-primary-foreground hover:underline'
            prefetch={false}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
