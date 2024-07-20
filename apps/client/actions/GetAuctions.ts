"use server";

import prisma from "@repo/db";

export const getAuctions = async ({
  search,
  offset = 0,
  limit = 10, //default limit
  min,
  max,
  status,
  categories,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
  min?: string;
  max?: string;
  status?: string[];
  categories?: string[];
}) => {
  const auctions = await prisma.auction.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
      // categories: "vehicles",
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
