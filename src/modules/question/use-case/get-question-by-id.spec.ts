import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRepository } from '@app/common';
import { Question } from '@prisma/client';
import { GetQuestionByIdUseCase } from './get-question-by-id';

class QuestionRepositoryMock {
  findById = jest.fn();
}

describe('GetQuestionByIdUseCase', () => {
  let getQuestionByIdUseCase: GetQuestionByIdUseCase;
  let questionRepository: QuestionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetQuestionByIdUseCase,
        {
          provide: QuestionRepository,
          useClass: QuestionRepositoryMock,
        },
      ],
    }).compile();

    getQuestionByIdUseCase = module.get<GetQuestionByIdUseCase>(GetQuestionByIdUseCase);
    questionRepository = module.get<QuestionRepository>(QuestionRepository);
  });

  it('should be defined', () => {
    expect(getQuestionByIdUseCase).toBeDefined();
  });

  it('should get a question by id', async () => {
    const question: Question = {
      id: 'aaaaa-sdfsdfsd-sdfsdfsd-bbbbb',
      content: 'What is your favorite color?',
      authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    questionRepository.findById = jest.fn().mockResolvedValue(question);

    const result = await getQuestionByIdUseCase.execute(question.id);

    expect(result).toEqual(question);
    expect(questionRepository.findById).toHaveBeenCalledWith(question.id);
  });

  it('should throw a not found exception when the question is not found', async () => {
    const questionId = 'aaaaa-sdfsdfsd-sdfsdfsd-bbbbb';
    questionRepository.findById = jest.fn().mockResolvedValue(null);

    await expect(getQuestionByIdUseCase.execute(questionId)).rejects.toThrow('Not Found');

    expect(questionRepository.findById).toHaveBeenCalledWith(questionId);
  });
});
