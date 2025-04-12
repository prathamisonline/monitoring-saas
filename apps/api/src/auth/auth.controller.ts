import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1️⃣ Trigger Google OAuth login
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport will redirect
  }

  // 2️⃣ Google callback handler
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const oauthUser = req.user;

    // 🧠 Create or get user from DB
    const dbUser = await this.authService.findOrCreateUser(oauthUser);

    // 🛡️ Generate JWT using db user
    const jwt = this.authService.generateJwt(dbUser);

    // 🍪 Set auth token in cookie
    res.cookie('auth_token', jwt, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    // ✅ Redirect to dashboard
    return res.redirect('http://localhost:3000/dashboard');
  }

  // 3️⃣ Check if user is logged in
  @Get('status')
  getStatus(@Req() req: Request) {
    return req.user ?? { loggedIn: false };
  }

  // 4️⃣ Logout
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('auth_token');
      res.redirect('/');
    });
  }
}
