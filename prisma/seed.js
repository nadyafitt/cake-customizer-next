const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: {
      username: "admin",
    },

    update: {
      passwordHash,
    },

    create: {
      username: "admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Admin account created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });