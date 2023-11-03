import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRepository } from '@app/common';
import { Question } from '@prisma/client';
import { GetManyQuestionsUseCase } from './get-many-questions';

class QuestionRepositoryMock {
  findMany = jest.fn();
}

describe('GetManyQuestionsUseCase', () => {
  let getManyQuestionsUseCase: GetManyQuestionsUseCase;
  let questionRepository: QuestionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetManyQuestionsUseCase,
        {
          provide: QuestionRepository,
          useClass: QuestionRepositoryMock,
        },
      ],
    }).compile();

    getManyQuestionsUseCase = module.get<GetManyQuestionsUseCase>(GetManyQuestionsUseCase);
    questionRepository = module.get<QuestionRepository>(QuestionRepository);
  });

  it('should be defined', () => {
    expect(getManyQuestionsUseCase).toBeDefined();
  });

  it('should get many questions', async () => {
    const questions: Question[] = [
      {
        id: 'aaaaa-sdfsdfsd-sdfsdfsd-bbbbb',
        content: 'What is your favorite color?',
        authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more questions as needed
    ];

    questionRepository.findMany = jest.fn().mockResolvedValue(questions);

    const result = await getManyQuestionsUseCase.execute();

    expect(result).toEqual(questions);
    expect(questionRepository.findMany).toHaveBeenCalled();
  });
});
