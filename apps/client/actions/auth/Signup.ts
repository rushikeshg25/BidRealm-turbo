"use server";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as argon2 from "argon2";
import { lucia } from "@/lib/auth";
import prisma from "@repo/db";

const signUp = async (formData: FormData) => {
  const formDataRaw = {
    userName: formData.get("userName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (formDataRaw.password !== formDataRaw.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const hashedPassword = await argon2.hash(formDataRaw.password);
    const userId = generateId(15);

    await prisma.user.create({
      data: {
        id: userId,
        userName: formDataRaw.userName,
        email: formDataRaw.email,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {}
  redirect("/dashboard");
};

export { signUp };
