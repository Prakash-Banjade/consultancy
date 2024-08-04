import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicQualificationsService } from './academic-qualifications.service';
import { CreateAcademicQualificationDto } from './dto/create-academic-qualification.dto';
import { UpdateAcademicQualificationDto } from './dto/update-academic-qualification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';

@ApiBearerAuth()
@ApiTags('Academic Qualifications')
@Controller('academic-qualifications')
export class AcademicQualificationsController {
  constructor(private readonly academicQualificationsService: AcademicQualificationsService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createAcademicQualificationDto: CreateAcademicQualificationDto) {
    return this.academicQualificationsService.create(createAcademicQualificationDto);
  }

  @Get()
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll() {
    return this.academicQualificationsService.findAll();
  }

  @Get(':id')
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id') id: string) {
    return this.academicQualificationsService.findOne(id);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id') id: string, @Body() updateAcademicQualificationDto: UpdateAcademicQualificationDto) {
    return this.academicQualificationsService.update(id, updateAcademicQualificationDto);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id') id: string) {
    return this.academicQualificationsService.remove(id);
  }
}
