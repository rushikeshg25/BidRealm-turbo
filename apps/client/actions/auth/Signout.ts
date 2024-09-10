'use server';

import { getAuth, lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Signout = async () => {
  const { session } = await getAuth();

  if (!session) redirect('/sign-in');

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
