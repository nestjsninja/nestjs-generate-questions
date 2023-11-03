import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../user.module';
import { DatabaseModule, PrismaService } from '@app/common';
import { randomUUID } from 'node:crypto'

describe('User (E2E) Delete', () => {
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

    test('[DELETE] /user/:id', async () => {
        const user = await prisma.user.create({
            data: {
                username: `user-${UUID}`,
                password: '123456',
            },
        });

        const response = await request(httpServer)
            .delete(`/user/${user.id}`)
            .send();

        expect(response.statusCode).toBe(200);

        const userOnDatabase = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });

        expect(userOnDatabase).toBeNull();
    });

});
