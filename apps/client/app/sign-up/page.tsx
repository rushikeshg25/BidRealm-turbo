"use client";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema, signUpSchemaT } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/actions/auth/Signup";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: server_Signup } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Signup successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (Formdata: signUpSchemaT) => {
    try {
      await server_Signup(Formdata);
    } catch (error) {
      console.log(error);
      toast.error("Error signing up. Try again!");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-muted dark:bg-background'>
      <div className='w-full max-w-md p-6 space-y-4 rounded-lg shadow-lg bg-background dark:border'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-primary dark:text-foreground'>
            Sign Up
          </h1>
          <p className='text-muted-foreground'>
            Create your account to get started.
          </p>
        </div>
        <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
          <div className='static'>
            <Label htmlFor='username' className='text-muted-foreground'>
              Username
            </Label>
            <Input
              type='text'
              placeholder='Enter your username'
              className='w-full px-4 py-2 rounded-md bg-muted dark:bg-card dark:text-primary'
              {...register("userName")}
            />
            <div className='min-h-[20px]'>
              {errors.userName && (
                <p className='text-sm text-red-500'>
                  {errors.userName.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor='email' className='text-muted-foreground'>
              Email
            </Label>
            <Input
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 rounded-md bg-muted dark:bg-card dark:text-primary'
              {...register("email")}
            />
            <div className='min-h-[20px]'>
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor='password' className='text-muted-foreground'>
              Password
            </Label>
            <Input
              type='password'
              placeholder='Enter your password'
              className='w-full px-4 py-2 rounded-md bg-muted dark:bg-card dark:text-primary'
              {...register("password")}
            />
            <div className='min-h-[20px]'>
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor='confirm-password' className='text-muted-foreground'>
              Confirm Password
            </Label>
            <Input
              type='password'
              placeholder='Confirm your password'
              className='w-full px-4 py-2 rounded-md bg-muted dark:bg-card dark:text-primary'
              {...register("confirmPassword")}
            />
            <div className='min-h-[20px]'>
              {errors.confirmPassword && (
                <p className='text-sm text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full px-4 py-2 font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-muted'
          >
            Sign Up
          </Button>
        </form>
        <div className='text-center text-muted-foreground'>
          Already have an account?{" "}
          <Link
            href='/sign-in'
            className='text-primary dark:text-foreground hover:underline'
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
