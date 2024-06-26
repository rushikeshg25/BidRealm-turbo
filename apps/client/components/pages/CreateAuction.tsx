"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

export enum Categories {
  Art,
  Collectables,
  Electronics,
  Vechicles,
  Watches,
  Fashion,
  Shoes,
}

const CreateAuction = () => {
  const router = useRouter();
  const [category, setCategory] = useState<any>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AuctionT>({
    resolver: zodResolver(Auctionschema),
  });
  const startDateHandler = (date: Date) => {
    setStartDate(date);
    setValue("startDate", date);
  };
  const endDateHandler = (date: Date) => {
    setEndDate(date);
    setValue("endDate", date);
  };

  useEffect(() => {
    setValue("startDate", startDate);
  }, [startDate]);
  useEffect(() => {
    setValue("endDate", endDate);
  }, [endDate]);
  useEffect(() => {
    setValue("categories", category);
  }, [category]);

  const onSubmit = (data: AuctionT) => {
    console.log(data);
  };
  return (
    <div className='max-w-4xl px-4 py-10 mx-auto mt-10 sm:px-6 lg:px-8 dark:border'>
      <h1 className='mb-6 text-3xl font-bold'>Create New Auction</h1>
      <form
        className='grid grid-cols-1 gap-6 md:grid-cols-2 w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
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
                setCategory(value);
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
            {errors.categories && (
              <p className='text-red-500'>{errors.categories.message}</p>
            )}
          </div>
        </div>
        <div className='grid gap-4'>
          <div className='flex items-center justify-center'>
            <ImageUpload />
          </div>
        </div>
        <div className='flex justify-end gap-2 mt-8 w-full'>
          <Button type='submit'>Publish</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAuction;
