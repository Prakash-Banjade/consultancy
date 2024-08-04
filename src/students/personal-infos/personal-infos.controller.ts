import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalInfosService } from './personal-infos.service';
import { CreatePersonalInfoDto } from './dto/create-personal-info.dto';
import { UpdatePersonalInfoDto } from './dto/update-personal-info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';

@ApiBearerAuth()
@ApiTags('Personal Infos')
@Controller('personal-infos')
export class PersonalInfosController {
  constructor(private readonly personalInfosService: PersonalInfosService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createPersonalInfoDto: CreatePersonalInfoDto) {
    return this.personalInfosService.create(createPersonalInfoDto);
  }

  @Get()
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll() {
    return this.personalInfosService.findAll();
  }

  @Get(':id')
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id') id: string) {
    return this.personalInfosService.findOne(id);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id') id: string, @Body() updatePersonalInfoDto: UpdatePersonalInfoDto) {
    return this.personalInfosService.update(id, updatePersonalInfoDto);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id') id: string) {
    return this.personalInfosService.remove(id);
  }
}
