import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { AddressesService } from 'src/addresses/addresses.service';
import { CompanyQueryDto } from './dto/company-query.dto';
import paginatedData from 'src/core/utils/paginatedData';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    private readonly addressService: AddressesService
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const existingWithSameName = await this.companyRepository.findOneBy({ name: createCompanyDto.name })
    if (existingWithSameName) throw new ConflictException('Company with same name already exists')

    const address = await this.addressService.create(createCompanyDto.address);

    const newCompany = this.companyRepository.create({
      name: createCompanyDto.name,
      contactNumber: createCompanyDto.contactNumber,
      email: createCompanyDto.email,
      address: address,
    })

    const savedCompany = await this.companyRepository.save(newCompany)

    return this.companyMutationReturn(savedCompany, 'create')
  }

  async findAll(queryDto: CompanyQueryDto) {
    const querybuilder = this.companyRepository.createQueryBuilder('company')
      .orderBy('company.createdAt', queryDto.order)
      .take(queryDto.take)
      .skip(queryDto.skip)
      .where(new Brackets(qb => {
        queryDto.search && qb.andWhere('LOWER(company.name) LIKE LOWER(:companyName)', { companyName: `%${queryDto.search}%` })
      }))

    return paginatedData(queryDto, querybuilder);
  }

  async findOne(id: string) {
    const existing = await this.companyRepository.findOne({
      where: { id },
      relations: ['bankingDetail', 'address']
    })
    if (!existing) throw new NotFoundException('Comapny not found')

    return existing;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const existing = await this.findOne(id);

    // check if name is taken
    if (updateCompanyDto.name && updateCompanyDto.name !== existing.name) {
      const existingWithSameName = await this.companyRepository.findOneBy({ name: updateCompanyDto.name, id: Not(existing.id) })
      if (existingWithSameName) throw new ConflictException('Company with same name already exists')
    }

    // update address if provided
    if (updateCompanyDto.address?.address1) {
      await this.addressService.update(existing.address?.id, updateCompanyDto.address)
    }

    Object.assign(existing, {
      name: updateCompanyDto.name,
      contactNumber: updateCompanyDto.contactNumber,
      email: updateCompanyDto.email,
    })

    const savedCompany = await this.companyRepository.save(existing);

    return this.companyMutationReturn(savedCompany, 'update')
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    return this.companyMutationReturn(await this.companyRepository.remove(existing), 'delete')
  }

  private companyMutationReturn(company: Company, type: 'create' | 'update' | 'delete') {
    return {
      message: `Company ${type}ed successfully`,
      company: {
        id: company.id,
        name: company.name,
      }
    }
  }
}
