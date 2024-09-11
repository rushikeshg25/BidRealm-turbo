'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { bidStore } from '@/zustand/bidStore';
import { AuctionWithBidsWithUsersAndUserT } from '@repo/db/types';
import date from 'date-and-time';
import { User } from 'lucia';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuctionTimer from '../AuctionTimer';
import BidDialog from '../BidDialog';
import { Button } from '../ui/button';

const WS_URL = process.env.WS_URL ?? 'ws://localhost:8080';

const Auction = ({
  user,
  auction,
}: {
  user: User | null;
  auction: AuctionWithBidsWithUsersAndUserT;
}) => {
  const [userInfo, setUserInfo] = useState<User | null | undefined>(user);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { initBids, bids, currentAmount, setCurrentAmount } = bidStore();

  useEffect(() => {
    setCurrentAmount(auction.currentPrice);
    initBids(auction.bids);
    if (!user) {
      setUserInfo({
        id: 'test',
        email: 'test@test.com',
      });
    }
  }, [user]);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?userId=${user?.id}&auctionId=${auction.id}`
    );

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [user, auction.id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center h-full p-4 bg-background md:p-8'>
      <div className='grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-center  rounded-lg relative w-full h-full  border border--card dark:border--card'>
            <Image
              src={auction.image}
              alt={auction.title}
              width={250}
              height={250}
              className='object-cover p-3 '
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-bold'>{auction.title}</h1>
            <h2 className='text-muted-foreground'>
              Item listed by: {auction.user.userName}
            </h2>
            <p className='text-muted-foreground'>{auction.description}</p>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2 p-6 rounded-lg bg-card'>
            <div className='flex items-center justify-between'>
              <span className='text-lg font-semibold'>Current Bid</span>
              <span className='text-2xl font-bold text-primary'>
                ₹{currentAmount.toLocaleString()}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-lg font-semibold'>Time Left</span>
              <span className='text-2xl font-bold text-primary'>
                <AuctionTimer
                  auctionId={auction.id}
                  userId={userInfo?.id as string}
                  socket={socket}
                />
              </span>
            </div>
            {user?.id == auction.userId ? (
              <Button disabled={true}>This Auction is Listed by You!</Button>
            ) : userInfo?.id !== 'test' ? (
              bids[0]?.user.id === user?.id ? (
                <Button disabled={true}>You hold the highest bid</Button>
              ) : (
                <BidDialog
                  handleModal={handleModal}
                  value={isModalOpen}
                  startPrice={auction.currentPrice}
                  currentPrice={auction.currentPrice}
                  auctionId={auction.id}
                  userId={userInfo?.id as string}
                  socket={socket}
                />
              )
            ) : (
              <Button
                onClick={() => router.push('/sign-in')}
                className='w-full'
              >
                Login to Place a Bid
              </Button>
            )}
          </div>
          <div className='flex flex-col gap-4 p-6 rounded-lg bg-card'>
            <h2 className='text-xl font-bold'>Bid History</h2>
            <Table containerClassname='h-fit max-h-80 overflow-y-auto relative dark:border--card rounded-xl border border--card dark:border'>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Bidder</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bids.map((bid, index) => (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>
                      {bid.user.userName}
                    </TableCell>
                    <TableCell>
                      {date.format(
                        new Date(bid.createdAt),
                        'YYYY/MM/DD HH:mm:ss'
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      ₹{bid.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
