import { PrismaClient } from '@prisma/client';
import ITEMS from './seedData';

const prisma = new PrismaClient();

async function seed() {
  try {
    prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: 'seeder',
          userName: 'test',
          email: 'test@test.com',
          hashedPassword: 'abcdefgh',
        },
      });
      //add Auctions related to user and items
      ITEMS.forEach((item) => {
        tx.auction.create({
          data: {
            title: item.title,
            description: item.description,
            startingPrice: item.startingPrice,
            currentPrice: item.currentPrice,
            startDate: item.startDate,
            endDate: item.endDate,
            status: item.status,
            userId: user.id,
            image: item.image,
            categories: item.categories,
          },
        });
      });
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
