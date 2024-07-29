import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<any[]> {
    return this.prisma.register_user.findMany();
  }

  async getUserById(id: string): Promise<any> {
    return this.prisma.register_user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.prisma.register_user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: string): Promise<any> {
    return this.prisma.register_user.delete({
      where: { id },
    });
  }
}
