import MyAuctions from "@/components/pages/MyAuctions";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import prisma from "@repo/db";

export default async function Page() {
  const { session, user } = await getAuth();
  if (!session) {
    redirect("/sign-in");
  }

  const Auctions = await prisma.auction.findMany({
    where: {
      userId: user.id,
    },
    include: {
      bids: true,
    },
  });

  return <MyAuctions user={user} Auctions={Auctions} />;
}
