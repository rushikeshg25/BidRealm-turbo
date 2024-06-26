"use server";

import { AuctionT } from "@/types/auction";
import { NextResponse } from "next/server";

export const createAuction = async (data: AuctionT) => {
  return NextResponse.json({});
};
