import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [UsersModule, TokenModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
