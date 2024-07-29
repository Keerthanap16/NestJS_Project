// src/seeder/seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly saltRounds = 10;

  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const hashedPassword = await this.hashPassword('admin@123');

    await this.prismaService.register_user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@example.com',
        phoneNumber: '1234567890',
        password: hashedPassword,
        role:'admin',
      },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
