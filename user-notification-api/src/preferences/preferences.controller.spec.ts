import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('PreferencesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/preferences (POST) should create a user preference', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/preferences')
      .send({
        userId: 'user123',
        email: 'user@example.com',
        preferences: {
          marketing: true,
          newsletter: false,
          updates: true,
          frequency: 'weekly',
          channels: {
            email: true,
            sms: false,
            push: true,
          },
        },
        timezone: 'America/New_York',
      });
    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
