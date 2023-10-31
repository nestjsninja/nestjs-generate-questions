import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

export class TestDBInitiator {
  private SCHEMA = '';

  private generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
      throw new Error('Please provide a DATABASE_URL environment variable.');
    }

    const url = new URL(process.env.DATABASE_URL);
    this.SCHEMA = schema;

    url.searchParams.set('schema', schema);

    return url.toString();
  }

  async createDatabase() {
    const schema = randomUUID();
    const databaseURL = this.generateDatabaseURL(schema);

    console.log(`Creating test database '${databaseURL}'`);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma migrate deploy');

    console.log('✓ Done. Test database is ready to accept connections ✓\n');
  }

  async dropDatabase() {
    console.log(`Dropping schema: '${this.SCHEMA}'`);
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.SCHEMA}" CASCADE`);

    await prisma.$disconnect();
  }
}
