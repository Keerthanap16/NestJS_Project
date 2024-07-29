import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service'; 
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.prisma.register_user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    
    const payload = { email: user.email, id : user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async register(registerDto: RegisterDto): Promise<void> {
    // Check if user already exists
    const existingUser = await this.prisma.register_user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create the user
    await this.prisma.register_user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });
  }
}
