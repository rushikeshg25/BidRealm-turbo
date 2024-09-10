import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: 'test',
          userName: 'test',
          email: 'test@test.com',
          hashedPassword: 'abcdefgh',
        },
      });
      //add Auctions related to user
    });
  } catch (error) {
    console.log('Error while seeding', error);
  }
}

async function main() {
  try {
    await seed();
    console.log('Seeding done ☘️');
  } catch (Error) {
    console.log('Error while seeding', Error);
    throw Error;
  }
}

main()
  .catch((error) => {
    console.error('An unexpected error occurred during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
