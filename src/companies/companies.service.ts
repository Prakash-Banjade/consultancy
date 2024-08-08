import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { AddressesService } from 'src/addresses/addresses.service';
import { CompanyQueryDto } from './dto/company-query.dto';
import paginatedData from 'src/core/utils/paginatedData';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    private readonly addressService: AddressesService,
    private readonly filesService: FilesService,
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

    const logo = updateCompanyDto.logoId ? await this.filesService.findOne(updateCompanyDto.logoId) : null

    // validate file
    if (logo && logo.memeType === 'application/pdf') throw new ConflictException('File must be of type image');

    // check if name is taken
    await this.checkIfCompanyExists(updateCompanyDto, existing);

    // update address if provided
    if (updateCompanyDto.address?.address1) {
      await this.addressService.update(existing.address?.id, updateCompanyDto.address)
    }

    Object.assign(existing, {
      ...updateCompanyDto,
      logo: logo,
    })

    const savedCompany = await this.companyRepository.save(existing);

    return this.companyMutationReturn(savedCompany, 'update')
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    return this.companyMutationReturn(await this.companyRepository.remove(existing), 'delete')
  }

  private async checkIfCompanyExists(companyDto: CreateCompanyDto | UpdateCompanyDto, company?: Company) {
    const { email, name } = companyDto;

    const existingCompany = await this.companyRepository.createQueryBuilder('company')
      .where(new Brackets(qb => {
        qb.where([
          { email },
          { name },
        ])
        company?.id && qb.andWhere({ id: Not(company.id) })
      })).getOne();

    if (existingCompany && !company) {
      if (existingCompany.email === email) throw new BadRequestException('Company with this email already exists');
      if (existingCompany.name === name) throw new BadRequestException('Company with this name already exists');
    } else if (existingCompany && company) {
      if (existingCompany.email === email && existingCompany.id !== company.id) throw new BadRequestException('Company with this email already exists');
      if (existingCompany.name === name && existingCompany.id !== company.id) throw new BadRequestException('Company with this name already exists');
    }
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
