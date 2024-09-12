import { z } from 'zod';

export enum AuctionStatus {
  ACTIVE,
  ENDED,
  CANCELLED,
  INACTIVE,
}

export const Auctionschema = z
  .object({
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(50, { message: 'Title is too long' }),
    description: z.string().min(1, { message: 'Description is required' }),
    startingPrice: z.number().min(1, { message: 'Starting price is required' }),
    startDate: z.date().refine((date) => date > new Date(), {
      message: 'Start value  must be in the future',
    }),
    endDate: z.date().refine((date) => date > new Date(), {
      message: 'End value must be in the future',
    }),
    Categories: z.string().nonempty({ message: 'Category cannot be Empty' }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End value must be after start value',
    path: ['endDate'],
  });

export type AuctionT = z.infer<typeof Auctionschema>;

export type bidT = {
  id: string;
  amount: number;
  createdAt: Date;
  userId: string;
  auctionId: string;
};

export type auctionType = {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  startDate: Date;
  endDate: Date;
  status: 'INACTIVE' | 'ACTIVE ' | 'ENDED';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  image: string;
  categories: 'COLLECTABLES' | 'WATCHES' | 'FASHION';
  bids: bidT[];
  user: {
    id: string;
    userName: string;
    email: string;
    hashedPassword: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
