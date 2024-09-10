import MyAuctions from '@/components/pages/MyAuctions';
import { getAuth } from '@/lib/auth';
import prisma from '@repo/db';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const { session, user } = await getAuth();
  if (!session) {
    redirect('/sign-in');
  }
  const search = searchParams?.query || '';
  const Auctions = await prisma.auction.findMany({
    where: {
      userId: user.id,
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
    include: {
      bids: true,
    },
  });

  return <MyAuctions user={user} Auctions={Auctions} />;
}
