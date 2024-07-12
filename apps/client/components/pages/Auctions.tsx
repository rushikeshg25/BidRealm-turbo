import AuctionCard from "../AuctionCard";
import AuctionCardComponent from "../AuctionCardComponent";
import { Button } from "../ui/button";
import Link from "next/link";

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

const Auctions = ({ auctions }: { auctions: AuctionT[] }) => {
  return (
    <section className='grid grid-cols-1 gap-4 p-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
      {auctions.map((auction) => (
        <AuctionCardComponent key={auction.id} auction={auction} />
      ))}
    </section>
  );
};

export default Auctions;
