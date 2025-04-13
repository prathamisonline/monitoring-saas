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
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // ✅ This lets frontend send cookies
  });
// app.use((req, res, next) => {
//   console.log('🛬 Incoming request:', req.method, req.url);
//   console.log('🍪 Cookies:', req.cookies);
//   next();
// });
  app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
