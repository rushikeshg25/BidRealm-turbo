'use server';

import prisma from '@repo/db';

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
    await prisma.auction.update({
      where: {
        id: auctionId,
      },
      data: {
        currentPrice: bid.amount,
      },
    });
  } catch (error) {
    throw error;
  }
};
