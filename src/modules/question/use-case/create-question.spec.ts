import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRepository, UserRepository } from '@app/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question, User } from '@prisma/client';
import { CreateQuestionUseCase } from './create-question';

class QuestionRepositoryMock {
  create = jest.fn();
}

class UserRepositoryMock {
  findById = jest.fn();
}

describe('CreateQuestionUseCase', () => {
  let createQuestionUseCase: CreateQuestionUseCase;
  let questionRepository: QuestionRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateQuestionUseCase,
        {
          provide: QuestionRepository,
          useClass: QuestionRepositoryMock,
        },
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    createQuestionUseCase = module.get<CreateQuestionUseCase>(CreateQuestionUseCase);
    questionRepository = module.get<QuestionRepository>(QuestionRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(createQuestionUseCase).toBeDefined();
  });

  it('should create a question when the author is found', async () => {
    const createQuestionDto: CreateQuestionDto = {
      content: 'What is your favorite color?',
      authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
    };

    const question: Question = {
      id: 'aaaaa-sdfsdfsd-sdfsdfsd-bbbbb',
      content: createQuestionDto.content,
      authorId: createQuestionDto.authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user: Partial<User> = {
      id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
      username: 'test',
    };

    userRepository.findById = jest.fn().mockResolvedValue(user);
    questionRepository.create = jest.fn().mockResolvedValue(question);

    const result = await createQuestionUseCase.execute(createQuestionDto);

    expect(result).toEqual(question);
    expect(userRepository.findById).toHaveBeenCalledWith(createQuestionDto.authorId);
    expect(questionRepository.create).toHaveBeenCalledWith({
      content: createQuestionDto.content,
      author: {
        connect: {
          id: createQuestionDto.authorId
        }
      }
    });
  });

  it('should throw a not found exception when the author is not found', async () => {
    const createQuestionDto: CreateQuestionDto = {
      content: 'What is your favorite color?',
      authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
    };
    userRepository.findById = jest.fn().mockResolvedValue(null);

    await expect(createQuestionUseCase.execute(createQuestionDto)).rejects.toThrow('Author not found');

    expect(userRepository.findById).toHaveBeenCalledWith(createQuestionDto.authorId);
  });

  it('should throw a bad request exception when it was not possible to register', async () => {
    const createQuestionDto: CreateQuestionDto = {
      content: 'What is your favorite color?',
      authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
    };

    const user: Partial<User> = {
      id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
      username: 'test',
    };

    userRepository.findById = jest.fn().mockResolvedValue(user);
    questionRepository.create = jest.fn().mockRejectedValue(new Error());

    await expect(createQuestionUseCase.execute(createQuestionDto)).rejects.toThrow('Was not possible to register');

    expect(userRepository.findById).toHaveBeenCalledWith(createQuestionDto.authorId);
    expect(questionRepository.create).toHaveBeenCalledWith({
      content: createQuestionDto.content,
      author: {
        connect: {
          id: createQuestionDto.authorId
        }
      }
    });
  });
});
