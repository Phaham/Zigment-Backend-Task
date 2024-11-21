import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        return {
          uri: mongoUri,
        };
      },
    }),
  ],
})
export class MongooseTestModule {}
