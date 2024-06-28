"use server";

import prisma from "@repo/db";

export const createBid = async (
  auctionId: string,
  amount: number,
  userId: string
) => {
  try {
    const bid = await prisma.bid.create({
      data: {
        userId: userId,
        auctionId: auctionId,
        amount: amount,
      },
    });
    return bid;
  } catch (error) {
    throw error;
  }
};
