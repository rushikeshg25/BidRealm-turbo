import { Auction, bids } from "./Auction";
import { User } from "./utils/SocketManager";
import { db } from "./db";
export class AuctionManager {
  public auctions: Map<string, Auction>; //{auctionid:Auction Class's instance}

  constructor() {
    this.auctions = new Map<string, Auction>();
  }

  public async addUsertoAuction(user: User) {
    if (!this.auctions.get(user.auctionId)) {
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
          auction?.bids as bids[]
        )
      );
    }
  }

  public isAuctionWsActive(AuctionId: string): boolean {
    return this.auctions.has(AuctionId);
  }

  private addHandler(user: User) {}
}
