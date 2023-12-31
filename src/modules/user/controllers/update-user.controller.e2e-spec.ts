import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../user.module';
import { DatabaseModule, PrismaService } from '@app/common';
import { randomUUID } from 'node:crypto'

describe('User (E2E) Update', () => {
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

    test('[PATCH] /user/:id', async () => {
        const user = await prisma.user.create({
            data: {
                username: `user-${UUID}`,
                password: '123456',
            },
        });

        const updateUserDto = {
            username: `updated-user-${UUID}`,
        };

        const userOnDatabase = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });

        const response = await request(httpServer)
            .patch(`/user/${user.id}`)
            .send(updateUserDto);

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({ ...userOnDatabase, ...updateUserDto });
    });

});
