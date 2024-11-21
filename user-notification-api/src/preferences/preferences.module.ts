import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { UserPreferenceSchema } from './preferences.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserPreference', schema: UserPreferenceSchema }]),
  ],
  controllers: [PreferencesController],
  providers: [PreferencesService],
})
export class PreferencesModule {}
