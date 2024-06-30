"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BidDialogProps {
  currentPrice: number;
  auctionId: string;
  userId: string;
  handleModal: () => void;
  value: boolean;
  socket: WebSocket | null;
  startPrice: number;
}

const BidDialog = ({
  currentPrice,
  startPrice,
  auctionId,
  userId,
  handleModal,
  value,
  socket,
}: BidDialogProps) => {
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        // console.log(event);
        const message = JSON.parse(event.data);
        console.log(message);
        if (message.type === "BID") {
          console.log(" Hello");

          toast(`${message.bid.user.userName} bid ₹${message.bid.amount} `, {
            icon: "🟢",
          });
        }
        if (message.type === "JOINED") {
          console.log("HELLO");
          toast(`${message.data} `, {
            icon: "🟢",
          });
        }
      };
    }
  }, [auctionId]);

  const dialogSchema = z.object({
    amount: z
      .string()
      .nonempty()
      .refine((val) => Number(val) > currentPrice && Number(val) > startPrice, {
        message: "Amount must be more than current price",
      }),
    confirm: z.string().refine((val) => val === "BID", {
      message: "Type 'BID' in Uppercase to confirm",
    }),
  });
  const form = useForm<z.infer<typeof dialogSchema>>({
    resolver: zodResolver(dialogSchema),
  });

  const onSubmit = async (Formdata: z.infer<typeof dialogSchema>) => {
    console.log("socket", socket);
    socket?.send(
      JSON.stringify({ type: "bid", amount: Number(Formdata.amount) })
    );
    handleModal();
  };

  return (
    <Dialog open={value} onOpenChange={handleModal}>
      <DialogTrigger asChild>
        <Button size='lg' className='w-full'>
          Place Bid
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Place your Bid</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter the amount you want to bid'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter "BID" to confirm' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Bid
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BidDialog;
