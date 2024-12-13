// postinstall.js
const { execSync } = require('child_process');

try {
  execSync('prisma generate');
} catch (error) {
  console.error('Error generating Prisma Client:', error);
  process.exit(1);
}