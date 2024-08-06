import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyBankingDetail } from './entities/company-banking-detail.entity';
import { FilesModule } from 'src/files/files.module';
import { CompanyBankingDetailsService } from './companyBankingDetails.service';
import { CompanyBankingDetailsController } from './companyBankingDetails.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CompanyBankingDetail,
    ]),
    FilesModule,
  ],
  controllers: [CompaniesController, CompanyBankingDetailsController],
  providers: [CompaniesService, CompanyBankingDetailsService],
})
export class CompaniesModule { }
