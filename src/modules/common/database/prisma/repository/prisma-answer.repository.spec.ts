import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PrismaAnswerRepository } from './prisma-answer.repository';
import { Prisma, Answer } from '@prisma/client';

class PrismaServiceMock {
  answer = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };
}

describe('PrismaAnswerRepository', () => {
  let prismaAnswerRepository: PrismaAnswerRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaAnswerRepository,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    prismaAnswerRepository =
      module.get<PrismaAnswerRepository>(PrismaAnswerRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaAnswerRepository).toBeDefined();
  });

  it('should find an answer by id', async () => {
    const id = '1';
    const expectedAnswer = { id: '1', questionId: '1', content: 'Answer content' };
    prismaService.answer.findUnique = jest.fn().mockResolvedValue(expectedAnswer);

    const answer = await prismaAnswerRepository.findById(id);

    expect(answer).toEqual(expectedAnswer);
    expect(prismaService.answer.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should find many answers by questionId', async () => {
    const questionId = '1';
    const expectedAnswers = [
      { id: '1', questionId: '1', content: 'Answer content 1' },
      { id: '2', questionId: '1', content: 'Answer content 2' },
    ] as Answer[];
    prismaService.answer.findMany = jest.fn().mockResolvedValue(expectedAnswers);

    const answers = await prismaAnswerRepository.findMany(questionId);

    expect(answers).toEqual(expectedAnswers);
    expect(prismaService.answer.findMany).toHaveBeenCalledWith({ where: { questionId } });
  });

  it('should delete an answer by id', async () => {
    const id = '1';
    prismaService.answer.delete = jest.fn().mockResolvedValue(undefined);

    await prismaAnswerRepository.delete(id);

    expect(prismaService.answer.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
