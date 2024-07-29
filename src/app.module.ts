import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { UserModule } from './users/user.module';

@Module({
  imports:[ProductModule,AuthModule,SeederModule,UserModule],
  providers: [PrismaService],
})
export class AppModule {}
