import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionRepository } from './prisma-question.repository';
import { Question } from '@prisma/client';

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

  it('should call prismaService.findMany when findMany is called', async () => {
    const questions = [
      {
        id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
        content: 'John Doe',
      },
      {
        id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
        content: 'Jane Doe2',
      },
    ] as Question[];
    prismaService.question.findMany = jest.fn().mockReturnValueOnce(questions);

    const result = await prismaQuestionRepository.findMany();

    expect(result).toEqual(questions);
    expect(prismaService.question.findMany).toHaveBeenCalled();
  });

  it('should delete a question by id', async () => {
    const id = '1';
    prismaService.question.delete = jest.fn().mockResolvedValue(undefined);

    await prismaQuestionRepository.delete(id);

    expect(prismaService.question.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
