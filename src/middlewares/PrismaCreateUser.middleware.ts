/* import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(name: string, emails: string) {
  const userCreate = await prisma.user.findFirst({
    where: {
      email: emails,
    },
    select: {
      email: true,
    },
  });
  if (userCreate !== null) {
    return;
  }
  await prisma.user.create({
    data: {
      username: name,
      email: emails,
    },
  });

  prisma.$disconnect();
}

export default main; */
