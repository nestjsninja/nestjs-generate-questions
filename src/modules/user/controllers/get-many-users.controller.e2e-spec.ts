import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../user.module';
import { DatabaseModule, PrismaService } from '@app/common';
import { randomUUID } from 'node:crypto'

describe('User (E2E) Get many', () => {
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

    beforeEach(async () => {
        UUID = randomUUID();

        await prisma.user.deleteMany();
    })

    test('[GET] /user', async () => {
        await prisma.user.createMany({
            data: [
                {
                    username: `user-${UUID}`,
                    password: '123456',
                },
                {
                    username: `user-${randomUUID()}`,
                    password: '123456',
                },
            ],
        });

        const usersOnDatabase = await prisma.user.findMany();

        const response = await request(httpServer)
            .get(`/user`)
            .send();

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(usersOnDatabase);
    });
});
