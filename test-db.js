// test-db.js
const prisma = require('./config/db');

async function main() {
  try {
    console.log('🔄 Connecting...');
    await prisma.$connect();
    console.log('✅ Connected successfully!');

    // টেস্ট query
    const userCount = await prisma.user.count();
    console.log(`📊 Current users: ${userCount}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
