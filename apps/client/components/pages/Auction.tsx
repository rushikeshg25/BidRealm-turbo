"use client";
import { User } from "lucia";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import date from "date-and-time";
import { AuctionWithBidsWithUsersAndUserT } from "@repo/db/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BidDialog from "../BidDialog";
import { Button } from "../ui/button";

const Auction = ({
  user,
  auction,
}: {
  user: User | null;
  auction: AuctionWithBidsWithUsersAndUserT;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center h-full bg-background p-4 md:p-8'>
      <div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-center items-center border border--card rounded-lg dark:border--card dark:border'>
            <img
              src={auction.image}
              alt={auction.title}
              width={250}
              height={250}
              className='rounded-lg object-cover p-2'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-bold'>{auction.title}</h1>
            <h2 className='text-muted-foreground'>
              Item listed by: {auction.user.userName}
            </h2>
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
                {JSON.stringify(auction.endDate)}
                {/* Todo to update realtime timer */}
              </span>
            </div>
            {user ? (
              <BidDialog
                handleModal={handleModal}
                value={isModalOpen}
                currentPrice={auction.currentPrice}
                auctionId={auction.id}
                userId={user?.id}
              />
            ) : (
              <Button onClick={() => router.push("/login")} className='w-full'>
                Login to Place a Bid
              </Button>
            )}
          </div>
          <div className='flex flex-col gap-4 bg-card p-6 rounded-lg'>
            <h2 className='text-xl font-bold'>Bid History</h2>
            <Table containerClassname='h-fit max-h-80 overflow-y-auto relative dark:border--card rounded-xl border border--card dark:border'>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Bidder</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auction.bids.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell className='font-medium'>
                      {bid.user.userName}
                    </TableCell>
                    <TableCell>
                      {date.format(
                        new Date(bid.createdAt),
                        "YYYY/MM/DD HH:mm:ss"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>{bid.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
