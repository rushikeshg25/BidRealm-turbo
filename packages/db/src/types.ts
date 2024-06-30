import { Bid, Auction, AuctionStatus, User, Prisma } from "@prisma/client";

import prisma from "./index";

export type BidT = Bid;
export type AuctionT = Auction;
export type AuctionStatusT = AuctionStatus;
export type UserT = User;

export type AuctionWithBidsandUserT = Prisma.AuctionGetPayload<{
  include: {
    bids: true;
    user: true;
  };
}>;

export type AuctionWithBidsT = Prisma.AuctionGetPayload<{
  include: {
    bids: true;
  };
}>;

export type AuctionWithUserT = Prisma.AuctionGetPayload<{
  include: {
    user: true;
  };
}>;

export type UserwithAuctionT = Prisma.UserGetPayload<{
  include: {
    auctions: true;
  };
}>;

export type UserwithBidsT = Prisma.UserGetPayload<{
  include: {
    bids: true;
  };
}>;

export type AuctionWithBidsWithUsersAndUserT = Prisma.AuctionGetPayload<{
  include: {
    bids: {
      include: {
        user: true;
      };
    };
    user: true;
  };
}>;

export type BidsWithUser = Prisma.BidGetPayload<{
  include: {
    user: true;
  };
}>;
