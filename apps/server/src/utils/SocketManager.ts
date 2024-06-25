import { WebSocket } from "ws";

export class User {
  public userId: string;
  public socket: WebSocket;
  public auctionId: string;
  constructor(socket: WebSocket, userId: string, auctionId: string) {
    this.socket = socket;
    this.userId = userId;
    this.auctionId = auctionId;
  }
}

class SocketManager {
  private static instance: SocketManager;

  static getInstance() {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }

    SocketManager.instance = new SocketManager();
    return SocketManager.instance;
  }
}
