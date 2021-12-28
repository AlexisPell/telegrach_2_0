import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import redis from 'redis';
import connectRedis from 'connect-redis';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { apiPrefix } from './common/constants/paths';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('Default template swagger')
    .setDescription('Some pretty js-swagger documentation')
    .setVersion('1.0.0')
    .addTag('Hello World')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/users/docs`, app, document);

  const redisClient = redis.createClient({ url: process.env.REDIS_URI });
  const RedisStore = connectRedis(session);

  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost',
      'http://localhost:3000',
      process.env.WEB_URL as string,
      `${process.env.WEB_URL}:3000` as string,
    ],
    credentials: true,
  });

  app.use(
    session({
      cookie: { maxAge: 60000 * 60 * 24, httpOnly: true }, // day
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  const PORT = (process.env.USERS_PORT as string) || 5000;
  await app.listen(PORT, () =>
    console.log(`SERVER IS RUNNING ON PORT ${process.env.USERS_PORT}`),
  );
}
bootstrap();
