import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('La variable de entorno DATABASE_URL es obligatoria.');
    }

    // Adaptador de MySQL (en el repo de la profe, con PostgreSQL, es PrismaPg)
    super({ adapter: new PrismaMariaDb(connectionString) });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
