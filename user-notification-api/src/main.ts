import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Server } from 'http';

const server = express();
let cachedServer: Server;

// Handler for Vercel
export const handler = async (req: any, res: any) => {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    // Set up global pipes, filters, and interceptors
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());

    // Initialize the app
    await app.init();

    // Cache the server
    cachedServer = server.listen(3000);
  }

  server(req, res); // Pass the request to the cached server
};

// Local bootstrap for development
if (!process.env.VERCEL) {
  (async () => {
    const app = await NestFactory.create(AppModule);

    // Set up global pipes, filters, and interceptors
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());

    const port = 3000;
    await app.listen(port);
    console.log(`Application is running on http://localhost:${port}`);
  })();
}
