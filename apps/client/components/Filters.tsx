"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const param = new URLSearchParams(searchParams);
  const [status, setStatus] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  const [categories, setCategories] = useState<string[]>([]);

  const clearFiltersHandler = () => {
    setStatus([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setCategories([]);
    param.delete("s"); // status
    param.delete("min"); // min pric
    param.delete("max"); // max price
    param.delete("categories");
    router.replace(`${pathname}?${param.toString()}`);
  };

  useEffect(() => {
    applyFiltersHandler();
  }, [status, categories, minPrice, maxPrice]);

  useEffect(() => {
    if (param.get("s")) setStatus(param.get("s")?.split(",") as string[]);
    if (param.get("categories"))
      setCategories(param.get("categories")?.split(",") as string[]);

    if (param.get("min")) setMinPrice(Number(param.get("min")));
    if (param.get("max")) setMaxPrice(Number(param.get("max")));
  }, []);
  const applyFiltersHandler = () => {
    if (status.length) param.set("s", status.join(","));
    else param.delete("s");
    if (minPrice) param.set("min", minPrice.toString());
    else param.delete("min");

    if (maxPrice) param.set("max", maxPrice.toString());
    else param.delete("max");

    if (categories.length > 0) param.set("categories", categories.join(","));
    else param.delete("categories");

    router.replace(`${pathname}?${param.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category],
    );
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus((prevStaus) =>
      prevStaus.includes(newStatus)
        ? prevStaus.filter((s) => s !== newStatus)
        : [...prevStaus, newStatus],
    );
  };

  return (
    <div className="bg-muted rounded-lg p-6 space-y-6 dark:bg-card dark:text-card-foreground">
      <div className="h-full flex flex-col">
        <div className="flex flex-row justify-between ">
          <div className="grid items-center">
            <h3 className="text-lg font-medium mb-2 ">Filters</h3>
          </div>
          <button
            className="text-muted-foreground text-sm"
            onClick={clearFiltersHandler}
          >
            Clear
          </button>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                {[
                  "Art",
                  "Collectables",
                  "Electronics",
                  "Vehicles",
                  "Watches",
                  "Fashion",
                  "Shoes",
                ].map((category) => (
                  <Label
                    key={category}
                    className="flex items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={categories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 w-full h-full">
                <div className="p-1">
                  <Input
                    placeholder="Min"
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  />
                </div>
                <div className="grid items-center">
                  <div className="text-muted-foreground dark:text-muted-foreground">
                    -
                  </div>
                </div>
                <div className="p-1">
                  <Input
                    placeholder="Max"
                    value={maxPrice || ""}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-4">
            <AccordionTrigger>Status</AccordionTrigger>

            <AccordionContent className="flex flex-col gap-1">
              {["Active", "Ended", "Inactive"].map((s) => (
                <div key={s} className="flex items-center space-x-2">
                  <Checkbox
                    checked={status?.includes(s)}
                    onCheckedChange={() => handleStatusChange(s)}
                  />

                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {s}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link href={"/"} className="mt-auto">
          Contact & Support
        </Link>
      </div>
    </div>
  );
};

export default Filters;
