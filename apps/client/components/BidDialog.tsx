"use client";
import React, { useState } from "react";
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
import { createBid } from "@/actions/CreateBid";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface BidDialogProps {
  currentPrice: number;
  auctionId: string;
  userId: string;
  handleModal: () => void;
  value: boolean;
}

const BidDialog = ({
  currentPrice,
  auctionId,
  userId,
  handleModal,
  value,
}: BidDialogProps) => {
  const [amount, setAmount] = useState<string>("");
  const { mutate: server_createBid } = useMutation({
    mutationFn: () => createBid(auctionId, Number(amount), userId),
    onSuccess: () => {
      toast.success("Bid created successfully");
    },
    onError: (error) => {
      toast.error("Error placing bid. Try again!");
    },
  });
  const dialogSchema = z.object({
    amount: z
      .string()
      .nonempty()
      .refine((val) => Number(val) > currentPrice, {
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
    setAmount(Formdata.amount);
    await server_createBid();
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
