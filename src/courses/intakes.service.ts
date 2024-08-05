import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import paginatedData from 'src/core/utils/paginatedData';
import { CreateIntakeDto, UpdateIntakeDto } from './dto/intake.dto';
import { Intake } from './entities/intakes.entity';
import { QueryDto } from 'src/core/dto/query.dto';
import { CoursesService } from './courses.service';

@Injectable()
export class IntakesService {
    constructor(
        @InjectRepository(Intake) private intakeRepo: Repository<Intake>,
        private readonly coursesService: CoursesService,
    ) { }

    async create(createIntakeDto: CreateIntakeDto) {
        const course = await this.coursesService.findOne(createIntakeDto.courseId)

        const existing = await this.intakeRepo.findOneBy({ year: createIntakeDto.year, month: createIntakeDto.month, course: { id: course.id } });

        if (existing) throw new ConflictException('Intake already exists')

        const intake = this.intakeRepo.create({ ...createIntakeDto, course })
        const saved = await this.intakeRepo.save(intake);

        return this.intakeMutationReturn(saved, 'create');
    }

    async findAll(queryDto: QueryDto) {
        const queryBuilder = this.intakeRepo.createQueryBuilder('intake')
            .orderBy('intake.createdAt', queryDto.order)
            .skip(queryDto.skip)
            .take(queryDto.take)
            .where(new Brackets(qb => {
                // queryDto.search && qb.where('LOWER(intake.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
            }))

        return paginatedData(queryDto, queryBuilder)
    }

    async findOne(id: string) {
        const existing = await this.intakeRepo.findOne({
            where: { id },
            relations: {
                course: true,
            }
        })
        if (!existing) throw new NotFoundException('Intake not found')

        return existing;
    }

    async update(id: string, updateIntakeDto: UpdateIntakeDto) {
        const existing = await this.findOne(id);

        Object.assign(existing, updateIntakeDto);

        const saved = await this.intakeRepo.save(existing);

        return this.intakeMutationReturn(saved, 'update');
    }

    async remove(id: string) {
        const existing = await this.findOne(id);
        const removed = await this.intakeRepo.remove(existing);

        return this.intakeMutationReturn(removed, 'remove');
    }

    private intakeMutationReturn(intake: Intake, type: 'create' | 'update' | 'remove') {
        return {
            message: `${type === 'create' ? 'Created' : type === 'update' ? 'Updated' : 'Removed'} intake successfully`,
            intake: {
                id: intake.id,
                month: intake.month,
                year: intake.year
            }
        }
    }
}
