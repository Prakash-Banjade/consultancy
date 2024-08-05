import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Brackets, Repository } from 'typeorm';
import { ApplicationQueryDto } from './dto/application-query.dto';
import paginatedData from 'src/core/utils/paginatedData';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application) private readonly applicationRepo: Repository<Application>,
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
    private readonly studentsService: StudentsService,
  ) { }

  async create(createApplicationDto: CreateApplicationDto) {
    const student = await this.studentsService.findOne(createApplicationDto.studentId)

    const course = await this.courseRepo.findOne({
      where: {
        id: createApplicationDto.courseId,
        intakes: {
          year: createApplicationDto.year,
          month: createApplicationDto.month,
        }
      }
    })
    if (!course) throw new NotFoundException('Course not found or course is not available for the given intake.')

    const application = this.applicationRepo.create({
      ...createApplicationDto,
      student,
      course
    })

    const saved = await this.applicationRepo.save(application)

    return this.applicationMutationReturn(saved, 'create');
  }

  async findAll(queryDto: ApplicationQueryDto) {
    const queryBuilder = this.applicationRepo.createQueryBuilder('application')
      .orderBy('application.createdAt', queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .where(new Brackets(qb => {
        queryDto.search && qb.where('LOWER(application.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
      }))

    return paginatedData(queryDto, queryBuilder)
  }

  async findOne(id: string) {
    const existing = await this.applicationRepo.findOne({
      where: { id },
      relations: {
        student: true,
        course: {
          university: true
        }
      }
    })
    if (!existing) throw new NotFoundException('Application not found')

    return existing;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const existing = await this.findOne(id);

    Object.assign(existing, updateApplicationDto);

    const saved = await this.applicationRepo.save(existing);

    return this.applicationMutationReturn(saved, 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    const removed = await this.applicationRepo.remove(existing);

    return this.applicationMutationReturn(removed, 'remove');
  }

  private applicationMutationReturn(application: Application, type: 'create' | 'update' | 'remove') {
    return {
      message: type === 'create' ? 'Created successfully' : type === 'update' ? 'Updated successfully' : 'Removed successfully',
      application: {
        id: application.id,
        year: application.year,
        month: application.month,
        priority: application.priority,
        status: application.status,
      }
    }
  }
}
