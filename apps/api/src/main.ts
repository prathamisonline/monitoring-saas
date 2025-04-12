import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   session({
  //     secret: 'keyboard cat',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  // 🔐 Middleware to parse cookies (needed for JWT from cookie)
  app.use(cookieParser());

  app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
