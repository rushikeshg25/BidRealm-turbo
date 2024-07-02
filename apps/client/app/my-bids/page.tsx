import MyBiddings from "@/components/pages/MyBids";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import prisma from "@repo/db";

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

export default async function Page({
  searchParams,
}: {
  searchParams: {
    sortBy: string;
  };
}) {
  const { session, user } = await getAuth();
  if (!session) {
    redirect("/sign-in");
  }

  let bids: any;

  if (searchParams?.sortBy === "title") {
    bids = await prisma.bid.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        auction: {
          title: "asc",
        },
      },
      include: {
        auction: {
          select: {
            title: true,
          },
        },
      },
    });
  } else {
    bids = await prisma.bid.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        auction: {
          createdAt: "desc",
        },
      },
      include: {
        auction: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  //@ts-ignore
  return <MyBiddings bids={bids} />;
}
