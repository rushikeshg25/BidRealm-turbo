"use server";

import prisma from "@repo/db";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const getAuctions = async ({
  search,
  offset = 0,
  limit = 10,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}) => {
  const auctions = await prisma.auction.findMany({
    where: {
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
  return { auctions, totalCount, totalPages };
};

// export const getPollbyTitle = async (auctionId: string) => {
//   const { session } = await getAuth();
//   if (!session) redirect("/sign-in");

//   let poll;
//   try {
//     poll = await prisma.auction.findUnique({
//       where: {
//         id: auctionId,
//       },
//     });
//   } catch (error) {
//     console.log("error while fetching Poll:", error);
//     return { success: false, message: "Something went wrong" };
//   }
//   return { success: true, message: "Poll Fetched", poll: poll };
// };
