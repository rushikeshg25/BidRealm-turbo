"use client";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import GavelIcon from "./icons/GavelIcon";
import SearchIcon from "./icons/SearchIcon";
import UserIcon from "./icons/UserIcon";
import { ModeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucia";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = ({
  className,
  user,
}: {
  className?: string;
  user: User | null;
}) => {
  const router = useRouter();
  const LogoutHandler = () => {};
  return (
    <header
      className={cn(" py-4 px-10 flex items-center justify-between", className)}
    >
      <Link href='/' className='flex items-center gap-2' prefetch={false}>
        <GavelIcon className='w-6 h-6' />
        <span className='text-xl font-bold'>BidRealm</span>
      </Link>
      <div className='flex-1 max-w-md mx-6'>
        <div className='relative'>
          <SearchIcon className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search for items...'
            className='w-full py-2 pl-10 pr-4 rounded-md bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 dark:bg-muted/10 dark:text-foreground'
          />
        </div>
      </div>
      <nav className='items-center hidden gap-4 md:flex'>
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
        {!user ? (
          <Button onClick={() => router.push("/sign-up")}>Get Started</Button>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='flex items-center justify-center border border-black rounded-full dark:border-white size-8'>
                  <UserIcon className='w-7 h-7' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/my-auctions")}>
                  My Auctions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/my-bids")}>
                  Bids
                </DropdownMenuItem>

                <DropdownMenuItem onClick={LogoutHandler}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
