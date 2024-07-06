"use client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const param = new URLSearchParams(searchParams);
  const [status, setStatus] = useState<string>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [createdAt, setCreatedAt] = useState<string>();
  const [categories, setCategories] = useState<string[]>([]);

  const clearFiltersHandler = () => {
    setStatus(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setCreatedAt(undefined);
    setCategories([]);
    param.delete("s"); // status
    param.delete("min"); // min price
    param.delete("max"); // max price
    param.delete("createdAt");
    param.delete("categories");
    router.replace(`${pathname}?${param.toString()}`);
  };

  const applyFiltersHandler = () => {
    if (status) param.set("s", status);
    else param.delete("s");

    if (minPrice) param.set("min", minPrice.toString());
    else param.delete("min");

    if (maxPrice) param.set("max", maxPrice.toString());
    else param.delete("max");

    if (createdAt) param.set("createdAt", createdAt);
    else param.delete("createdAt");

    if (categories.length > 0) param.set("categories", categories.join(","));
    else param.delete("categories");

    router.replace(`${pathname}?${param.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
    applyFiltersHandler();
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus((prevStatus) =>
      prevStatus === newStatus ? undefined : newStatus
    );
    applyFiltersHandler();
  };

  const handleCreatedAtChange = (newCreatedAt: string) => {
    setCreatedAt((prevCreatedAt) =>
      prevCreatedAt === newCreatedAt ? undefined : newCreatedAt
    );
    applyFiltersHandler();
  };

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
                {[
                  "Clothing",
                  "Electronics",
                  "Home & Garden",
                  "Sports & Outdoors",
                  "Toys & Games",
                ].map((category) => (
                  <Label
                    key={category}
                    className='flex items-center gap-2 font-normal'
                  >
                    <Checkbox
                      checked={categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2'>
              <div className='flex flex-row gap-2 w-full h-full'>
                <div className='p-1'>
                  <Input
                    placeholder='Min'
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    onBlur={applyFiltersHandler}
                  />
                </div>
                <div className='grid items-center'>
                  <div className='text-muted-foreground dark:text-muted-foreground'>
                    -
                  </div>
                </div>
                <div className='p-1'>
                  <Input
                    placeholder='Max'
                    value={maxPrice || ""}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    onBlur={applyFiltersHandler}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Created</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-1'>
              {[
                "12 hrs ago",
                "2 days ago",
                "4 days ago",
                "7 days ago",
                "14 days ago",
                "20 days ago",
              ].map((time) => (
                <div key={time} className='flex items-center space-x-2'>
                  <Checkbox
                    id={time}
                    checked={createdAt === time}
                    onChange={() => handleCreatedAtChange(time)}
                  />
                  <label
                    htmlFor={time}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {time}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-4'>
            <AccordionTrigger>Status</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-1'>
              {["Active", "Ended", "Yet to Start"].map((state) => (
                <div key={state} className='flex items-center space-x-2'>
                  <Checkbox
                    id={state}
                    checked={status === state}
                    onChange={() => handleStatusChange(state)}
                  />
                  <label
                    htmlFor={state}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {state}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Filters;
