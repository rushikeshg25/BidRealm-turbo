"use client";
import { User } from "lucia";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
type AuctionT = {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  image: string;
  categories: string;
};
const timeLeft = (endDate: Date) => {
  return Math.max(0, new Date(endDate).getTime() - new Date().getTime());
};

const AuctionCard = ({
  user,
  auction,
}: {
  user?: User | null;
  auction: AuctionT;
}) => {
  const router = useRouter();
  return (
    <div className='bg-background text-foreground p-4 md:p-6 lg:p-8 rounded-lg shadow-lg max-w-[700px] mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
        <div className='flex items-center justify-center'>
          <img
            src='https://utfs.io/f/d167f3b5-b5ff-4bca-a8b5-16833eba7a90-yaf61w.jpg'
            alt='Auction Item'
            width={300}
            height={300}
            className='w-full h-auto rounded-lg object-cover'
          />
        </div>
        <div className='space-y-4'>
          <div>
            <div className='inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground'>
              Vehicle
            </div>
            <h1 className='text-2xl md:text-3xl font-bold'>{auction.title}</h1>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <div className='bg-muted rounded-full w-8 h-8 flex items-center justify-center'>
                <ClockIcon className='w-5 h-5 text-muted-foreground' />
              </div>
              <div className='text-muted-foreground'>
                Auction ends in{" "}
                <span className='font-medium'>
                  {auction.endDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-muted-foreground'>
                Starting Price
              </div>
              <div className='text-2xl font-bold'>$1,499</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Current Bid</div>
              <div className='text-2xl font-bold'>$1,799</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>
                Auction Status
              </div>
              <div className='text-lg font-medium text-primary'>Live</div>
            </div>
            <div className='flex items-end justify-center'>
              <Button size='lg' className='w-full'>
                Place Bid
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}
