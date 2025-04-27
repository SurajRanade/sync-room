import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  // const jwtGuard = app.get(JwtAuthGuard);
  // app.useGlobalGuards(jwtGuard);
  app.enableCors();
  await app.listen(3000);
  console.log(`listening to port ${3000}`)
}
bootstrap();
