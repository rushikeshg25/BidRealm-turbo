import { AuctionStatus, Categories } from "@/types/auction";
import { create } from "zustand";

interface Auction {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: AuctionStatus;
  userId: string;
  image: string;
  categories: Categories;
}

const useStore = create<Auction>((set) => ({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  status: AuctionStatus.INACTIVE,
  userId: "",
  image: "",
  categories: Categories.UNDEFINED,
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setStartDate: (startDate: string) => set({ startDate }),
  setEndDate: (endDate: string) => set({ endDate }),
  setStatus: (status: AuctionStatus) => set({ status }),
  setUserId: (userId: string) => set({ userId }),
  setImage: (image: string) => set({ image }),
  setCategories: (categories: Categories) => set({ categories }),
}));
