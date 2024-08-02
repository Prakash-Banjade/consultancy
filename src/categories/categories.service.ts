import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Brackets, Repository } from 'typeorm';
import { QueryDto } from 'src/core/dto/query.dto';
import paginatedData from 'src/core/utils/paginatedData';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepo.findOneBy({ name: createCategoryDto.name });
    if (existingCategory) throw new ConflictException('Category with this name already exists');

    return this.categoryRepo.save(createCategoryDto);
  }

  async findAll(queryDto: QueryDto) {
    const querybuilder = this.categoryRepo.createQueryBuilder('category')
      .orderBy('category.createdAt', queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .where(new Brackets(qb => {
        queryDto.search && qb.where('LOWER(category.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
      }))

    return paginatedData(queryDto, querybuilder)
  }

  async findOne(id: string) {
    const existing = await this.categoryRepo.findOne({
      where: { id },
    })

    if (!existing) throw new NotFoundException('Category not found')

    return existing;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existing = await this.findOne(id);

    // check if name is taken
    if (existing.name !== updateCategoryDto.name) {
      const existingCategory = await this.categoryRepo.findOneBy({ name: updateCategoryDto.name });
      if (existingCategory) throw new ConflictException('Category with this name already exists');
    }

    existing.name = updateCategoryDto.name;
    return this.categoryRepo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    const removed = await this.categoryRepo.remove(existing);
    return {
      message: 'Category removed',
    };
  }
}
