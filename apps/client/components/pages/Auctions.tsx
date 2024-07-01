"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AuctionT = {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  image: string;
  categories: string;
};

const Auctions = ({ auctions }: { auctions: AuctionT[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      <Card className='dark:bg-card dark:text-card-foreground'>
        <img
          src='/placeholder.svg'
          width={300}
          className='rounded-t-lg object-cover w-full aspect-[3/2]'
          height={200}
          alt='Auction Item'
        />
        <CardContent className='p-4 space-y-2'>
          <h3 className='text-lg font-medium'>Antique Vase</h3>
          <p className='text-muted-foreground text-sm dark:text-muted-foreground'>
            A beautifully crafted antique vase from the 19th century.
          </p>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                Current Bid
              </p>
              <p className='text-lg font-medium'>$250</p>
            </div>
            <Button size='sm'>Bid</Button>
          </div>
        </CardContent>
      </Card>
      <Card className='dark:bg-card dark:text-card-foreground'>
        <img
          src='/placeholder.svg'
          width={300}
          height={200}
          alt='Auction Item'
          className='rounded-t-lg object-cover w-full aspect-[3/2]'
        />
        <CardContent className='p-4 space-y-2'>
          <h3 className='text-lg font-medium'>Vintage Camera</h3>
          <p className='text-muted-foreground text-sm dark:text-muted-foreground'>
            A well-preserved vintage camera from the 1960s.
          </p>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                Current Bid
              </p>
              <p className='text-lg font-medium'>$150</p>
            </div>
            <Button size='sm'>Bid</Button>
          </div>
        </CardContent>
      </Card>
      <Card className='dark:bg-card dark:text-card-foreground'>
        <img
          src='/placeholder.svg'
          width={300}
          height={200}
          alt='Auction Item'
          className='rounded-t-lg object-cover w-full aspect-[3/2]'
        />
        <CardContent className='p-4 space-y-2'>
          <h3 className='text-lg font-medium'>Classic Car</h3>
          <p className='text-muted-foreground text-sm dark:text-muted-foreground'>
            A beautifully restored classic car from the 1950s.
          </p>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                Current Bid
              </p>
              <p className='text-lg font-medium'>$15,000</p>
            </div>
            <Button size='sm'>Bid</Button>
          </div>
        </CardContent>
      </Card>
      <Card className='dark:bg-card dark:text-card-foreground'>
        <img
          src='/placeholder.svg'
          width={300}
          height={200}
          alt='Auction Item'
          className='rounded-t-lg object-cover w-full aspect-[3/2]'
        />
        <CardContent className='p-4 space-y-2'>
          <h3 className='text-lg font-medium'>Vintage Typewriter</h3>
          <p className='text-muted-foreground text-sm dark:text-muted-foreground'>
            A fully functional vintage typewriter from the 1940s.
          </p>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                Current Bid
              </p>
              <p className='text-lg font-medium'>$100</p>
            </div>
            <Button size='sm'>Bid</Button>
          </div>
        </CardContent>
      </Card>
      <Card className='dark:bg-card dark:text-card-foreground'>
        <img
          src='/placeholder.svg'
          width={300}
          height={200}
          alt='Auction Item'
          className='rounded-t-lg object-cover w-full aspect-[3/2]'
        />
        <CardContent className='p-4 space-y-2'>
          <h3 className='text-lg font-medium'>Antique Jewelry Box</h3>
          <p className='text-muted-foreground text-sm dark:text-muted-foreground'>
            A beautifully crafted antique jewelry box from the 18th century.
          </p>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                Current Bid
              </p>
              <p className='text-lg font-medium'>$500</p>
            </div>
            <Button size='sm'>Bid</Button>
          </div>
        </CardContent>
      </Card>
      <Card className='dark:bg-card dark:text-card-foreground'>
        <img
          src='/placeholder.svg'
          width={300}
          height={200}
          alt='Auction Item'
          className='rounded-t-lg object-cover w-full aspect-[3/2]'
        />
        <CardContent className='p-4 space-y-2'>
          <h3 className='text-lg font-medium'>Vintage Record Player</h3>
          <p className='text-muted-foreground text-sm dark:text-muted-foreground'>
            A fully functional vintage record player from the 1970s.
          </p>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                Current Bid
              </p>
              <p className='text-lg font-medium'>$200</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auctions;
