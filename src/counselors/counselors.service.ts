import { ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';
import { Counselor } from './entities/counselor.entity';
import { Brackets, DataSource, Not } from 'typeorm';
import { CounselorQueryDto } from './dto/counselor-query.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/core/repository/base.repository';
import paginatedData from 'src/core/utils/paginatedData';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable({ scope: Scope.REQUEST })
export class CounselorsService extends BaseRepository {
  constructor(
    dataSource: DataSource, @Inject(REQUEST) req: Request,
    private readonly accountsService: AccountsService,
  ) {
    super(dataSource, req);
  }

  async create(createCounselorDto: CreateCounselorDto) {
    const existingCounselor = await this.getRepository(Counselor).findOne({ where: { email: createCounselorDto.email } });
    if (existingCounselor) throw new ConflictException('Counselor with this email already exists');

    const newCounselor = this.getRepository(Counselor).create(createCounselorDto);

    const savedCounselor = await this.getRepository(Counselor).save(newCounselor);

    // create account
    await this.accountsService.createAccount(savedCounselor, { givenPassword: createCounselorDto.password });

    return newCounselor;
  }

  async findAll(queryDto: CounselorQueryDto) {
    const querybuilder = this.getRepository(Counselor).createQueryBuilder('counselor')
      .orderBy('counselor.createdAt', queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .where(new Brackets(qb => {
        queryDto.search && qb.where('LOWER(counselor.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
        queryDto.email && qb.andWhere('counselor.email = :email', { email: queryDto.email })
      }))

    return paginatedData(queryDto, querybuilder)
  }

  async findOne(id: string) {
    const existingCounselor = await this.getRepository(Counselor).findOne({ where: { id } });

    if (!existingCounselor) throw new NotFoundException('Counselor not found');

    return existingCounselor;
  }

  async update(id: string, updateCounselorDto: UpdateCounselorDto) {
    const existing = await this.findOne(id);

    // check if email is taken
    if (updateCounselorDto.email && updateCounselorDto.email !== existing.email) {
      const existingCounselor = await this.getRepository(Counselor).findOne({ where: { email: updateCounselorDto.email, id: Not(id) } });
      if (existingCounselor) throw new ConflictException('Counselor with this email already exists');
    }

    Object.assign(existing, {
      ...updateCounselorDto
    })

    return this.counselorMutationReturn(await this.getRepository(Counselor).save(existing), 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    return this.counselorMutationReturn(await this.getRepository(Counselor).remove(existing), 'delete');
  }

  private counselorMutationReturn(counselor: Counselor, type: 'create' | 'update' | 'delete') {
    return {
      message: `${type === 'create' ? 'Created' : type === 'update' ? 'Updated' : 'Removed'} counselor successfully`,
      counselor: {
        id: counselor.id,
        firstName: counselor.firstName,
        lastName: counselor.lastName,
        email: counselor.email
      }
    }
  }
}
