"use client";
import React from "react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
type bidsT = {
  id: string;
  amount: number;
  createdAt: Date;
  userId: string;
  auctionId: string;
}[];

const BIDS = [
  {
    id: 1,
    item: "Vintage Typewriter",
    bidAmount: 250.0,
    bidDate: "2023-06-01 12:34 PM",
    status: "Won",
  },
  {
    id: 2,
    item: "Antique Vase",
    bidAmount: 175.0,
    bidDate: "2023-05-15 3:21 PM",
    status: "Lost",
  },
  {
    id: 3,
    item: "Rare Coin Collection",
    bidAmount: 500.0,
    bidDate: "2023-04-30 9:45 AM",
    status: "Pending",
  },
  {
    id: 4,
    item: "Handcrafted Jewelry Box",
    bidAmount: 100.0,
    bidDate: "2023-03-20 6:18 PM",
    status: "Won",
  },
  {
    id: 5,
    item: "Vintage Record Player",
    bidAmount: 300.0,
    bidDate: "2023-02-10 11:27 AM",
    status: "Lost",
  },
];

const MyBiddings = ({ bids }: { bids: bidsT }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {};
  return (
    <div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold mb-6'>My Bids</h1>
      <div className='mb-4'>
        <Input
          type='text'
          placeholder='Search bids...'
          value={searchTerm}
          onChange={handleSearch}
          className='w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary'
        />
      </div>
      <div className='overflow-x-auto rounded-t-lg'>
        <table className='w-full table-auto '>
          <thead>
            <tr className='bg-gray-100 dark:bg-border'>
              <th
                className='px-4 py-3 text-left cursor-pointer'
                // onClick={() => handleSort("item")}
              >
                Item{" "}
                {/* {sortBy === "item" && (
                  <span className='ml-2'>
                    {sortOrder === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )} */}
              </th>
              <th
                className='px-4 py-3 text-right cursor-pointer'
                // onClick={() => handleSort("bidAmount")}
              >
                Bid Amount{" "}
                {/* {sortBy === "bidAmount" && (
                  <span className='ml-2'>
                    {sortOrder === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )} */}
              </th>
              <th
                className='px-4 py-3 text-left cursor-pointer dark:text-background'
                // onClick={() => handleSort("bidDate")}
              >
                Bid Date{" "}
                {/* {sortBy === "bidDate" && (
                  <span className='ml-2'>
                    {sortOrder === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )} */}
              </th>
              <th className='px-4 py-3 text-left'>Status</th>
              <th className='px-4 py-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {BIDS.map((bid) => (
              <tr
                key={bid.id}
                className='border-b border-gray-200 hover:bg-gray-100'
              >
                <td className='px-4 py-3 text-left'>{bid.item}</td>
                <td className='px-4 py-3 text-right'>
                  ${bid.bidAmount.toFixed(2)}
                </td>
                <td className='px-4 py-3 text-left'>{bid.bidDate}</td>
                <td className='px-4 py-3 text-left'>
                  <Badge variant={"outline"}>{bid.status}</Badge>
                </td>
                <td className='px-4 py-3 text-left'>
                  <Link href='#' className='text-primary' prefetch={false}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBiddings;
