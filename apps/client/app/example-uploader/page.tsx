import prisma from "@repo/db";

export default async function Home() {
  const user = await prisma.bid.findMany();
  return <div>{JSON.stringify(user)}</div>;
}
