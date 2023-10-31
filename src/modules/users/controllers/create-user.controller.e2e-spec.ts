import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../users.module';
import { DatabaseModule, PrismaService } from '@app/common';

describe('User (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let httpServer: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, DatabaseModule],
      providers: [],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer();

    await app.init();
  });
  
  afterAll(async () => {
    await app.close();
  });

  test('[POST] /user', async () => {
    const response = await request(httpServer).post(`/user/create`).send({});

    expect(response.statusCode).toBe(200);

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        username: 'henrique',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
