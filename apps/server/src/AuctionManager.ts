import { WebSocket } from "ws";

export class BidManager {
  private bids: Map<string, WebSocket> = new Map();

  public addBid(bid: WebSocket) {
    this.bids.set(bid.id, bid);
  }

  public removeBid(bid: WebSocket) {
    this.bids.delete(bid.id);
  }

  public getBids(): WebSocket[] {
    return Array.from(this.bids.values());
  }
}
