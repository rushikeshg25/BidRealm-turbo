import { Auction, AuctionStatus, bids } from "./Auction";
import { User } from "./utils/SocketManager";
import { db } from "./db";
import { WebSocket } from "ws";
export class AuctionManager {
  public auctions: Map<string, Auction>; //{auctionid:Auction Class's instance}

  constructor() {
    this.auctions = new Map<string, Auction>();
  }

  public async addUsertoAuction(user: User) {
    if (!this.auctions.get(user.auctionId)) {
      // If no auction instance is found, create a new one and add the user to it
      const auction = await db.auction.findUnique({
        where: {
          id: user.auctionId,
        },
        include: {
          bids: {
            orderBy: { createdAt: "desc" },
          },
        },
      });
      this.auctions.set(
        user.auctionId,
        new Auction(
          user.auctionId,
          auction?.bids[0]?.userId as string,
          auction?.currentPrice as number,
          auction?.startDate as Date,
          auction?.endDate as Date,
          auction?.bids as bids[],
          auction?.status as unknown as AuctionStatus
        )
      );
    }
    this.auctions.get(user.auctionId)?.addUser(user);
    this.addHandler(user);
  }

  public isAuctionWsActive(AuctionId: string): boolean {
    return this.auctions.has(AuctionId);
  }

  removeHandler(ws: WebSocket, userId: string, auctionId: string) {
    if (this.auctions.get(auctionId)) {
      this.auctions.get(auctionId)?.removeUser(userId);
    }
  }

  private addHandler(user: User) {
    user.socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
    });
  }
}
