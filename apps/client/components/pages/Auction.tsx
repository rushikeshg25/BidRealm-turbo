"use client";
import { User } from "lucia";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auctionType } from "@/types/auction";
import prisma from "@repo/db";
import { BidT } from "@repo/db/types";

const currentItem = {
  name: "Vintage Rolex Submariner",
  description: "1967 Rolex Submariner in excellent condition",
  image: "/placeholder.svg?height=400&width=400",
  currentBid: 5000,
  bids: [
    {
      id: 1,
      amount: 4500,
      bidder: "John Doe",
      timestamp: "2023-06-27T12:34:56",
    },
    {
      id: 2,
      amount: 4750,
      bidder: "Jane Smith",
      timestamp: "2023-06-27T12:35:12",
    },
    {
      id: 3,
      amount: 5000,
      bidder: "Bob Johnson",
      timestamp: "2023-06-27T12:36:04",
    },
  ],
  timeRemaining: "2d 4h 23m",
};
const Auction = ({
  user,
  auction,
}: {
  user: User | null;
  auction: auctionType;
}) => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center h-full bg-background p-4 md:p-8'>
      <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col gap-4'>
          <img
            src={auction.image}
            alt={auction.title}
            width={300}
            height={300}
            className='rounded-lg object-cover'
          />
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-bold'>{auction.title}</h1>
            <p className='text-muted-foreground'>{auction.description}</p>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2 bg-card p-6 rounded-lg'>
            <div className='flex items-center justify-between'>
              <span className='text-lg font-semibold'>Current Bid</span>
              <span className='text-2xl font-bold text-primary'>
                ₹{auction.currentPrice.toLocaleString()}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-lg font-semibold'>Time Remaining</span>
              <span className='text-2xl font-bold text-primary'>
                {currentItem.timeRemaining}
                {/* Todo to update realtime timer */}
              </span>
            </div>
            <Button size='lg' className='w-full'>
              Place Bid
            </Button>
          </div>
          <div className='flex flex-col gap-4 bg-card p-6 rounded-lg'>
            <h2 className='text-xl font-bold'>Bid History</h2>
            <div className='flex flex-col gap-2'>
              {currentItem.bids.map((bid) => (
                <div
                  key={bid.id}
                  className='flex items-center justify-between text-sm'
                >
                  <div className='flex items-center gap-2'>
                    <span>{bid.bidder}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <span className='font-semibold'>
                      ${bid.amount.toLocaleString()}
                    </span>
                    <span className='text-muted-foreground'>
                      {new Date(bid.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
