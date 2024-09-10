'use server';

import { lucia } from '@/lib/auth';
import { signInSchemaT } from '@/types/auth';
import prisma from '@repo/db';
import * as argon2 from 'argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Signin = async (formData: signInSchemaT) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: formData.email,
      },
    });
    if (!user) {
      throw new Error('User not found with Entered email');
    }
    const validPassword = await argon2.verify(
      user.hashedPassword,
      formData.password
    );
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    redirect('/');
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};
export default Signin;
