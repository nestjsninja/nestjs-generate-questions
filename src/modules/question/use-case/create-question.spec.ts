import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRepository, UserRepository, AnswerRepository } from '@app/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question, User } from '@prisma/client';
import { CreateQuestionUseCase } from './create-question';
import { AIChatGenerator } from '@app/common';

class QuestionRepositoryMock {
  create = jest.fn();
  findById = jest.fn();
}

class UserRepositoryMock {
  findById = jest.fn();
}

class AnswerRepositoryMock {
  create = jest.fn();
}

class AIChatGeneratorMock {
  ask = jest.fn();
}

describe('CreateQuestionUseCase', () => {
  let createQuestionUseCase: CreateQuestionUseCase;
  let questionRepository: QuestionRepository;
  let userRepository: UserRepository;
  let answerRepository: AnswerRepository;
  let aIChatGenerator: AIChatGenerator;

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
        {
          provide: AnswerRepository,
          useClass: AnswerRepositoryMock,
        },
        {
          provide: AIChatGenerator,
          useClass: AIChatGeneratorMock,
        },
      ],
    }).compile();

    createQuestionUseCase = module.get<CreateQuestionUseCase>(CreateQuestionUseCase);
    questionRepository = module.get<QuestionRepository>(QuestionRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    answerRepository = module.get<AnswerRepository>(AnswerRepository);
    aIChatGenerator = module.get<AIChatGenerator>(AIChatGenerator);
  });

  it('should be defined', () => {
    expect(createQuestionUseCase).toBeDefined();
  });

  // it('should create a question when the author is found', async () => {
  //   const createQuestionDto: CreateQuestionDto = {
  //     content: 'What is your favorite color?',
  //     authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //   };

  //   const user: Partial<User> = {
  //     id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //     username: 'test',
  //   };

  //   const AIAnswers = {
  //     text: '[{"text": "Answer1", "correct": true}, {"text": "Answer2", "correct": false}, {"text": "Answer3", "correct": false}]',
  //   };

  //   userRepository.findById = jest.fn().mockResolvedValue(user);
  //   aIChatGenerator.ask = jest.fn().mockResolvedValue(AIAnswers);
  //   questionRepository.create = jest.fn().mockResolvedValue();

  //   const result = await createQuestionUseCase.execute(createQuestionDto);

  //   expect(result).toBeDefined();
  //   expect(userRepository.findById).toHaveBeenCalledWith(createQuestionDto.authorId);
  //   expect(aIChatGenerator.ask).toHaveBeenCalled();
  // });

  // it('should throw a not found exception when the author is not found', async () => {
  //   const createQuestionDto: CreateQuestionDto = {
  //     content: 'What is your favorite color?',
  //     authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //   };
  //   userRepository.findById = jest.fn().mockResolvedValue(null);

  //   await expect(createQuestionUseCase.execute(createQuestionDto)).rejects.toThrow('Author not found');

  //   expect(userRepository.findById).toHaveBeenCalledWith(createQuestionDto.authorId);
  // });

  // it('should throw a bad request exception when the AI chat generator returns an incompatible format', async () => {
  //   const createQuestionDto: CreateQuestionDto = {
  //     content: 'What is your favorite color?',
  //     authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //   };

  //   const user: Partial<User> = {
  //     id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //     username: 'test',
  //   };

  //   userRepository.findById = jest.fn().mockResolvedValue(user);
  //   aIChatGenerator.ask = jest.fn().mockResolvedValue({ text: 'Incompatible format' });

  //   await expect(createQuestionUseCase.execute(createQuestionDto)).rejects.toThrow('Generated answers are not compatible');

  //   expect(userRepository.findById).toHaveBeenCalledWith(createQuestionDto.authorId);
  //   expect(aIChatGenerator.ask).toHaveBeenCalled();
  // });

  // it('should throw a bad request exception when the AI chat generator returns an insufficient number of answers', async () => {
  //   const createQuestionDto: CreateQuestionDto = {
  //     content: 'What is your favorite color?',
  //     authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //   };

  //   const user: Partial<User> = {
  //     id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //     username: 'test',
  //   };

  //   const AIAnswers = {
  //     text: '[{text: "Answer1", correct: true}, {text: "Answer2", correct: false}]',
  //   };

  //   userRepository.findById = jest.fn().mockResolvedValue(user);
  //   aIChatGenerator.ask = jest.fn().mockResolvedValue(AIAnswers);

  //   await expect(createQuestionUseCase.execute(createQuestionDto)).rejects.toThrow('Generated answers are insufficient');

  //   expect(userRepository.findById).toHaveBeenCalledWith(createQuestionDto.authorId);
  //   expect(aIChatGenerator.ask).toHaveBeenCalled();
  // });

  // it('should throw a bad request exception when an error occurs while creating the question or its answers', async () => {
  //   const createQuestionDto: CreateQuestionDto = {
  //     content: 'What is your favorite color?',
  //     authorId: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //   };

  //   const user: Partial<User> = {
  //     id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
  //     username: 'test',
  //   };

  //   const AIAnswers = {
  //     text: '[{text: "Answer1", correct: true}, {text: "Answer2", correct: false}, {text: "Answer3", correct: false}]',
  //   };

  //   userRepository.findById = jest.fn().mockResolvedValue(user);
  //   aIChatGenerator.ask = jest.fn().mockResolvedValue(AIAnswers);
  //   questionRepository.create = jest.fn().mockRejectedValue(new Error('Database error'));

  //   await expect(createQuestionUseCase.execute(createQuestionDto)).rejects.toThrow('Database error');

  //   expect(userRepository.findById).toHaveBeenCalledWith(createQuestionDto.authorId);
  //   expect(aIChatGenerator.ask).toHaveBeenCalled();
  //   expect(questionRepository.create).toHaveBeenCalled();
  // });


});
