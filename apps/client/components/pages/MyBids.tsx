"use client";
import React, { useState } from "react";
import date from "date-and-time";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ListFilterIcon } from "lucide-react";

type bidsT = {
  id: string;
  amount: number;
  createdAt: Date;
  userId: string;
  auctionId: string;
  auction: {
    title: string;
  };
}[];

const MyBiddings = ({ bids }: { bids: bidsT[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sortBy, setSortBy] = useState<string>("time");

  const handleSortby = (sortBy: string) => {
    setSortBy((prev) => sortBy);
    const param = new URLSearchParams(searchParams);
    if (searchParams) param.set("sortBy", sortBy);
    else param.delete("sortBy");

    router.replace(`${pathname}?${param.toString()}`);
  };

  return (
    <div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <Card>
        <CardHeader className='px-7 flex flex-row justify-between'>
          <div>
            <CardTitle>My Bids</CardTitle>
            <CardDescription>Recent Bids on all your auctions.</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 gap-1'>
                <ListFilterIcon className='h-3.5 w-3.5' />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={handleSortby}
              >
                <DropdownMenuRadioItem value='time'>Time</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='title'>
                  Title
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='hidden sm:table-cell'>
                  Auction Item
                </TableHead>
                <TableHead className='hidden md:table-cell'>Date</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid: any) => (
                <TableRow key={bid.id}>
                  <TableCell className=' table-cell'>
                    {bid.auction.title}
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {date.format(bid.createdAt, "YYYY/MM/DD HH:mm:ss")}
                  </TableCell>
                  <TableCell className='text-right'>${bid.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBiddings;
