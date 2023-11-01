import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../../repository/user.repositoy';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
	constructor(private prisma: PrismaService) { }

	async findById(id: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
		})

		if (!user) {
			return null
		}

		return user;
	}

	async findByUsername(username: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				username,
			},
		})

		if (!user) {
			return null
		}

		return user;
	}

	async findMany(): Promise<User[]> {
		const users = await this.prisma.user.findMany()

		return users;
	}

	async create(data: Prisma.UserCreateInput) {
		const user = await this.prisma.user.create({
			data,
		});

		return user;
	}

	async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
		const user = this.prisma.user.update({
			where: {
				id
			},
			data,
		});

		return user
	}

	async delete(id: string): Promise<void> {
		await this.prisma.user.delete({
			where: {
				id,
			},
		})
	}

}
