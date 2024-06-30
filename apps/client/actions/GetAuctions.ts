"use server";

import prisma from "@repo/db";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const getPolls = async ({
  search,
  offset = 0,
  limit = 10,
  userId,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
  userId: string | null;
}) => {
  if (!userId) redirect("/sign-in");

  const polls = await prisma.auction.findMany({
    where: {
      userId: userId,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: offset,
    take: limit,
  });
  const totalCount = await prisma.auction.count({
    where: {
      title: {
        contains: search,
      },
    },
  });
  const totalPages = Math.ceil(totalCount / limit);
  return { polls, totalCount, totalPages };
};

export const getPollbyTitle = async (auctionId: string) => {
  const { session } = await getAuth();
  if (!session) redirect("/sign-in");

  let poll;
  try {
    poll = await prisma.auction.findUnique({
      where: {
        id: auctionId,
      },
    });
  } catch (error) {
    console.log("error while fetching Poll:", error);
    return { success: false, message: "Something went wrong" };
  }
  return { success: true, message: "Poll Fetched", poll: poll };
};
