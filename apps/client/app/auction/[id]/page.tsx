import Auction from "@/components/pages/Auction";
import { getAuth } from "@/lib/auth";
import prisma from "@repo/db";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { session, user } = await getAuth();
  const auction = await prisma.auction.findUnique({
    where: {
      id: params.id,
    },
    include: {
      bids: true,
      user: true,
    },
  });
  console.log(typeof auction);
  console.log(auction);
  return <Auction user={user} auction={auction} />;
};

export default page;
