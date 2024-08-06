import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { AddressesService } from 'src/addresses/addresses.service';
import paginatedData from 'src/core/utils/paginatedData';
import { CompanyBankingDetail } from './entities/company-banking-detail.entity';
import { CreateCompanyBankingDetailDto, UpdateCompanyBankingDetailDto } from './dto/company-banking-detail.dto';
import { QueryDto } from 'src/core/dto/query.dto';
import { CompaniesService } from './companies.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CompanyBankingDetailsService {
    constructor(
        @InjectRepository(CompanyBankingDetail) private readonly companyBankingDetailRepository: Repository<CompanyBankingDetail>,
        private readonly filesService: FilesService,
        private readonly companyService: CompaniesService,
    ) { }

    async create(createCompanyBankingDetailDto: CreateCompanyBankingDetailDto) {
        const company = await this.companyService.findOne(createCompanyBankingDetailDto.companyId)
        if (company.bankingDetail) throw new ConflictException('The company already banking detail filled up')

        const panCertificate = await this.filesService.findOne(createCompanyBankingDetailDto.panCertificateId);

        const newCompanyBankingDetail = this.companyBankingDetailRepository.create({
            ...createCompanyBankingDetailDto,
            panCertificate,
        })

        const savedCompanyBankingDetail = await this.companyBankingDetailRepository.save(newCompanyBankingDetail)

        return this.companyBankingDetailMutationReturn(savedCompanyBankingDetail, 'create')
    }

    async findAll(queryDto: QueryDto) {
        const querybuilder = this.companyBankingDetailRepository.createQueryBuilder('companyBankingDetail')
            .orderBy('companyBankingDetail.createdAt', queryDto.order)
            .take(queryDto.take)
            .skip(queryDto.skip)
            .where(new Brackets(qb => {
                // queryDto.search && qb.andWhere('LOWER(companyBankingDetail.name) LIKE LOWER(:companyBankingDetailName)', { companyBankingDetailName: `%${queryDto.search}%` })
            }))

        return paginatedData(queryDto, querybuilder);
    }

    async findOne(id: string) {
        const existing = await this.companyBankingDetailRepository.findOne({
            where: { id },
        })
        if (!existing) throw new NotFoundException('Comapny banking details not found')

        return existing;
    }

    async update(id: string, updateCompanyBankingDetailDto: UpdateCompanyBankingDetailDto) {
        const existing = await this.findOne(id);

        Object.assign(existing, {
            ...updateCompanyBankingDetailDto,
        })

        const savedCompanyBankingDetail = await this.companyBankingDetailRepository.save(existing);

        return this.companyBankingDetailMutationReturn(savedCompanyBankingDetail, 'update')
    }

    async remove(id: string) {
        const existing = await this.findOne(id);

        return this.companyBankingDetailMutationReturn(await this.companyBankingDetailRepository.remove(existing), 'delete')
    }

    private companyBankingDetailMutationReturn(companyBankingDetail: CompanyBankingDetail, type: 'create' | 'update' | 'delete') {
        return {
            message: `CompanyBankingDetail ${type}ed successfully`,
            companyBankingDetail: {
                id: companyBankingDetail.id,
            }
        }
    }
}
