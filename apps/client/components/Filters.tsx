"use client";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Slider } from "./ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const clearFiltersHandler = () => {};

  return (
    <div className='bg-muted rounded-lg p-6 space-y-6 dark:bg-card dark:text-card-foreground'>
      <div>
        <div className='flex flex-row justify-between h-full'>
          <div className='grid items-center'>
            <h3 className='text-lg font-medium mb-2 '>Filters</h3>
          </div>
          <button
            className='text-muted-foreground text-sm'
            onClick={clearFiltersHandler}
          >
            Clear
          </button>
        </div>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className='grid gap-2'>
                <Label className='flex items-center gap-2 font-normal'>
                  <Checkbox />
                  Clothing
                </Label>
                <Label className='flex items-center gap-2 font-normal'>
                  <Checkbox />
                  Electronics
                </Label>
                <Label className='flex items-center gap-2 font-normal'>
                  <Checkbox />
                  Home & Garden
                </Label>
                <Label className='flex items-center gap-2 font-normal'>
                  <Checkbox />
                  Sports & Outdoors
                </Label>
                <Label className='flex items-center gap-2 font-normal'>
                  <Checkbox />
                  Toys & Games
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2'>
              <div className='flex flex-row gap-2 w-full h-full'>
                <Input placeholder='Min' />
                <div className='grid items-center'>
                  <div className='text-muted-foreground dark:text-muted-foreground'>
                    -
                  </div>
                </div>
                <Input placeholder='Max' />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Created</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-1'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  12 hrs ago
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  2 days ago
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  4 days ago
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  7 days ago
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  14 days ago
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  20 days ago
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Status</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-1'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Active
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Ended
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Yet to Start
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Filters;
