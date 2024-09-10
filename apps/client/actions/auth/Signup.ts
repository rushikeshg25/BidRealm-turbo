'use server';
import { lucia } from '@/lib/auth';
import { signUpSchemaT } from '@/types/auth';
import prisma from '@repo/db';
import * as argon2 from 'argon2';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const signUp = async (Formdata: signUpSchemaT) => {
  try {
    const hashedPassword = await argon2.hash(Formdata.password);
    const userId = generateId(15);

    if (
      await prisma.user.findUnique({ where: { userName: Formdata.userName } })
    ) {
      console.log('username already exists');
      throw new Error('Username already exists');
    }
    if (await prisma.user.findUnique({ where: { email: Formdata.email } })) {
      console.log('email already exists');
      throw new Error('Email already exists');
    }
    await prisma.user.create({
      data: {
        id: userId,
        userName: Formdata.userName,
        email: Formdata.email,
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
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
  redirect('/');
};

export { signUp };
