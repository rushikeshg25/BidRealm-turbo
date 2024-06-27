import MyBiddings from "@/components/pages/MyBids";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import prisma from "@repo/db";

export default async function Page() {
  const { session, user } = await getAuth();
  if (!session) {
    redirect("/sign-in");
  }

  const bids = await prisma.bid.findMany({
    where: {
      userId: user.id,
    },
  });
  return <MyBiddings bids={bids} />;
}
