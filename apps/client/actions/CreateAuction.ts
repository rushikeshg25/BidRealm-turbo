"use server";
import { AuctionT } from "@/types/auction";
import prisma from "@repo/db";

type Categories =
  | "ART"
  | "COLLECTABLES"
  | "ELECTRONICS"
  | "VEHICLES"
  | "WATCHES"
  | "FASHION"
  | "SHOES";

export const createAuction = async (
  data: AuctionT,
  imgUrl: string,
  userId: string
) => {
  try {
    await prisma.auction.create({
      data: {
        title: data.title,
        description: data.description,
        categories: data.Categories,
        startDate: data.startDate,
        endDate: data.endDate,
        currentPrice: 0,
        startingPrice: data.startingPrice,
        image: imgUrl,
        status: "INACTIVE",
        userId: userId,
      },
    });
  } catch (error) {
    throw error;
  }

  return {};
};
