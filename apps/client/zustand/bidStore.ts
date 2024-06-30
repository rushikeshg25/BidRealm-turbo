import { BidsWithUser } from "@repo/db/types";
import { create } from "zustand";

type storeType = {
  currentAmount: number;
  bids: BidsWithUser[];
  setCurrentAmount: (amount: number) => void;
  addBid: (bid: BidsWithUser) => void;
  initBids: (bids: BidsWithUser[]) => void;
};

export const bidStore = create<storeType>((set) => ({
  currentAmount: 0,
  bids: [],
  addBid: (bid: BidsWithUser) =>
    set((state) => ({ bids: [bid, ...state.bids] })),
  initBids: (bids: BidsWithUser[]) => set({ bids }),
  setCurrentAmount: (amount: number) => set({ currentAmount: amount }),
}));
