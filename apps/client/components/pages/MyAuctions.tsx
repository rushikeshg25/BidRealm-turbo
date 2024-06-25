import prisma from "@repo/db";
import { User } from "lucia";
import React from "react";

const MyAuctions = async ({ user }: { user: User }) => {
  const Auctions = await prisma.auction.findMany({
    where: {
      userId: user.id,
    },
  });

  if (Auctions.length === 0) {
    return <div>No auctions</div>;
  }
  return <div>MyAuctions</div>;
};

export default MyAuctions;
