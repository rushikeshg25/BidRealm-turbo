import express from "express";
import { WebSocketServer } from "ws";
import url from "url";
import { AuctionManager } from "./AuctionManager";
import { User } from "./utils/SocketManager";

interface urlQuery {
  userId: string;
  auctionId: string;
}

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });
const auctionManager = new AuctionManager();

wss.on("connection", async function connection(ws, req) {
  ws.on("error", console.error);
  const queries = url.parse(req.url as string, true).query;
  const userId = queries.userId as string;
  const auctionId = queries.auctionId as string;

  auctionManager.addUsertoAuction(new User(ws, userId, auctionId));

  ws.on("close", () => {
    console.log("client disconnected");
  });
});
