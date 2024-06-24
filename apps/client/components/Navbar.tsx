"use client";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GavelIcon from "./icons/GavelIcon";
import SearchIcon from "./icons/SearchIcon";
import UserIcon from "./icons/UserIcon";
import { ModeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(" py-4 px-6 flex items-center justify-between", className)}
    >
      <Link href='/' className='flex items-center gap-2' prefetch={false}>
        <GavelIcon className='w-6 h-6' />
        <span className='text-xl font-bold'>BidRealm</span>
      </Link>
      <div className='flex-1 max-w-md mx-6'>
        <div className='relative'>
          <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search for items...'
            className='w-full pl-10 pr-4 py-2 rounded-md bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 dark:bg-muted/10 dark:text-foreground'
          />
        </div>
      </div>
      <nav className='hidden md:flex items-center gap-4'>
        <Link
          href='#'
          className='font-medium hover:text-primary-foreground/80 dark:hover:text-primary-foreground'
          prefetch={false}
        >
          Live Auctions
        </Link>
        <Link
          href='#'
          className='font-medium hover:text-primary-foreground/80 dark:hover:text-primary-foreground'
          prefetch={false}
        >
          Upcoming
        </Link>
        <Link
          href='#'
          className='font-medium hover:text-primary-foreground/80 dark:hover:text-primary-foreground'
          prefetch={false}
        >
          Closed
        </Link>
      </nav>
      <div className='flex items-center gap-4'>
        <ModeToggle />
        <Button variant='ghost' size='icon' className='rounded-full'>
          <div className='rounded-full dark:border-white border border-black'>
            <UserIcon className='w-5 h-5' />
          </div>
          <span className='sr-only'>Account</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
