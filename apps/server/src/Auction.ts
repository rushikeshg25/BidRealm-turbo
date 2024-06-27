import date from "date-and-time";
import { User } from "./utils/SocketManager";
export interface bids {
  amount: number;
  userId: String;
  createdAt: Date;
  auctionId: string;
}

export enum AuctionStatus {
  ENDED,
  ACTIVE,
  INACTIVE,
  CANCELLED,
}

export class Auction {
  public auctionId: string;
  public users: User[];
  public currentPrice: number;
  public startDate: Date;
  public endDate: Date;
  public bids: bids[];
  public curentBidder: string;
  public timeLeft: number;
  public status: AuctionStatus;

  constructor(
    auctionId: string,
    curentBidder: string,
    currentPrice: number,
    startDate: Date,
    endDate: Date,
    bids: bids[],
    status: AuctionStatus
  ) {
    this.auctionId = auctionId;
    this.users = [];
    this.currentPrice = currentPrice;
    this.startDate = startDate;
    this.endDate = endDate;
    this.bids = bids;
    this.curentBidder = curentBidder;
    this.timeLeft = date.subtract(endDate, startDate).toHours();
    this.status = status;
  }

  addUser(user: User) {
    this.users.push(user);
  }
  removeUser(userId: string) {
    this.users.filter((user) => user.userId !== userId);
  }

  broadcastToAuctionAllParticipants(message: string) {
    if (this.users.length === 0) return;
    this.users.forEach((user) => {
      user.socket.send(message);
    });
  }

  broadcastToAllAuctionParticipantsExcepetUser(message: string, curUser: User) {
    if (this.users.length === 0) return;
    this.users.forEach((user) => {
      if (user.userId !== curUser.userId) {
        user.socket.send(message);
      }
    });
  }
}
