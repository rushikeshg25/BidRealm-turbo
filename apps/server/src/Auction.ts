import date from "date-and-time";
export interface bids {
  amount: number;
  userId: String;
  createdAt: Date;
  auctionId: string;
}

export class Auction {
  public auctionId: string;
  public users: string[];
  public currentPrice: number;
  public startDate: Date;
  public endDate: Date;
  public bids: bids[];
  public curentBidder: string;
  public timeLeft: number;

  constructor(
    auctionId: string,
    curentBidder: string,
    currentPrice: number,
    startDate: Date,
    endDate: Date,
    bids: bids[]
  ) {
    this.auctionId = auctionId;
    this.users = [];
    this.currentPrice = currentPrice;
    this.startDate = startDate;
    this.endDate = endDate;
    this.bids = bids;
    this.curentBidder = curentBidder;
    this.timeLeft = date.subtract(endDate, startDate).toHours();
  }
}
