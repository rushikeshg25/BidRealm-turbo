import { useEffect, useState } from "react";

interface User {
  userId: string;
  auctionId: string;
}

const WS_URL = process.env.WS_URL ?? "ws://localhost:8080";

export const useSocket = ({ userId, auctionId }: User) => {
  console.log(userId, auctionId);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?userId=${userId}&auctionId=${auctionId}`
    );

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);
  console.log("socket", socket);
  return socket;
};
