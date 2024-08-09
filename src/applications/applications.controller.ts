import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action, AuthUser } from 'src/core/types/global.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/core/decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createApplicationDto: CreateApplicationDto, @CurrentUser() currentUser: AuthUser) {
    return this.applicationsService.create(createApplicationDto, currentUser);
  }

  @Get()
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll(@Query() queryDto: ApplicationQueryDto, @CurrentUser() currentUser: AuthUser) {
    return this.applicationsService.findAll(queryDto, currentUser);
  }

  @Get(':id')
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() currentUser: AuthUser) {
    return this.applicationsService.findOne(id, currentUser);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateApplicationDto: UpdateApplicationDto, @CurrentUser() currentUser: AuthUser) {
    return this.applicationsService.update(id, updateApplicationDto, currentUser);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() currentUser: AuthUser) {
    return this.applicationsService.remove(id, currentUser);
  }
}
