"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import ImageUpload from "@/components/ImageUpload";
import DateTimePickerComponent from "@/components/ui/DateTimePickerComponent";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.date().refine((date) => date > new Date(), {
    message: "Start date must be in the future",
  }),
  endDate: z.date().refine(
    (date, ctx) => {
      if (ctx.parent.startDate && date <= ctx.parent.startDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date must be after start date",
    }
  ),
  categories: z.string().min(1, { message: "Category is required" }),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold mb-6'>Create New Auction</h1>
      <form
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='grid gap-4'>
          <div>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              {...register("title")}
              placeholder='Enter auction title'
            />
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
              <Label htmlFor='start-date'>Start Time</Label>
              <DateTimePickerComponent {...register("startDate")} />
              {errors.startDate && (
                <p className='text-red-500'>{errors.startDate.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor='end-date'>End Date</Label>
              <DateTimePickerComponent {...register("endDate")} />
              {errors.endDate && (
                <p className='text-red-500'>{errors.endDate.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor='categories'>Categories</Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder='Select categories'
                  {...register("categories")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Electronics</SelectLabel>
                  <SelectItem value='laptops'>Laptops</SelectItem>
                  <SelectItem value='smartphones'>Smartphones</SelectItem>
                  <SelectItem value='tablets'>Tablets</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Home & Garden</SelectLabel>
                  <SelectItem value='furniture'>Furniture</SelectItem>
                  <SelectItem value='decor'>Decor</SelectItem>
                  <SelectItem value='appliances'>Appliances</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Fashion</SelectLabel>
                  <SelectItem value='clothing'>Clothing</SelectItem>
                  <SelectItem value='accessories'>Accessories</SelectItem>
                  <SelectItem value='shoes'>Shoes</SelectItem>
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
      </form>
      <div className='mt-8 flex justify-end gap-2'>
        <Button variant='outline'>Cancel</Button>
        <Button type='submit' className=''>
          Publish
        </Button>
      </div>
    </div>
  );
}
