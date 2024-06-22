import { z } from "zod";

export const signUpSchema = z.object({
  userName: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  confirmPassword: z.string().min(8).max(20),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
