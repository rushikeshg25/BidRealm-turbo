"use server";

import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

const Signout = async () => {
  const { session } = await getAuth();

  if (!session) redirect("/sign-in");

  await lucia.invalidateSession(session?.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  // redirect("/sign-in");
};

export default Signout;
