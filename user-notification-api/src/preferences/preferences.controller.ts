import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Controller('api/preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.preferencesService.findByUserId(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateData: Partial<CreatePreferenceDto>) {
    return this.preferencesService.update(userId, updateData);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string) {
    return this.preferencesService.delete(userId);
  }
}
