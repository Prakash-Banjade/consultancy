import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IntakesService } from './intakes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';
import { CreateIntakeDto, UpdateIntakeDto } from './dto/intake.dto';
import { QueryDto } from 'src/core/dto/query.dto';

@ApiBearerAuth()
@ApiTags('Intakes')
@Controller('intakes')
export class IntakesController {
    constructor(private readonly intakesService: IntakesService) { }

    @Post()
    @ChekcAbilities({ subject: 'all', action: Action.CREATE })
    create(@Body() createIntakeDto: CreateIntakeDto) {
        return this.intakesService.create(createIntakeDto);
    }

    @Get()
    @ChekcAbilities({ subject: 'all', action: Action.READ })
    findAll(@Query() queryDto: QueryDto) {
        return this.intakesService.findAll(queryDto);
    }

    @Get(':id')
    @ChekcAbilities({ subject: 'all', action: Action.READ })
    findOne(@Param('id') id: string) {
        return this.intakesService.findOne(id);
    }

    @Patch(':id')
    @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
    update(@Param('id') id: string, @Body() updateIntakeDto: UpdateIntakeDto) {
        return this.intakesService.update(id, updateIntakeDto);
    }

    @Delete(':id')
    @ChekcAbilities({ subject: 'all', action: Action.DELETE })
    remove(@Param('id') id: string) {
        return this.intakesService.remove(id);
    }
}
