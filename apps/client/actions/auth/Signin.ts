"use server";

import prisma from "@repo/db";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as argon2 from "argon2";

const Signin = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: formDataRaw.email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    console.log(formDataRaw.password, user.hashedPassword);
    const validPassword = await argon2.verify(
      user.hashedPassword,
      formDataRaw.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.log(error);
  }
};
export default Signin;
