import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { QuestionRepository } from '../../repository/question.repositoy';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaQuestionRepository implements QuestionRepository {
	constructor(private prisma: PrismaService) { }

	async findById(id: string): Promise<Question | null> {
		const question = await this.prisma.question.findUnique({
			where: {
				id,
			},
		})

		if (!question) {
			return null
		}

		return question;
	}

	async findMany(): Promise<Question[]> {
		const questions = await this.prisma.question.findMany()

		return questions;
	}

	async create(data: Prisma.QuestionCreateInput) {
		const question = await this.prisma.question.create({
			data,
		});

		return question;
	}

	async delete(id: string): Promise<void> {
		await this.prisma.question.delete({
			where: {
				id,
			},
		})
	}

}
