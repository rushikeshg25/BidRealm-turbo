import prisma from "@repo/db";

export class Bid {
  public auctionId: string;
  public users: string[];
  public amount: number;
  public curentBidder: string;
  public timeLeft: number;

  constructor(
    auctionId: string,
    amount: number,
    users: string[],
    curentBidder: string,
    timeLeft: number
  ) {
    this.auctionId = auctionId;
    this.users = users;
    this.amount = amount;
    this.curentBidder = curentBidder;
    this.timeLeft = timeLeft;
  }
}
