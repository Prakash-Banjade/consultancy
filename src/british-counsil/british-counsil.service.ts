import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBritishCounsilDto } from './dto/create-british-counsil.dto';
import { UpdateBritishCounsilDto } from './dto/update-british-counsil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BritishCounsil } from './entities/british-counsil.entity';
import { Brackets, Repository } from 'typeorm';
import { BritishCounsilQueryDto } from './dto/british-counsil-query.dto';
import paginatedData from 'src/core/utils/paginatedData';

@Injectable()
export class BritishCounsilService {
  constructor(
    @InjectRepository(BritishCounsil) private britishCounsilRepo: Repository<BritishCounsil>,
  ) { }

  async create(createBritishCounsilDto: CreateBritishCounsilDto) {
    const existingWitSameName = await this.britishCounsilRepo.findOne({
      where: { name: createBritishCounsilDto.name }
    })
    if (existingWitSameName) throw new ConflictException('British Counsil with this name already exists');

    const britishCounsil = this.britishCounsilRepo.create(createBritishCounsilDto);
    const savedBritishCounsil = await this.britishCounsilRepo.save(britishCounsil);

    return this.britishCounsilMutationReturn(savedBritishCounsil, 'create');
  }

  async findAll(queryDto: BritishCounsilQueryDto) {
    const querybuilder = this.britishCounsilRepo.createQueryBuilder('britishCounsil')

    querybuilder
      .orderBy('britishCounsil.createdAt', queryDto.order)
      .take(queryDto.take)
      .skip(queryDto.skip)
      .where(new Brackets(qb => {
        queryDto.search && qb.where('LOWER(britishCounsil.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
      }))

    return paginatedData(queryDto, querybuilder);
  }

  async findOne(id: string) {
    const existing = await this.britishCounsilRepo.findOne({
      where: { id }
    });
    if (!existing) throw new NotFoundException('British Counsil not found');

    return existing;
  }

  async update(id: string, updateBritishCounsilDto: UpdateBritishCounsilDto) {
    const existing = await this.findOne(id);

    const updated = this.britishCounsilRepo.merge(existing, updateBritishCounsilDto);
    const saved = await this.britishCounsilRepo.save(updated);

    return this.britishCounsilMutationReturn(saved, 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    const removed = await this.britishCounsilRepo.remove(existing);

    return this.britishCounsilMutationReturn(removed, 'remove');
  }

  private britishCounsilMutationReturn(britishCounsil: BritishCounsil, type: 'create' | 'update' | 'remove') {
    return {
      message: `${britishCounsil.name} ${type}ed successfully`,
      britishCounsil: {
        id: britishCounsil.id,
        name: britishCounsil.name
      }
    }
  }
}
