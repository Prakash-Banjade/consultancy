import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Counselor } from './entities/counselor.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { CounselorQueryDto } from './dto/counselor-query.dto';

@Injectable()
export class CounselorsService {
  constructor(
    @InjectRepository(Counselor) private readonly counselorRepo: Repository<Counselor>,
  ) { }

  async create(createCounselorDto: CreateCounselorDto) {
    const existingCounselor = await this.counselorRepo.findOne({ where: { email: createCounselorDto.email } });
    if (existingCounselor) throw new ConflictException('Counselor with this email already exists');

    const newCounselor = this.counselorRepo.create(createCounselorDto);

    await this.counselorRepo.save(newCounselor);

    return newCounselor;
  }

  async findAll(queryDto: CounselorQueryDto) {
    const querybuilder = this.counselorRepo.createQueryBuilder('counselor')
      .orderBy('counselor.createdAt', queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .where(new Brackets(qb => {
        queryDto.search && qb.where('LOWER(counselor.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
        queryDto.email && qb.andWhere('counselor.email = :email', { email: queryDto.email })
      }))
  }

  async findOne(id: string) {
    const existingCounselor = await this.counselorRepo.findOne({ where: { id } });

    if (!existingCounselor) throw new NotFoundException('Counselor not found');

    return existingCounselor;
  }

  async update(id: string, updateCounselorDto: UpdateCounselorDto) {
    const existing = await this.findOne(id);

    // check if email is taken
    if (updateCounselorDto.email && updateCounselorDto.email !== existing.email) {
      const existingCounselor = await this.counselorRepo.findOne({ where: { email: updateCounselorDto.email, id: Not(id) } });
      if (existingCounselor) throw new ConflictException('Counselor with this email already exists');
    }

    Object.assign(existing, {
      ...updateCounselorDto
    })

    return this.counselorMutationReturn(await this.counselorRepo.save(existing), 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    return this.counselorMutationReturn(await this.counselorRepo.remove(existing), 'delete');
  }

  private counselorMutationReturn(counselor: Counselor, type: 'create' | 'update' | 'delete') {
    return {
      message: `${type === 'create' ? 'Created' : type === 'update' ? 'Updated' : 'Removed'} counselor successfully`,
      counselor: {
        id: counselor.id,
        name: counselor.name,
      }
    }
  }
}
