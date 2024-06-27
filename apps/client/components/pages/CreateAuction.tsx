"use client";

import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Auctionschema, AuctionT } from "@/types/auction";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "../ui/select";
import ImageUpload from "../ImageUpload";
import DateTimePickerComponent from "../ui/DateTimePickerComponent";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createAuction } from "@/actions/CreateAuction";
import { User } from "lucia";
import toast from "react-hot-toast";

export enum Categories {
  ART,
  COLLECTABLES,
  ELECTRONICS,
  VECHICLES,
  WATCHES,
  FASHION,
  SHOES,
}

const CreateAuction = ({ user }: { user: User }) => {
  const router = useRouter();
  const [category, setCategory] = useState<any>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [imgUrl, setImgUrl] = useState<string>("");
  const [data, setData] = useState<AuctionT>({
    title: "",
    description: "",
    startingPrice: 0,
    startDate: new Date(),
    endDate: new Date(),
    Categories: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AuctionT>({
    resolver: zodResolver(Auctionschema),
  });

  const { mutate: server_createAuction } = useMutation({
    mutationFn: async () => {
      return await createAuction(data, imgUrl, user?.id as string);
    },
    onSuccess: (data) => {
      toast.success("Auction created successfully!");
      router.push("/my-auctions");
    },
    onError: (error) => {
      toast.error("We couldn't create your auction. Please try again.");
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  const startDateHandler = (date: Date) => {
    setStartDate(date);
    setValue("startDate", date);
  };
  const endDateHandler = (date: Date) => {
    setEndDate(date);
    setValue("endDate", date);
  };
  const ImageURL = (url: string) => {
    setImgUrl(url);
  };

  useEffect(() => {
    setValue("startDate", startDate);
  }, [startDate]);
  useEffect(() => {
    setValue("endDate", endDate);
  }, [endDate]);
  useEffect(() => {
    setValue("Categories", category);
  }, [category]);

  const onSubmit = async (data: AuctionT) => {
    setData(() => data);
    await server_createAuction();
  };
  return (
    <div className='max-w-4xl px-4 py-5 mx-auto mt-10 sm:px-6 lg:px-8 dark:border border rounded-lg'>
      <h1 className='mb-6 text-3xl font-bold'>Create New Auction</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 w-full'>
          <div className='grid gap-4'>
            <div>
              <Label htmlFor='title'>Title</Label>
              <Input {...register("title")} placeholder='Enter auction title' />
              {errors.title && (
                <p className='text-red-500'>{errors.title.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                {...register("description")}
                placeholder='Enter auction description'
              />
              {errors.description && (
                <p className='text-red-500'>{errors.description.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor='description'>Starting Price</Label>
              <Input
                type='number'
                id='startingPrice'
                onChange={(e) => {
                  setValue("startingPrice", Number(e.target.value));
                }}
                placeholder='Enter starting Bid price'
              />
              {errors.startingPrice && (
                <p className='text-red-500'>{errors.startingPrice.message}</p>
              )}
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <div>
                <Label htmlFor='start-date'>Start Date &Time</Label>
                <DateTimePickerComponent Datehandler={startDateHandler} />
                {errors.startDate && (
                  <p className='text-red-500'>{errors.startDate.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor='end-date'>End Date & Time</Label>
                <DateTimePickerComponent Datehandler={endDateHandler} />
                {errors.endDate && (
                  <p className='text-red-500'>{errors.endDate.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor='categories'>Categories</Label>
              <Select
                onValueChange={(value) => {
                  setCategory(value.toUpperCase());
                }}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select categories' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='Electronics'>Electronics</SelectItem>
                    <SelectItem value='Collectables'>Collectables</SelectItem>
                    <SelectItem value='Art'>Art</SelectItem>
                    <SelectItem value='Fashion'>Fashion</SelectItem>
                    <SelectItem value='Vechicles'>Vehicles</SelectItem>
                    <SelectItem value='Watches'>Watches</SelectItem>
                    <SelectItem value='Shoes'>Shoes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.Categories && (
                <p className='text-red-500'>{errors.Categories.message}</p>
              )}
            </div>
          </div>
          <div className='grid gap-4 h-full'>
            <div className='flex items-center justify-center h-full'>
              <ImageUpload ImageURL={ImageURL} />
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <Button type='submit'>Publish</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAuction;
