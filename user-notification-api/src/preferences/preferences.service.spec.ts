import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesService } from './preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './interfaces/user-preference.interface';

describe('PreferencesService', () => {
  let service: PreferencesService;
  let model: Model<UserPreference>;

  const mockUserPreference = {
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferencesService,
        {
          provide: getModelToken('UserPreference'),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUserPreference),
            save: jest.fn().mockResolvedValue(mockUserPreference),
            findOneAndUpdate: jest.fn().mockImplementation((filter, updateData) => {
              return {
                ...mockUserPreference,
                preferences: {
                  ...mockUserPreference.preferences,
                  ...updateData.preferences,
                },
              };
            }),
            deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }), // Ensure this returns correctly
          },
          
        },
      ],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
    model = module.get<Model<UserPreference>>(getModelToken('UserPreference'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user preference by userId', async () => {
    const result = await service.findByUserId('user123');
    expect(result).toEqual(mockUserPreference);
  });

  it('should update a user preference', async () => {
    const updatedPreference = await service.update('user123', {
      preferences: {
        marketing: false,
        newsletter: true,
        updates: true,
        frequency: 'weekly',
        channels: {
          email: true,
          sms: false,
          push: true,
        },
      },
    });
    expect(updatedPreference.preferences.marketing).toBe(false);
  });
  


it('should delete a user preference', async () => {
    const result = await service.delete('user123');
    expect(result).toEqual({ deletedCount: 1 });
  });
  
});
