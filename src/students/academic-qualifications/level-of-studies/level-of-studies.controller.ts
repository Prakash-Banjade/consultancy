import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LevelOfStudiesService } from './level-of-studies.service';
import { CreateLevelOfStudyDto } from './dto/create-level-of-study.dto';
import { UpdateLevelOfStudyDto } from './dto/update-level-of-study.dto';

@Controller('level-of-studies')
export class LevelOfStudiesController {
  constructor(private readonly levelOfStudiesService: LevelOfStudiesService) {}

  @Post()
  create(@Body() createLevelOfStudyDto: CreateLevelOfStudyDto) {
    return this.levelOfStudiesService.create(createLevelOfStudyDto);
  }

  @Get()
  findAll() {
    return this.levelOfStudiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelOfStudiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelOfStudyDto: UpdateLevelOfStudyDto) {
    return this.levelOfStudiesService.update(+id, updateLevelOfStudyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelOfStudiesService.remove(+id);
  }
}
