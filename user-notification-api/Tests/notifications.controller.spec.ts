import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('Rate Limiting (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 429 status after exceeding the rate limit', async () => {
    // Replace '/api/preferences/user123' with any endpoint you want to test for rate limiting
    const endpoint = '/api/preferences/user123';

    // Adjust this number based on your configured rate limit + 1
    const maxRequests = 11; // Assume limit is 10, so we test 11 requests

    for (let i = 0; i < maxRequests; i++) {
      const response = await request(app.getHttpServer()).get(endpoint);
      
      if (i >= 10) {
        // The 11th request and beyond should be rate limited
        expect(response.status).toBe(429);
        expect(response.body.message).toBe("ThrottlerException: Too Many Requests");
      } else {
        // Initial requests should be successful
        expect(response.status).toBe(200);
      }
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
