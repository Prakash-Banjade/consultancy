import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from './entities/university.entity';
import { Brackets, Repository } from 'typeorm';
import { CountriesService } from 'src/countries/countries.service';
import { QueryDto } from 'src/core/dto/query.dto';
import paginatedData from 'src/core/utils/paginatedData';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(University) private universityRepo: Repository<University>,
    private readonly countriesService: CountriesService,
  ) { }

  async create(createUniversityDto: CreateUniversityDto) {
    const existingWitSameName = await this.universityRepo.findOneBy({ name: createUniversityDto.name });
    if (existingWitSameName) throw new ConflictException('University with this name already exists');

    const country = await this.countriesService.findOne(createUniversityDto.countryId);

    const university = this.universityRepo.create({ ...createUniversityDto, country });

    const savedUniversity = await this.universityRepo.save(university);

    return this.universityMutationReturn(savedUniversity, 'create');
  }

  async findAll(queryDto: QueryDto) {
    const querybuilder = this.universityRepo.createQueryBuilder('university')
      .orderBy('university.createdAt', queryDto.order)
      .take(queryDto.take)
      .skip(queryDto.skip)
      .where(new Brackets(qb => {
        queryDto.search && qb.where('LOWER(university.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
      }))

    return paginatedData(queryDto, querybuilder)
  }

  async findOne(id: string) {
    const existing = await this.universityRepo.findOne({
      where: { id },
      relations: {
        country: true
      }
    })
    if (!existing) throw new NotFoundException('University not found')

    return existing;
  }

  async update(id: string, updateUniversityDto: UpdateUniversityDto) {
    const existing = await this.findOne(id);

    const country = updateUniversityDto?.countryId
      ? await this.countriesService.findOne(updateUniversityDto.countryId)
      : existing.country;

    Object.assign(existing, updateUniversityDto);

    existing.country = country;

    const saved = await this.universityRepo.save(existing);

    return this.universityMutationReturn(saved, 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    const removed = await this.universityRepo.remove(existing);

    return this.universityMutationReturn(removed, 'remove');
  }

  private universityMutationReturn(university: University, type: 'create' | 'update' | 'remove') {
    return {
      message: `${university.name} ${type}ed successfully`,
      university: {
        id: university.id,
        name: university.name
      }
    }
  }
}
