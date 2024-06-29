import { Auction, AuctionStatus, bids } from "./Auction";
import { User } from "./utils/SocketManager";
import { db } from "./db";
import { WebSocket } from "ws";
import { BID, EXITAUCTION } from "./utils/messages";

export class AuctionManager {
  public auctions: Map<string, Auction>;

  constructor() {
    this.auctions = new Map<string, Auction>();
  }

  public async addUsertoAuction(user: User) {
    if (!this.auctions.get(user.auctionId)) {
      const auction = await db.auction.findUnique({
        where: { id: user.auctionId },
        include: { bids: { orderBy: { createdAt: "desc" } } },
      });
      const auctionInstance = new Auction(
        user.auctionId,
        auction?.bids[0]?.userId as string,
        auction?.currentPrice as number,
        auction?.startDate as Date,
        auction?.endDate as Date,
        auction?.bids as bids[],
        auction?.status as unknown as AuctionStatus
      );
      this.auctions.set(user.auctionId, auctionInstance);
    }

    const auction = this.auctions.get(user.auctionId);
    auction?.addUser(user);

    const timeLeft = auction?.calculateTimeLeft();
    user.socket.send(JSON.stringify({ type: "TIME_LEFT", timeLeft }));

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

      if (message.type === BID) {
        // Handle bid
      }
      if (message.type === EXITAUCTION) {
        // Handle exit auction
      }
    });

    setInterval(() => {
      const auction = this.auctions.get(user.auctionId);
      if (auction) {
        const timeLeft = auction.calculateTimeLeft();
        auction.broadcastToAuctionAllParticipants(
          JSON.stringify({ type: "TIME_LEFT", timeLeft })
        );
      }
    }, 1000); // Update every second
  }
}
