import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

export default function Component() {
  return (
    <div className='flex flex-col min-h-screen dark:bg-background dark:text-foreground'>
      <header className='bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between'>
        <Link href='#' className='flex items-center gap-2' prefetch={false}>
          <GavelIcon className='w-6 h-6' />
          <span className='text-xl font-bold'>Auction House</span>
        </Link>
        <div className='flex-1 max-w-md mx-6'>
          <div className='relative'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search for items...'
              className='w-full pl-10 pr-4 py-2 rounded-md bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 dark:bg-muted/10 dark:text-foreground'
            />
          </div>
        </div>
        <nav className='hidden md:flex items-center gap-4'>
          <Link
            href='#'
            className='font-medium hover:text-primary-foreground/80 dark:hover:text-primary-foreground'
            prefetch={false}
          >
            Live Auctions
          </Link>
          <Link
            href='#'
            className='font-medium hover:text-primary-foreground/80 dark:hover:text-primary-foreground'
            prefetch={false}
          >
            Upcoming
          </Link>
          <Link
            href='#'
            className='font-medium hover:text-primary-foreground/80 dark:hover:text-primary-foreground'
            prefetch={false}
          >
            Closed
          </Link>
          <Link
            href='#'
            className='font-medium hover:text-primary-foreground/80 dark:hover:text-primary-foreground'
            prefetch={false}
          >
            About
          </Link>
        </nav>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' className='rounded-full'>
            <UserIcon className='w-5 h-5' />
            <span className='sr-only'>Account</span>
          </Button>
          <Button variant='ghost' size='icon' className='rounded-full'>
            <ShoppingCartIcon className='w-5 h-5' />
            <span className='sr-only'>Cart</span>
          </Button>
        </div>
      </header>
      <div className='flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-8 dark:bg-background'>
        <div className='bg-muted rounded-lg p-6 space-y-6 dark:bg-card dark:text-card-foreground'>
          <div>
            <h3 className='text-lg font-medium mb-2'>Categories</h3>
            <div className='space-y-2'>
              <Link
                href='#'
                className='block text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                prefetch={false}
              >
                Art
              </Link>
              <Link
                href='#'
                className='block text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                prefetch={false}
              >
                Collectibles
              </Link>
              <Link
                href='#'
                className='block text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                prefetch={false}
              >
                Electronics
              </Link>
              <Link
                href='#'
                className='block text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                prefetch={false}
              >
                Fashion
              </Link>
              <Link
                href='#'
                className='block text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                prefetch={false}
              >
                Home & Garden
              </Link>
              <Link
                href='#'
                className='block text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                prefetch={false}
              >
                Jewelry
              </Link>
              <Link
                href='#'
                className='block text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                prefetch={false}
              >
                Sports
              </Link>
              <Link
                href='#'
                className='block text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                prefetch={false}
              >
                Toys
              </Link>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium mb-2'>Filters</h3>
            <div className='space-y-2'>
              <div>
                <h4 className='text-sm font-medium mb-1'>Price</h4>
                <div className='flex items-center gap-2'>
                  <Input
                    type='number'
                    placeholder='Min'
                    className='w-full rounded-md bg-background border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:border-card dark:text-card-foreground'
                  />
                  <span className='text-muted-foreground dark:text-muted-foreground'>
                    -
                  </span>
                  <Input
                    type='number'
                    placeholder='Max'
                    className='w-full rounded-md bg-background border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:border-card dark:text-card-foreground'
                  />
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium mb-1'>Condition</h4>
                <div className='space-y-1'>
                  <Label className='flex items-center gap-2 font-normal dark:text-card-foreground'>
                    <Checkbox />
                    New
                  </Label>
                  <Label className='flex items-center gap-2 font-normal dark:text-card-foreground'>
                    <Checkbox />
                    Used
                  </Label>
                  <Label className='flex items-center gap-2 font-normal dark:text-card-foreground'>
                    <Checkbox />
                    Antique
                  </Label>
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium mb-1'>Time Left</h4>
                <div className='space-y-1'>
                  <Label className='flex items-center gap-2 font-normal dark:text-card-foreground'>
                    <Checkbox />
                    Less than 1 hour
                  </Label>
                  <Label className='flex items-center gap-2 font-normal dark:text-card-foreground'>
                    <Checkbox />
                    Less than 6 hours
                  </Label>
                  <Label className='flex items-center gap-2 font-normal dark:text-card-foreground'>
                    <Checkbox />
                    Less than 1 day
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium mb-2'>Live Auction</h3>
            <div className='bg-background rounded-lg p-4 space-y-4 dark:bg-card dark:text-card-foreground'>
              <div className='flex items-center justify-between'>
                <div>
                  <h4 className='text-sm font-medium'>Antique Vase</h4>
                  <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                    Ends in:
                  </p>
                </div>
                <div className='bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-medium dark:bg-primary dark:text-primary-foreground'>
                  12:34:56
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h4 className='text-sm font-medium'>Vintage Camera</h4>
                  <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                    Ends in:
                  </p>
                </div>
                <div className='bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-medium dark:bg-primary dark:text-primary-foreground'>
                  08:15:23
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h4 className='text-sm font-medium'>Classic Car</h4>
                  <p className='text-muted-foreground text-xs dark:text-muted-foreground'>
                    Ends in:
                  </p>
                </div>
                <div className='bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-medium dark:bg-primary dark:text-primary-foreground'>
                  01:45:09
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          <Card className='dark:bg-card dark:text-card-foreground'>
            <img
              src='/placeholder.svg'
              width={300}
              height={200}
              alt='Auction Item'
              className='rounded-t-lg object-cover w-full aspect-[3/2]'
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
      </div>
    </div>
  );
}

function GavelIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8' />
      <path d='m16 16 6-6' />
      <path d='m8 8 6-6' />
      <path d='m9 7 8 8' />
      <path d='m21 11-8-8' />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='8' cy='21' r='1' />
      <circle cx='19' cy='21' r='1' />
      <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  );
}
