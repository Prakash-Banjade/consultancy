import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CounselorsService } from './counselors.service';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';
import { CounselorQueryDto } from './dto/counselor-query.dto';

@ApiBearerAuth()
@ApiTags('Counselors')
@Controller('counselors')
export class CounselorsController {
  constructor(private readonly counselorsService: CounselorsService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createCounselorDto: CreateCounselorDto) {
    return this.counselorsService.create(createCounselorDto);
  }

  @Get()
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll(@Query() queryDto: CounselorQueryDto) {
    return this.counselorsService.findAll(queryDto);
  }

  @Get(':id')
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.counselorsService.findOne(id);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCounselorDto: UpdateCounselorDto) {
    return this.counselorsService.update(id, updateCounselorDto);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.counselorsService.remove(id);
  }
}
