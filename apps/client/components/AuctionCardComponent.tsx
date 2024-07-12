"use client";
import { User } from "lucia";
import { useRouter } from "next/navigation";
import React from "react";
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

const AuctionCardComponent = ({
  user,
  auction,
}: {
  user?: User | null;
  auction: AuctionT;
}) => {
  const router = useRouter();
  return (
    <div className='relative overflow-hidden rounded-lg bg-background shadow-lg group border border--foreground dark:border--foreground'>
      <div className='p-2'>
        {auction.image ? (
          <img
            src={auction.image}
            alt='Auction Item'
            width={300}
            height={300}
            className='w-full h-60  rounded-lg object-cover'
          />
        ) : (
          <div className=' rounded-md bg-background'>
            <div className='flex h-60 w-full items-center justify-center'>
              <div className='text-muted-foreground'>No Image</div>
            </div>
          </div>
        )}
      </div>
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <span className='px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground'>
            {auction.categories}
          </span>
          <span className='px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground'>
            {auction.status}
          </span>
        </div>
        <h3 className='text-lg font-semibold mt-2'>{auction.title}</h3>
        <div className='flex items-center justify-between mt-2'>
          <span className='text-base font-semibold'>$1,499 </span>
          <Button
            className='dark:bg-card-foreground'
            size='sm'
            onClick={() => router.push(`/auction/${auction.id}`)}
          >
            Bid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCardComponent;