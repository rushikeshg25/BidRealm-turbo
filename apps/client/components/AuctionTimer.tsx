"use client";
import { bidStore } from "@/zustand/bidStore";
import { CloudCog } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

const AuctionTimer = ({
  auctionId,
  userId,
  socket,
}: {
  auctionId: string;
  userId: string;
  socket: WebSocket | null;
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<any>(null);
  const { addBid, setCurrentAmount } = bidStore();
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        if (JSON.parse(event.data).type !== "TIME_LEFT") {
          console.log(" here");
        }
        const message = JSON.parse(event.data);
        if (message.type === "TIME_LEFT") {
          setTimeLeft(message.timeLeft);
        }
        if (message.type === "BID") {
          console.log(" reqs");
          setCurrentAmount(message.bid.amount);
          addBid(message.bid);
          toast(`${message.bid.user.userName} bid ₹${message.bid.amount} `, {
            icon: "🟢",
          });
        }
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socket.onerror = (error) => {
        toast.error("Error connecting to server. Please refresh the page.");
        console.error("WebSocket error", error);
      };

      return () => {
        if (socket) {
          socket.close();
        }
        clearInterval(timerRef.current);
      };
    }
  }, [socket, auctionId, userId]);

  useEffect(() => {
    if (timeLeft !== null) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) =>
          Math.max((prevTimeLeft as number) - 1000, 0)
        );
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [timeLeft]);

  const formatTime = (milliseconds: any) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {timeLeft !== null ? (
        timeLeft > 0 ? (
          <div>{formatTime(timeLeft)}</div>
        ) : (
          <div>Ended</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AuctionTimer;
