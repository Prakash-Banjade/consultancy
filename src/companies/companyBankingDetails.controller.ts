import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompanyBankingDetailsService } from './companyBankingDetails.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';
import { CreateCompanyBankingDetailDto, UpdateCompanyBankingDetailDto } from './dto/company-banking-detail.dto';
import { QueryDto } from 'src/core/dto/query.dto';

@ApiBearerAuth()
@ApiTags('Company Banking Details')
@Controller('companyBankingDetails')
export class CompanyBankingDetailsController {
    constructor(private readonly companyBankingDetailsService: CompanyBankingDetailsService) { }

    @Post()
    @ChekcAbilities({ subject: 'all', action: Action.CREATE })
    create(@Body() createCompanyBankingDetailDto: CreateCompanyBankingDetailDto) {
        return this.companyBankingDetailsService.create(createCompanyBankingDetailDto);
    }

    @Get()
    @ChekcAbilities({ subject: 'all', action: Action.READ })
    findAll(@Query() queryDto: QueryDto) {
        return this.companyBankingDetailsService.findAll(queryDto);
    }

    @Get(':id')
    @ChekcAbilities({ subject: 'all', action: Action.READ })
    findOne(@Param('id') id: string) {
        return this.companyBankingDetailsService.findOne(id);
    }

    @Patch(':id')
    @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
    update(@Param('id') id: string, @Body() updateCompanyBankingDetailDto: UpdateCompanyBankingDetailDto) {
        return this.companyBankingDetailsService.update(id, updateCompanyBankingDetailDto);
    }

    @Delete(':id')
    @ChekcAbilities({ subject: 'all', action: Action.DELETE })
    remove(@Param('id') id: string) {
        return this.companyBankingDetailsService.remove(id);
    }
}
