import { PrismaClient, AuctionStatus } from "@prisma/client";

const client = new PrismaClient();

export const db = client;
export const AuctionStatusHelper = AuctionStatus;
