import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../user.module';
import { DatabaseModule, PrismaService } from '@app/common';
import { randomUUID } from 'node:crypto'

describe('User (E2E) Create', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let httpServer: any;
  let UUID: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
      providers: [],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    httpServer = app.getHttpServer();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    UUID = randomUUID();
  })

  test('[POST] /user', async () => {
    const response = await request(httpServer)
      .post(`/user`)
      .send({
        username: `user-${UUID}`,
        password: '123456',
      });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        username: `user-${UUID}`
      },
    });

    expect(userOnDatabase).toBeTruthy();
    expect(response.body).toEqual(userOnDatabase);
  });

  test('[POST] /user with invalid data', async () => {
    const response = await request(httpServer)
      .post(`/user`)
      .send({
        username: '',
        password: '123456',
      });

    expect(response.statusCode).toBe(400);
  });

  test('[POST] /user with already existing username', async () => {
    await prisma.user.create({
      data: {
        username: `user-${UUID}`,
        password: '123456',
      },
    });

    const response = await request(httpServer)
      .post(`/user`)
      .send({
        username: `user-${UUID}`,
        password: '123456',
      });

    expect(response.statusCode).toBe(409);
  });
});
