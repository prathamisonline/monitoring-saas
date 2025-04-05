// // apps/api/src/auth/auth.service.ts
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(private readonly jwtService: JwtService) {}

//   generateJwt(user: any): string {
//     const payload = {
//       sub: user.email,
//       name: `${user.firstName} ${user.lastName}`,
//       picture: user.picture,
//     };
//     return this.jwtService.sign(payload);
//   }
// }
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(user: any) {
    return this.jwtService.sign({
      sub: user.email,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      picture: user.picture,
    });
  }
}
