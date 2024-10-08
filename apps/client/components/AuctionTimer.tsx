'use client';
import { bidStore } from '@/zustand/bidStore';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

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
        if (JSON.parse(event.data).type !== 'TIME_LEFT') {
        }
        const message = JSON.parse(event.data);
        if (message.type === 'TIME_LEFT') {
          setTimeLeft(message.timeLeft);
        }
        if (message.type === 'BID') {
          setCurrentAmount(message.bid.amount);
          addBid(message.bid);
          toast(`${message.bid.user.userName} bid ₹${message.bid.amount} `, {
            icon: '🟢',
          });
        }
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      socket.onerror = (error) => {
        toast.error('Error connecting to server. Please refresh the page.');
        console.error('WebSocket error', error);
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

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      const leftHours = hours % 24;
      return `${days}d ${leftHours}h ${minutes}m ${seconds}s`;
    }
    if (hours === 0) {
      return `${minutes}m ${seconds}s`;
    }
    if (hours === 0 && minutes === 0) {
      return `${seconds}s`;
    }
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {timeLeft !== null ? (
        timeLeft > 0 ? (
          <>
            <div>{formatTime(timeLeft)}</div>
          </>
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
