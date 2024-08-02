import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { BritishCounsilService } from './british-counsil.service';
import { CreateBritishCounsilDto } from './dto/create-british-counsil.dto';
import { UpdateBritishCounsilDto } from './dto/update-british-counsil.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';
import { BritishCounsilQueryDto } from './dto/british-counsil-query.dto';

@ApiBearerAuth()
@ApiTags('British Counsil')
@Controller('british-counsil')
export class BritishCounsilController {
  constructor(private readonly britishCounsilService: BritishCounsilService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createBritishCounsilDto: CreateBritishCounsilDto) {
    return this.britishCounsilService.create(createBritishCounsilDto);
  }

  @Get()
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll(@Query() queryDto: BritishCounsilQueryDto) {
    return this.britishCounsilService.findAll(queryDto);
  }

  @Get(':id')
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.britishCounsilService.findOne(id);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBritishCounsilDto: UpdateBritishCounsilDto) {
    return this.britishCounsilService.update(id, updateBritishCounsilDto);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.britishCounsilService.remove(id);
  }
}
