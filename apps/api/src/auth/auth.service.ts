// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findOrCreateUser(user: any) {
    const existing = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existing) return existing;

    return this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
      },
    });
  }
   async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  generateJwt(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    console.log('Generating JWT with payload:', payload);
    return this.jwtService.sign(payload);
  }

}
