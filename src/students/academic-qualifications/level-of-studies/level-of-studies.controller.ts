import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LevelOfStudiesService } from './level-of-studies.service';
import { CreateLevelOfStudyDto } from './dto/create-level-of-study.dto';
import { UpdateLevelOfStudyDto } from './dto/update-level-of-study.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';

@ApiBearerAuth()
@ApiTags('Level of study')
@Controller('level-of-studies')
export class LevelOfStudiesController {
  constructor(private readonly levelOfStudiesService: LevelOfStudiesService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createLevelOfStudyDto: CreateLevelOfStudyDto) {
    return this.levelOfStudiesService.create(createLevelOfStudyDto);
  }

  @Get()
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll() {
    return this.levelOfStudiesService.findAll();
  }

  @Get(':id')
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id') id: string) {
    return this.levelOfStudiesService.findOne(id);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id') id: string, @Body() updateLevelOfStudyDto: UpdateLevelOfStudyDto) {
    return this.levelOfStudiesService.update(id, updateLevelOfStudyDto);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id') id: string) {
    return this.levelOfStudiesService.remove(id);
  }
}
