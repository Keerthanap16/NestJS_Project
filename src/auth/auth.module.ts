import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { RolesGuard } from './roles.service';


@Module({
  imports: [
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '1h' }, 
    })
  ],
  providers: [AuthService, JwtStrategy,PrismaService,RolesGuard],
  controllers:[AuthController],
  exports: [AuthService],
})
export class AuthModule {}
