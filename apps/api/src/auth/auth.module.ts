import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'your_jwt_secret', // replace with env variable later
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, SessionSerializer, AuthService],
})
export class AuthModule {}
