const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('motdepasse', 10);
  
  const user = await prisma.user.upsert({
    where: {
      username: 'admin',
    },
    update: {
      password: hashedPassword,
    },
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Utilisateur mis à jour :', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });