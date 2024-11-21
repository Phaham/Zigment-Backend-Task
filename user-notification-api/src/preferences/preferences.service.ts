import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './interfaces/user-preference.interface';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(@InjectModel('UserPreference') private readonly preferenceModel: Model<UserPreference>) {}

  async create(createPreferenceDto: CreatePreferenceDto): Promise<UserPreference> {
    const newPreference = new this.preferenceModel(createPreferenceDto);
    return newPreference.save();
  }

  async findByUserId(userId: string): Promise<UserPreference> {
    const preference = await this.preferenceModel.findOne({ userId });
    if (!preference) {
      throw new NotFoundException('User preference not found');
    }
    return preference;
  }

  async update(userId: string, updateData: Partial<CreatePreferenceDto>): Promise<UserPreference> {
    const updatedPreference = await this.preferenceModel.findOneAndUpdate({ userId }, updateData, {
      new: true,
    });
    if (!updatedPreference) {
      throw new NotFoundException('User preference not found');
    }
    return updatedPreference;
  }

  async delete(userId: string): Promise<{ deletedCount: number }> {
    const result = await this.preferenceModel.deleteOne({ userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('User preference not found');
    }
    return result; 
  }  
}
