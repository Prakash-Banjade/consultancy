import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Brackets, Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { QueryDto } from 'src/core/dto/query.dto';
import paginatedData from 'src/core/utils/paginatedData';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private countryRepo: Repository<Country>,
    private readonly filesService: FilesService,
  ) { }

  async create(createCountryDto: CreateCountryDto) {
    const image = await this.filesService.findOne(createCountryDto.imageId);
    if (image.format === 'pdf') throw new BadRequestException('Pdf files are not allowed. Image must be of type image/png or image/jpg');

    const existingWitSameName = await this.countryRepo.findOne({
      where: { name: createCountryDto.name }
    })
    if (existingWitSameName) throw new ConflictException('Country with this name already exists')

    const country = this.countryRepo.create({
      ...createCountryDto,
      image
    })

    const savedCountry = await this.countryRepo.save(country)

    return {
      message: 'Country created successfully',
      country: {
        id: savedCountry.id,
        name: savedCountry.name
      }
    }

  }

  async findAll(queryDto: QueryDto) {
    const querybuilder = this.countryRepo.createQueryBuilder('country')
      .orderBy('country.createdAt', queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .leftJoinAndSelect('country.image', 'image')
      .where(new Brackets(qb => {
        queryDto.search && qb.where('LOWER(country.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
      }))

    return paginatedData(queryDto, querybuilder)
  }

  async findOne(id: string) {
    const existing = await this.countryRepo.findOne({
      where: { id },
      relations: ['image']
    });

    if (!existing) throw new NotFoundException('Country not found');

    return existing;
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    const existing = await this.findOne(id);

    const image = (updateCountryDto?.imageId && updateCountryDto?.imageId !== existing?.image?.id)
      ? await this.filesService.findOne(updateCountryDto.imageId)
      : existing.image;

    if (image.format === 'pdf') throw new BadRequestException('Pdf files are not allowed. Image must be of type image/png or image/jpg');

    existing.image = image;

    const updated = this.countryRepo.merge(existing, updateCountryDto);

    await this.countryRepo.save(updated);

    return {
      message: 'Country updated successfully',
      country: {
        id: updated.id,
        name: updated.name
      }
    }
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    const removed = await this.countryRepo.remove(existing);

    return {
      message: 'Country removed successfully',
      country: {
        id: removed.id,
        name: removed.name
      }
    }
  }
}
