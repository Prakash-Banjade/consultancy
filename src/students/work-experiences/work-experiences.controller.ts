import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkExperiencesService } from './work-experiences.service';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';

@ApiBearerAuth()
@ApiTags('Work Experiences')
@Controller('work-experiences')
export class WorkExperiencesController {
  constructor(private readonly workExperiencesService: WorkExperiencesService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createWorkExperienceDto: CreateWorkExperienceDto) {
    return this.workExperiencesService.create(createWorkExperienceDto);
  }

  @Get()
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll() {
    return this.workExperiencesService.findAll();
  }

  @Get(':id')
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id') id: string) {
    return this.workExperiencesService.findOne(id);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id') id: string, @Body() updateWorkExperienceDto: UpdateWorkExperienceDto) {
    return this.workExperiencesService.update(id, updateWorkExperienceDto);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id') id: string) {
    return this.workExperiencesService.remove(id);
  }
}
