import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service'; // ✅ Import PrismaService

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
  ],
  providers: [PrismaService], // ✅ Register PrismaService
  exports: [PrismaService], // ✅ Optional, export if used in other modules
})
export class AppModule {}
