import { IsString, IsEmail, IsBoolean, IsEnum, IsObject, IsDateString } from 'class-validator';

export class CreatePreferenceDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @IsObject()
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  @IsString()
  timezone: string;
}
