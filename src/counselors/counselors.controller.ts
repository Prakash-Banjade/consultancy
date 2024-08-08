import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { CounselorsService } from './counselors.service';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action, AuthUser, Roles } from 'src/core/types/global.types';
import { CounselorQueryDto } from './dto/counselor-query.dto';
import { TransactionInterceptor } from 'src/core/interceptors/transaction.interceptor';
import { CurrentUser } from 'src/core/decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('Counselors')
@Controller('counselors')
export class CounselorsController {
  constructor(private readonly counselorsService: CounselorsService) { }

  @Post()
  @UseInterceptors(TransactionInterceptor)
  @ChekcAbilities({ subject: Roles.ADMIN, action: Action.CREATE })
  create(@Body() createCounselorDto: CreateCounselorDto, @CurrentUser() currentUser: AuthUser) {
    return this.counselorsService.create(createCounselorDto, currentUser);
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
  @UseInterceptors(TransactionInterceptor)
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
