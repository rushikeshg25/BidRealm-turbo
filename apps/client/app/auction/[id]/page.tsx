import Auction from '@/components/pages/Auction';
import { getAuth } from '@/lib/auth';
import prisma from '@repo/db';
import { AuctionWithBidsWithUsersAndUserT } from '@repo/db/types';
import Link from 'next/link';

const page = async ({ params }: { params: { id: string } }) => {
  const { user } = await getAuth();
  const auction = await prisma.auction.findUnique({
    where: {
      id: params.id,
    },
    include: {
      bids: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      user: true,
    },
  });

  if (!auction)
    return (
      <div className='flex flex-col items-center justify-center text-lg'>
        Auction not found!{' '}
        <div>
          Return to{' '}
          <Link href={'/'} className='underline underline-offset-2'>
            Home Page{' '}
          </Link>
        </div>
      </div>
    );

  return (
    <Auction
      user={user}
      auction={auction as AuctionWithBidsWithUsersAndUserT}
    />
  );
};

export default page;
