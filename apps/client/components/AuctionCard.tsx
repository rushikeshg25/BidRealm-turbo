"use client";
import { User } from "lucia";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import date from "date-and-time";
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

const formatTime = (milliseconds: any) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const leftHours = hours % 24;
    return `${days}d ${leftHours}h ${minutes}m ${seconds}s`;
  }
  if (hours === 0) {
    return `${minutes}m ${seconds}s`;
  }
  if (hours === 0 && minutes === 0) {
    return `${seconds}s`;
  }
  return `${hours}h ${minutes}m ${seconds}s`;
};
const time = (timeStamp: Date) => {
  return date.format(timeStamp, "MMM DD  HH:mm");
};
const formatMoney = (amount: number) => {
  if (amount >= 100000 && amount < 10000000) {
    return `${amount / 1000000}L`;
  } else if (amount >= 10000 && amount < 100000) {
    return `${amount / 1000}K`;
  } else if (amount >= 10000000) {
    return `${amount / 10000000}cr`;
  }
  return `${amount}`;
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
    <div className="bg-background text-foreground p-4 md:p-6 lg:p-8 rounded-lg shadow-lg max-w-[700px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="flex items-center justify-center">
          {auction.image ? (
            <img
              src={auction.image}
              alt="Auction Item"
              width={300}
              height={300}
              className="w-full h-auto rounded-lg object-cover"
            />
          ) : (
            <div className="aspect-square rounded-md bg-background">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-muted-foreground">No Image</div>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Vehicle
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{auction.title}</h1>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-muted-foreground text-sm">
                {auction.status === "ACTIVE"
                  ? `Auction ends on ${time(auction.endDate)}`
                  : auction.status === "ENDED"
                    ? "Auction ended"
                    : `Auction starts on ${time(auction.startDate)}`}
              </div>
            </div>
            :
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">
                Starting Price
              </div>
              <div className="text-2xl font-bold">
                ₹{formatMoney(auction.startingPrice)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Current Bid</div>
              <div className="text-2xl font-bold">
                ₹{formatMoney(auction.currentPrice)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Auction Status
              </div>
              <div className="text-lg font-medium text-primary">Live</div>
            </div>
            <div className="flex items-end justify-center">
              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push(`/auction/${auction.id}`)}
              >
                Bid
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
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
