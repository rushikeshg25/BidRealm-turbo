import { z } from "zod";

export enum AuctionStatus {
  ACTIVE,
  ENDED,
  CANCELLED,
  INACTIVE,
}

export enum Categories {
  UNDEFINED,
  ART,
  COLLECTIBLES,
  ELECTRONICS,
  VECHICLES,
  WATCHES,
  FASHION,
  SHOES,
}

export const Auctionschema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    startDate: z.date().refine((date) => date > new Date(), {
      message: "Start value  must be in the future",
    }),
    endDate: z.date().refine((date) => date > new Date(), {
      message: "End value must be in the future",
    }),
    categories: z.string().nonempty({ message: "Required" }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End value must be after start value",
    path: ["endDate"],
  });

export type AuctionT = z.infer<typeof Auctionschema>;
