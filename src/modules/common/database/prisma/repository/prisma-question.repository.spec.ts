import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionRepository } from './prisma-question.repository';
import { Prisma, Question } from '@prisma/client';

class PrismaServiceMock {
  question = {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };
}

describe('PrismaQuestionRepository', () => {
  let prismaQuestionRepository: PrismaQuestionRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaQuestionRepository,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    prismaQuestionRepository =
      module.get<PrismaQuestionRepository>(PrismaQuestionRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaQuestionRepository).toBeDefined();
  });

  it('should find a question by id', async () => {
    const id = '1';
    const expectedQuestion = { id: '1', title: 'Question title', content: 'Question content' };
    prismaService.question.findUnique = jest.fn().mockResolvedValue(expectedQuestion);

    const question = await prismaQuestionRepository.findById(id);

    expect(question).toEqual(expectedQuestion);
    expect(prismaService.question.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should delete a question by id', async () => {
    const id = '1';
    prismaService.question.delete = jest.fn().mockResolvedValue(undefined);

    await prismaQuestionRepository.delete(id);

    expect(prismaService.question.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
